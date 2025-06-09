
// src/lib/data/products.ts

'use server';

import { Product, ProductFormData, ProductImage, Review } from '@/lib/definitions';
import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to safely get values from FormData
function getValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  return value as string;
}

// Helper function to safely convert a value to a number, handling Decimal.js, null, and already-numbers
function safeToNumber(value: any): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value.toNumber === 'function') {
    return value.toNumber();
  }
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  console.warn('Unexpected type encountered during safeToNumber conversion:', value);
  return null;
}

// Helper function to transform Prisma Product type to your Product interface
function transformProduct(prismaProduct: any): Product {
  if (!prismaProduct) {
    console.error('transformProduct received a null or undefined prismaProduct.');
    return null as any; // Or throw an error, depending on desired strictness
  }

  // Ensure necessary properties are always present for Product interface,
  // even if they might be missing or null from Prisma's partial selects.
  // This helps maintain consistency with the Product type.
  const transformed: Product = {
    productId: prismaProduct.productId,
    sellerId: prismaProduct.sellerId,
    categoryId: prismaProduct.categoryId || null,
    name: prismaProduct.name,
    description: prismaProduct.description,
    price: safeToNumber(prismaProduct.price) as number,
    quantityAvailable: prismaProduct.quantityAvailable,
    isFeatured: prismaProduct.isFeatured,
    isActive: prismaProduct.isActive,
    creationDate: prismaProduct.creationDate,
    lastUpdated: prismaProduct.lastUpdated,
    materialsUsed: prismaProduct.materialsUsed || null,
    dimensions: prismaProduct.dimensions || null,
    weight: safeToNumber(prismaProduct.weight),
    careInstructions: prismaProduct.careInstructions || null,
    tags: prismaProduct.tags || null,
    searchVector: prismaProduct.searchVector || null,
    averageRating: prismaProduct.averageRating || 0, // Default to 0 if null
    reviewCount: prismaProduct.reviewCount || 0,   // Default to 0 if null
    images: prismaProduct.images || [],
    reviews: prismaProduct.reviews || [],
    
    // Crucial for the 'seller' info:
    seller: prismaProduct.seller ? {
      // Assuming seller in your Product interface matches Prisma's ArtisanProfile
      // And if ArtisanProfile has a 'user' relation with 'name'
      shopName: prismaProduct.seller.shopName || '', // Ensure it's a string, default empty
      userId: prismaProduct.seller.userId,
      user: prismaProduct.seller.user ? {
        name: prismaProduct.seller.user.name || null,
      } : undefined,
    } : undefined,
  };
  return transformed;
}


export async function fetchFeaturedProducts(): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        seller: {
          select: {
            shopName: true,
            userId: true,
          },
        },
        reviews: true,
      },
      orderBy: {
        creationDate: 'desc',
      },
      take: 4,
    });
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchFeaturedProducts):', error);
    throw new Error('Failed to fetch featured products.');
  }
}

export async function createProduct(sellerId: string, formData: FormData) {
  noStore();
  try {
    const productData: ProductFormData = {
      name: getValue(formData, 'name') || '',
      description: getValue(formData, 'description') || '',
      price: parseFloat(getValue(formData, 'price') || '0'),
      quantityAvailable: parseInt(getValue(formData, 'quantityAvailable') || '1'),
      categoryId: getValue(formData, 'categoryId'),
      materialsUsed: getValue(formData, 'materialsUsed'),
      dimensions: getValue(formData, 'dimensions'),
      weight: getValue(formData, 'weight') ? parseFloat(getValue(formData, 'weight')!) : null,
      careInstructions: getValue(formData, 'careInstructions'),
      tags: getValue(formData, 'tags'),
      // imageUrl: getValue(formData, 'imageUrl'), // This field is not in ProductFormData schema, handled separately
      isFeatured: formData.has('isFeatured'),
      isActive: formData.has('isActive'),
    };

    const product = await prisma.product.create({
      data: {
        sellerId,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantityAvailable: productData.quantityAvailable,
        categoryId: productData.categoryId || null,
        materialsUsed: productData.materialsUsed || null,
        dimensions: productData.dimensions || null,
        weight: productData.weight,
        careInstructions: productData.careInstructions || null,
        tags: productData.tags ? JSON.parse(productData.tags) : null,
        isFeatured: productData.isFeatured,
        isActive: productData.isActive,
      },
    });

    const imageUrl = getValue(formData, 'imageUrl');
    if (imageUrl) {
      await prisma.productImage.create({
        data: {
          productId: product.productId,
          imageUrl: imageUrl,
          isPrimary: true,
        },
      });
    }

    // You might want to fetch the created product with its relations here
    // for a complete return value, otherwise transformProduct won't have images/reviews/seller
    const createdProductWithRelations = await prisma.product.findUnique({
      where: { productId: product.productId },
      include: productQuerySelection.include, // Re-use the common selection
    });

    return createdProductWithRelations ? transformProduct(createdProductWithRelations) : null;
  } catch (error) {
    console.error('Database Error (createProduct):', error);
    throw new Error('Failed to create product.');
  }
}

