

// src/app/(main)/products/[productId]/page.tsx

import { fetchProductById } from '@/lib/data/products';
import ProductDetail from '../../../../components/products/ProductDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Define the type for the page props, now explicitly expecting params to be a Promise
interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
  // searchParams also becomes a Promise, even if you don't use it directly
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// generateMetadata also receives params as a Promise
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  // Await params to get the actual object
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.productId);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
    // Add more metadata fields as needed
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  // Await params to get the actual object
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ProductDetail product={product} />
    </div>
  );
}