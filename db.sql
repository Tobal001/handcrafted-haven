

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- CREATE TABLE IF NOT EXISTS users (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name VARCHAR(255),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     role VARCHAR(50) NOT NULL,
--     verification_token VARCHAR(255),
--     reset_token VARCHAR(255),
--     reset_token_expires TIMESTAMP,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     email_verified BOOLEAN DEFAULT FALSE
-- );


-- Profiles table (for extended user information)
-- CREATE TABLE IF NOT EXISTS profiles (
--     profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     bio TEXT,
--     profile_image_url VARCHAR(255),
--     address VARCHAR(255),
--     city VARCHAR(255),
--     state VARCHAR(255),
--     zip_code VARCHAR(50),
--     country VARCHAR(100),
--     phone_number VARCHAR(50),
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );


-- SellerProfiles table (for artisans/sellers)
CREATE TABLE IF NOT EXISTS seller_profiles (
    seller_profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shop_name VARCHAR(255) NOT NULL,
    shop_description TEXT,
    average_rating FLOAT DEFAULT 0.0,
    total_sales INTEGER DEFAULT 0,
    is_top_artisan BOOLEAN DEFAULT FALSE,
    social_media_links JSONB,
    policies TEXT,
    shipping_info TEXT,
    return_policy TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- -- Categories table (for product categorization)
-- CREATE TABLE IF NOT EXISTS categories (
--     category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     parent_category_id UUID REFERENCES categories(category_id) ON DELETE SET NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );


-- Products table
CREATE TABLE IF NOT EXISTS products (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(user_id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(category_id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity_available INTEGER NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    materials_used TEXT,
    dimensions VARCHAR(100),
    weight DECIMAL(10, 2),
    care_instructions TEXT,
    tags JSONB
);

-- Add the search_vector column to products
ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Create the function to update search_vector
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.materials_used, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(ARRAY(SELECT jsonb_array_elements_text(NEW.tags)), ' '), '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to auto-update search_vector
CREATE TRIGGER trg_product_search_vector
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- Create a GIN index for fast search
CREATE INDEX idx_products_search_vector ON products USING gin(search_vector);

--  Create the Dynamic Search & Filter Function
CREATE OR REPLACE FUNCTION search_products(
  search_query TEXT DEFAULT NULL,
  category_id_param UUID DEFAULT NULL,
  min_price DECIMAL(10,2) DEFAULT NULL,
  max_price DECIMAL(10,2) DEFAULT NULL,
  seller_id_param UUID DEFAULT NULL,
  min_rating FLOAT DEFAULT NULL,
  materials TEXT[] DEFAULT NULL,
  only_featured BOOLEAN DEFAULT FALSE,
  only_active BOOLEAN DEFAULT TRUE,
  sort_by VARCHAR(50) DEFAULT 'relevance',
  page_number INTEGER DEFAULT 1,
  page_size INTEGER DEFAULT 20
)
RETURNS TABLE(
  product_id UUID,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  average_rating FLOAT,
  review_count BIGINT,
  primary_image_url VARCHAR(255),
  seller_name VARCHAR(255),
  relevance FLOAT
) AS $$
BEGIN
  RETURN QUERY EXECUTE format('
    SELECT 
      p.product_id,
      p.name,
      p.description,
      p.price,
      COALESCE(AVG(r.rating), 0)::FLOAT as average_rating,
      COUNT(r.review_id)::BIGINT as review_count,
      (SELECT image_url FROM product_images pi WHERE pi.product_id = p.product_id AND pi.is_primary = TRUE LIMIT 1) as primary_image_url,
      sp.shop_name as seller_name,
      ts_rank(p.search_vector, plainto_tsquery(''english'', %L)) as relevance
    FROM products p
    JOIN seller_profiles sp ON p.seller_id = sp.user_id
    LEFT JOIN reviews r ON p.product_id = r.product_id AND r.is_approved = TRUE
    WHERE 
      (%L IS NULL OR p.search_vector @@ plainto_tsquery(''english'', %L))
      AND (%L IS NULL OR p.category_id = %L)
      AND (%L IS NULL OR p.price >= %L)
      AND (%L IS NULL OR p.price <= %L)
      AND (%L IS NULL OR p.seller_id = %L)
      AND (%L IS NULL OR (
        SELECT COALESCE(AVG(rating), 0) 
        FROM reviews 
        WHERE product_id = p.product_id AND is_approved = TRUE
      ) >= %L)
      AND (%L IS NULL OR p.materials_used ILIKE ANY(%L))
      AND (%L IS FALSE OR p.is_featured = TRUE)
      AND (%L IS FALSE OR p.is_active = TRUE)
    GROUP BY p.product_id, sp.shop_name, p.search_vector
    ORDER BY %s
    LIMIT %s OFFSET %s',
    search_query,
    search_query, search_query,
    category_id_param, category_id_param,
    min_price, min_price,
    max_price, max_price,
    seller_id_param, seller_id_param,
    min_rating, min_rating,
    materials, materials,
    only_featured, only_featured,
    only_active, only_active,
    CASE 
      WHEN sort_by = 'price_asc' THEN 'p.price ASC'
      WHEN sort_by = 'price_desc' THEN 'p.price DESC'
      WHEN sort_by = 'rating' THEN 'average_rating DESC'
      WHEN sort_by = 'newest' THEN 'p.creation_date DESC'
      ELSE 'relevance DESC, average_rating DESC'
    END,
    page_size,
    (page_number - 1) * page_size
  );
END;
$$ LANGUAGE plpgsql;


-- ProductImages table
CREATE TABLE IF NOT EXISTS product_images (
    image_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    alt_text VARCHAR(255),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    review_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0
);


-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    payment_status VARCHAR(100) NOT NULL,
    tracking_number VARCHAR(100)
);


-- OrderItems table
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);


-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
    wishlist_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);


