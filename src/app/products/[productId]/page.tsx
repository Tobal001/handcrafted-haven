import ProductDetail from '@/components/products/ProductDetail';
import { fetchProductById } from '@/lib/data/products';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProductById(params.productId);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProductDetail product={product} mode="shop" />
    </div>
  );
}
