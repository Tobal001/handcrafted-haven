

// src/app/dashboard/products/create/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { createProduct } from '@/lib/data/products';
import { fetchCategories } from '@/lib/data/categories';
import ProductForm from '@/components/products/ProductForm';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming you have this UI component

export default function CreateProductPage() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // FIX: Add state for imageUrl
  const [imageUrl, setImageUrl] = useState(''); // Initialize with an empty string

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    if (!session?.user?.id) {
      console.error('Error: User not logged in to create a product.');
      // Optionally, redirect to login or show an error message
      return;
    }
    
    try {
      // The `createProduct` server action will receive the formData,
      // which should now correctly include the 'imageUrl' from the input.
      await createProduct(session.user.id, formData);
      
      // Redirect to the artisan's products page after successful creation.
      // Adjust this path if your artisan products page is different (e.g., /dashboard/products)
      router.push('/artisans/products'); 
    } catch (error) {
      console.error('Failed to create product:', error);
      // You might want to display a user-friendly error message here
      // For example, using a state variable to show an alert or a toast notification.
      // alert('Failed to create product. Please try again.'); // Avoid window.alert in production apps
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse h-96"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        {/* <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">Create New Product</h1> */}
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
        <ProductForm 
          sellerId={session?.user?.id || ''}
          onSubmit={handleSubmit}
          categories={categories}
          // FIX: Pass imageUrl state and its setter to ProductForm
          imageUrl={imageUrl} // Controlled value for the input
          onImageUrlChange={setImageUrl} // Function to update the imageUrl state
          isEditing={false} // This is always false for a create page
        />
      </div>
    </div>
  );
}