// Existing fetchProductsBySeller - REMAINS UNCHANGED
export async function fetchProductsBySeller(sellerId: string): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        images: true,
        reviews: true,
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchProductsBySeller):', error);
    throw new Error('Failed to fetch products.');
  }
}

// *** NEW FUNCTION FOR ARTISAN PROFILE PAGE ***
export async function fetchProductsBySellerWithShopInfo(sellerId: string): Promise<Product[]> {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        images: true,
        reviews: true,
        // *** ADDING SELLER INCLUDE HERE ***
        seller: { // Assuming 'seller' is the relation name in your Prisma schema
          select: {
            shopName: true,
            userId: true, // It's good practice to include the ID for consistency
          },
        },
      },
      orderBy: {
        creationDate: 'desc',
      },
    });
    // Ensure transformProduct can handle the included seller data
    return products.map(transformProduct);
  } catch (error) {
    console.error('Database Error (fetchProductsBySellerWithShopInfo):', error);
    throw new Error('Failed to fetch products for artisan with shop info.');
  }
}

// Prisma selector for common product includes to avoid repetition
const productQuerySelection = Prisma.validator<Prisma.ProductDefaultArgs>()({
  include: {
    images: {
      where: { isPrimary: true },
      take: 1,
    },
    seller: {
      select: {
        shopName: true,
        userId: true,
        user: { // Including user name for seller, as per Product interface
          select: {
            name: true,
          }
        }
      },
    },
    reviews: true,
  },
});


