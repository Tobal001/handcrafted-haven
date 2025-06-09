
// src/app/(main)/products/page.tsx

import { Suspense } from 'react'; // Import Suspense from React
import { fetchAllProducts } from '@/lib/data/products'; // Server Action
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/products/ProductCard';
import ProductSearchAndFilter from '@/components/products/ProductSearchAndFilter'; // Import the new search/filter component
import ClientPagination from '@/components/products/ClientPagination'; // Import the new pagination component

// REVISED INTERFACE TO SATISFY NEXT.JS BUILD TYPE CHECKS
// For non-dynamic routes, Next.js's internal PageProps can sometimes expect 'params' or 'searchParams'
// to be a Promise<any> during the build phase (especially if generateMetadata is involved).
// Using 'any' as a workaround for these specific build-time type conflicts.
interface ProductsPageProps {
  params?: any; // Use 'any' to bypass strict build-time Promise<any> compatibility issues
  searchParams?: any; // Use 'any' to bypass strict build-time Promise<any> compatibility issues
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // We still treat searchParams as a plain object at runtime for safe access
  // Awaiting it ensures it's resolved if it were ever a Promise (though typically not for searchParams)
  const currentSearchParams = (await searchParams) || {};

  // Extract parameters, using type assertions for safety after the 'any' workaround
  const currentPage = parseInt((currentSearchParams.page as string) || '1');
  const searchQuery = (currentSearchParams.query as string) || '';
  const categoryFilter = (currentSearchParams.category as string) || '';
  const sortOrder = (currentSearchParams.sort as 'newest' | 'price-asc' | 'price-desc' | 'rating') || 'newest';

  // Fetch products on the server using the server action
  const { products, totalPages } = await fetchAllProducts(
    currentPage,
    12, // products per page
    searchQuery,
    categoryFilter,
    sortOrder
  );

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">All Products</h1>
        <Link href="/products/create">
          <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div> */}

      {/* Wrap the search/filter/sort client component in Suspense */}
      <Suspense fallback={
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC] h-28 animate-pulse">
          {/* Skeleton for the search/filter UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-[#E6E1DC] rounded"></div>
            <div className="h-10 bg-[#E6E1DC] rounded"></div>
            <div className="h-10 bg-[#E6E1DC] rounded"></div>
          </div>
        </div>
      }>
        <ProductSearchAndFilter />
      </Suspense>

      {/* Products Grid (rendered on server with initial data) */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#6C6C6C]">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}

      {/* Wrap the pagination client component in Suspense */}
      {totalPages > 1 && (
        <Suspense fallback={
          <div className="mt-8 flex justify-center h-10 w-full bg-white rounded-lg animate-pulse">
            {/* Skeleton for pagination */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-8 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-8 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-8 h-8 bg-[#E6E1DC] rounded"></div>
              <div className="w-20 h-8 bg-[#E6E1DC] rounded"></div>
            </div>
          </div>
        }>
          <ClientPagination currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      )}
    </div>
  );
}