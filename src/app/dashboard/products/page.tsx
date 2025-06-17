
// src/app/(main)/artisans/products/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { fetchProductsBySeller, deleteProduct } from '@/lib/data/products'; // Import deleteProduct
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Import TrashIcon

export default function ArtisanProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Memoize loadProducts to prevent unnecessary re-renders/fetches
  const loadProducts = useCallback(async () => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    try {
      const data = await fetchProductsBySeller(session.user.id);
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]); // Depend on session.user.id

  useEffect(() => {
    loadProducts();
  }, [loadProducts]); // Depend on the memoized loadProducts function

  const handleDeleteProduct = async (productId: string) => {
    // Add a confirmation dialog for better UX
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await deleteProduct(productId);
        // After successful deletion, refresh the product list
        loadProducts(); 
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product. Please try again.'); // Consider a custom modal in production for better UX
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">My Products</h1>
        <Link href="/products/create">
          <Button className="bg-[#B55B3D] hover:bg-[#9E4F37] flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <p className="text-[#6C6C6C] mb-4">You haven't created any products yet.</p>
          <Link href="/products/create">
            <Button className="bg-[#B55B3D] hover:bg-[#9E4F37]">
              Create Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.productId} className="relative">
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 flex space-x-2"> {/* Container for buttons */}
                <Link 
                  href={`/dashboard/products/${product.productId}/edit`}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-[#F9F4EF] transition-colors"
                  title="Edit Product" // Tooltip for accessibility
                >
                  <PencilIcon className="h-4 w-4 text-[#B55B3D]" />
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.productId)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition-colors"
                  title="Delete Product" // Tooltip for accessibility
                >
                  <TrashIcon className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}