export async function fetchAllProducts(
  currentPage: number = 1,
  limit: number = 12,
  searchQuery: string = '',
  categoryId: string = '',
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' = 'newest'
): Promise<{ products: Product[]; totalPages: number; totalProducts: number }> {
  noStore();

  const offset = (currentPage - 1) * limit;

  const conditions: Prisma.Sql[] = [
    Prisma.sql`P."is_active" = TRUE`,
  ];

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    conditions.push(
      Prisma.sql`
        (
          P.name ILIKE ${'%' + lowerCaseSearchQuery + '%'} OR
          P.description ILIKE ${'%' + lowerCaseSearchQuery + '%'} OR
          P.tags::jsonb ?| array[${lowerCaseSearchQuery}]
        )
      `
    );
  }

  if (categoryId) {
    conditions.push(Prisma.sql`P."category_id" = ${categoryId}::uuid`);
  }

  let orderBySql: Prisma.Sql;
  switch (sortBy) {
    case 'price-asc':
      orderBySql = Prisma.sql`P.price ASC`;
      break;
    case 'price-desc':
      orderBySql = Prisma.sql`P.price DESC`;
      break;
    case 'rating':
      orderBySql = Prisma.sql`P."average_rating" DESC NULLS LAST, P."review_count" DESC`;
      break;
    case 'newest':
    default:
      orderBySql = Prisma.sql`P."creation_date" DESC`;
      break;
  }

  try {
    const totalProductsResult = await prisma.$queryRaw<{ count: bigint }[]>(Prisma.sql`
      SELECT COUNT(P."product_id")::bigint AS count
      FROM "public"."products" AS P
      WHERE ${Prisma.join(conditions, ' AND ')}
    `);
    const totalProducts = Number(totalProductsResult[0]?.count || 0);

    const rawProducts = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT
        P."product_id", P.name, P.description, P.price, P."quantity_available",
        P."is_featured", P."is_active", P."creation_date", P."last_updated",
        P."materials_used", P.dimensions, P.weight, P."care_instructions", P.tags,
        P."search_vector",
        P."average_rating",
        P."review_count",
        P."seller_id", -- We need seller_id to fetch shopName later
        P."category_id",
        (SELECT json_agg(json_build_object('imageId', "img"."image_id", 'imageUrl', "img"."image_url", 'isPrimary', "img"."is_primary", 'altText', "img"."alt_text", 'displayOrder', "img"."display_order", 'createdAt', "img"."created_at"))
          FROM "public"."product_images" AS img
          WHERE img."product_id" = P."product_id" AND img."is_primary" = TRUE LIMIT 1) AS images_json,
        (SELECT json_agg(json_build_object('reviewId', R."review_id", 'rating', R.rating, 'title', R.title, 'comment', R.comment, 'reviewDate', R."review_date", 'isApproved', R."is_approved", 'helpfulCount', R."helpful_count", 'updatedAt', R."updated_at", 'userId', R."user_id"))
          FROM "public"."reviews" AS R
          WHERE R."product_id" = P."product_id") AS reviews_json
      FROM "public"."products" AS P
      WHERE ${Prisma.join(conditions, ' AND ')}
      ORDER BY ${orderBySql}
      LIMIT ${limit} OFFSET ${offset}
    `);

    // Extract unique seller IDs
    const uniqueSellerIds = [...new Set(rawProducts.map(p => p.seller_id).filter(id => id !== null))];

    // Fetch shop names for all unique seller IDs using Prisma ORM in a single query
    const sellerProfiles = uniqueSellerIds.length > 0 ? await prisma.artisanProfile.findMany({
      where: {
        userId: {
          in: uniqueSellerIds,
        },
      },
      select: {
        userId: true,
        shopName: true,
      },
    }) : [];

    // Create a map for quick lookup
    const sellerShopNameMap = new Map<string, string>();
    sellerProfiles.forEach(seller => {
      sellerShopNameMap.set(seller.userId, seller.shopName);
    });

    const transformedProducts = rawProducts.map((rawProduct: any) => {
      const images = rawProduct.images_json || [];
      const reviews = rawProduct.reviews_json || [];

      // Get shopName from the map
      const sellerId = String(rawProduct.seller_id);
      const shopName = sellerShopNameMap.get(sellerId) || null; // Use null if not found or undefined

      const sellerData = shopName
        ? {
            shopName: shopName,
            userId: sellerId,
            // User name is not fetched in this specific query for seller, so it will be undefined
            // If needed, you'd have to fetch it here or modify transformProduct to expect it.
          }
        : undefined;

      return {
        productId: String(rawProduct.product_id), // Ensure string
        sellerId: sellerId,    // Ensure string
        categoryId: rawProduct.category_id ? String(rawProduct.category_id) : null, // Ensure string or null
        name: String(rawProduct.name),
        description: String(rawProduct.description),
        price: Number(rawProduct.price),
        quantityAvailable: Number(rawProduct.quantity_available),
        isFeatured: Boolean(rawProduct.is_featured),
        isActive: Boolean(rawProduct.is_active),
        creationDate: new Date(rawProduct.creation_date),
        lastUpdated: new Date(rawProduct.last_updated),
        materialsUsed: rawProduct.materials_used !== null ? String(rawProduct.materials_used) : null,
        dimensions: rawProduct.dimensions !== null ? String(rawProduct.dimensions) : null,
        weight: rawProduct.weight !== null ? Number(rawProduct.weight) : null,
        careInstructions: rawProduct.care_instructions !== null ? String(rawProduct.care_instructions) : null,
        tags: rawProduct.tags, // Already handled as JS array/object
        searchVector: rawProduct.search_vector !== null ? String(rawProduct.search_vector) : null,
        averageRating: Number(rawProduct.average_rating),
        reviewCount: Number(rawProduct.review_count),
        seller: sellerData, // Assign the correctly typed seller object
        images: images,
        reviews: reviews,
      };
    });

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products: transformedProducts,
      totalPages,
      totalProducts,
    };
  } catch (error) {
    console.error('Database Error (fetchAllProducts with filters):', error);
    throw new Error('Failed to fetch products with filters.');
  }
}


export async function fetchProductById(productId: string): Promise<Product | null> {
  noStore();
  try {
    const product = await prisma.product.findUnique({
      where: { productId },
      include: {
        images: true,
        seller: {
          select: {
            shopName: true,
            userId: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return product ? transformProduct(product) : null;
  } catch (error) {
    console.error('Database Error (fetchProductById):', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  noStore();
  try {
    const productData: Partial<ProductFormData> = {
      name: getValue(formData, 'name') || undefined,
      description: getValue(formData, 'description') || undefined,
      price: getValue(formData, 'price') ? parseFloat(getValue(formData, 'price')!) : undefined,
      quantityAvailable: getValue(formData, 'quantityAvailable') ? parseInt(getValue(formData, 'quantityAvailable')!) : undefined,
      categoryId: getValue(formData, 'categoryId') || undefined,
      materialsUsed: getValue(formData, 'materialsUsed') || undefined,
      dimensions: getValue(formData, 'dimensions') || undefined,
      weight: getValue(formData, 'weight') ? parseFloat(getValue(formData, 'weight')!) : undefined,
      careInstructions: getValue(formData, 'careInstructions') || undefined,
      tags: getValue(formData, 'tags') || undefined,
      isFeatured: formData.has('isFeatured'),
      isActive: formData.has('isActive'),
    };

    const updatedProduct = await prisma.product.update({
      where: { productId },
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        quantityAvailable: productData.quantityAvailable,
        categoryId: productData.categoryId,
        materialsUsed: productData.materialsUsed,
        dimensions: productData.dimensions,
        weight: productData.weight,
        careInstructions: productData.careInstructions,
        tags: productData.tags ? JSON.parse(productData.tags) : undefined,
        lastUpdated: new Date(),
        isFeatured: productData.isFeatured,
        isActive: productData.isActive,
      },
      include: productQuerySelection.include // Re-use the common selection here as well
    });

    const imageUrl = getValue(formData, 'imageUrl');
    if (imageUrl) {
      const existingPrimaryImage = await prisma.productImage.findFirst({
        where: {
          productId,
          isPrimary: true,
        },
      });

      if (existingPrimaryImage) {
        await prisma.productImage.update({
          where: { imageId: existingPrimaryImage.imageId },
          data: { imageUrl },
        });
      } else {
        await prisma.productImage.create({
          data: {
            productId,
            imageUrl,
            isPrimary: true,
          },
        });
      }
    }

    return transformProduct(updatedProduct);
  } catch (error) {
    console.error('Database Error (updateProduct):', error);
    throw new Error('Failed to update product.');
  }
}

export async function fetchSellerAverageRating(sellerId: string): Promise<{ averageRating: number; reviewCount: number }> {
  noStore();
  try {
    const result = await prisma.review.aggregate({
      _avg: { rating: true },
      _count: { reviewId: true },
      where: {
        product: {
          sellerId: sellerId,
        },
        isApproved: true,
      },
    });

    const averageRating = result._avg.rating ? parseFloat(result._avg.rating.toFixed(1)) : 0;
    const reviewCount = result._count.reviewId || 0;

    return { averageRating, reviewCount };
  } catch (error) {
    console.error('Database Error (fetchSellerAverageRating):', error);
    throw new Error('Failed to fetch seller average rating.');
  }
}

export async function deleteProduct(productId: string): Promise<{ message: string }> {
  noStore();
  try {
    await prisma.productImage.deleteMany({
      where: { productId: productId },
    });

    await prisma.product.delete({
      where: { productId: productId },
    });
    
    return { message: 'Product deleted successfully.' };
  } catch (error) {
    console.error('Database Error (deleteProduct):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { message: 'Product not found or already deleted.' };
      }
    }
    return { message: 'Failed to delete product: An unexpected error occurred.' };
  }
}