-- FeaturedProducts table
CREATE TABLE IF NOT EXISTS featured_products (
    feature_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    display_order INTEGER NOT NULL DEFAULT 0,
    featured_reason TEXT
);


-- TopArtisansSelection table
CREATE TABLE IF NOT EXISTS top_artisans_selection (
    selection_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(user_id) ON DELETE CASCADE,
    selection_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    selection_reason TEXT,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    sent_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);


-- CustomRequests table
CREATE TABLE IF NOT EXISTS custom_requests (
    request_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES seller_profiles(user_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    budget DECIMAL(10, 2),
    deadline TIMESTAMP,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ShippingOptions table
CREATE TABLE IF NOT EXISTS shipping_options (
    shipping_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(user_id) ON DELETE CASCADE,
    option_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    delivery_time VARCHAR(100) NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE
);

-- Promotions table
CREATE TABLE IF NOT EXISTS promotions (
    promotion_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(user_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    discount_type VARCHAR(50) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10, 2) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    promo_code VARCHAR(100) UNIQUE
);

-- Create indexes for better performance
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_featured_products_product ON featured_products(product_id);
CREATE INDEX idx_featured_products_dates ON featured_products(start_date, end_date);
CREATE INDEX idx_top_artisans_seller ON top_artisans_selection(seller_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_custom_requests_customer ON custom_requests(customer_id);
CREATE INDEX idx_custom_requests_seller ON custom_requests(seller_id);
CREATE INDEX idx_shipping_options_seller ON shipping_options(seller_id);
CREATE INDEX idx_promotions_seller ON promotions(seller_id);
CREATE INDEX idx_promotions_product ON promotions(product_id);

-- LIST OF TABLES
SELECT * FROM users;
SELECT * FROM profiles;
SELECT * FROM seller_profiles
SELECT * FROM categories
SELECT * FROM products
SELECT * FROM product_images
SELECT * FROM reviews
SELECT * FROM orders
SELECT * FROM order_items
SELECT * FROM wishlists
SELECT * FROM featured_products
SELECT * FROM top_artisans_selection
SELECT * FROM messages
SELECT * FROM custom_requests
SELECT * FROM shipping_options
SELECT * FROM promotions




-- ===========================================================================================




-- Enable uuid-ossp extension if not already enabled (needed for uuid_generate_v4())
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the function to update search_vector
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.materials_used, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(ARRAY(SELECT jsonb_array_elements_text(NEW.tags)), ' '), '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to auto-update search_vector
CREATE TRIGGER trg_product_search_vector
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- Create a GIN index for fast search
CREATE INDEX idx_products_search_vector ON products USING gin(search_vector);

-- Create the Dynamic Search & Filter Function
CREATE OR REPLACE FUNCTION search_products(
  search_query TEXT DEFAULT NULL,
  category_id_param UUID DEFAULT NULL,
  min_price DECIMAL(10,2) DEFAULT NULL,
  max_price DECIMAL(10,2) DEFAULT NULL,
  artisan_id_param UUID DEFAULT NULL,
  min_rating FLOAT DEFAULT NULL,
  materials TEXT[] DEFAULT NULL,
  only_featured BOOLEAN DEFAULT FALSE,
  only_active BOOLEAN DEFAULT TRUE,
  sort_by VARCHAR(50) DEFAULT 'relevance',
  page_number INTEGER DEFAULT 1,
  page_size INTEGER DEFAULT 20
)
RETURNS TABLE(
  product_id UUID,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  average_rating FLOAT,
  review_count BIGINT,
  primary_image_url VARCHAR(255),
  seller_name VARCHAR(255),
  relevance FLOAT
) AS $$
BEGIN
  RETURN QUERY EXECUTE format('
    SELECT
      p.product_id,
      p.name,
      p.description,
      p.price,
      COALESCE(AVG(r.rating), 0)::FLOAT as average_rating,
      COUNT(r.review_id)::BIGINT as review_count,
      (SELECT image_url FROM product_images pi WHERE pi.product_id = p.product_id AND pi.is_primary = TRUE LIMIT 1) as primary_image_url,
      ap.shop_name as seller_name,
      ts_rank(p.search_vector, plainto_tsquery(''english'', %L)) as relevance
    FROM products p
    JOIN artisan_profiles ap ON p.seller_id = ap.user_id
    LEFT JOIN reviews r ON p.product_id = r.product_id AND r.is_approved = TRUE
    WHERE
      (%L IS NULL OR p.search_vector @@ plainto_tsquery(''english'', %L))
      AND (%L IS NULL OR p.category_id = %L)
      AND (%L IS NULL OR p.price >= %L)
      AND (%L IS NULL OR p.price <= %L)
      AND (%L IS NULL OR p.seller_id = %L)
      AND (%L IS NULL OR (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE product_id = p.product_id AND is_approved = TRUE
      ) >= %L)
      AND (%L IS NULL OR p.materials_used ILIKE ANY(%L))
      AND (%L IS FALSE OR p.is_featured = TRUE)
      AND (%L IS FALSE OR p.is_active = TRUE)
    GROUP BY p.product_id, ap.shop_name, p.search_vector
    ORDER BY %s
    LIMIT %s OFFSET %s',
    search_query,
    search_query, search_query,
    category_id_param, category_id_param,
    min_price, min_price,
    max_price, max_price,
    artisan_id_param, artisan_id_param,
    min_rating, min_rating,
    materials, materials,
    only_featured, only_featured,
    only_active, only_active,
    CASE
      WHEN sort_by = 'price_asc' THEN 'p.price ASC'
      WHEN sort_by = 'price_desc' THEN 'p.price DESC'
      WHEN sort_by = 'rating' THEN 'average_rating DESC'
      WHEN sort_by = 'newest' THEN 'p.creation_date DESC'
      ELSE 'relevance DESC, average_rating DESC'
    END,
    page_size,
    (page_number - 1) * page_size
  );
END;
$$ LANGUAGE plpgsql;