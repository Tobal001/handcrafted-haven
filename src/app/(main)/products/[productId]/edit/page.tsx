
// src/app/products/[productId]/edit/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { fetchProductById, updateProduct } from '@/lib/data/products';
import { fetchCategories } from '@/lib/data/categories';
import ProductForm from '@/components/products/ProductForm';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function EditProductPage() {
  const { data: session } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function loadData() {
      try {
        const [productData, categoriesData] = await Promise.all([
          fetchProductById(params.productId as string),
          fetchCategories(),
        ]);
        
        if (productData) {
          setProduct(productData);
          const primaryImage = productData.images.find((img: any) => img.isPrimary);
          if (primaryImage) {
            setImageUrl(primaryImage.imageUrl);
          }
        }
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.productId]);

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateProduct(params.productId as string, formData);
      router.push('/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse h-96"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <p className="text-[#6C6C6C] mb-4">Product not found.</p>
          <Button 
            onClick={() => router.push('/products')}
            className="bg-[#B55B3D] hover:bg-[#9E4F37]"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-[#3E3E3E]">Edit Product</h1>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
        <ProductForm 
          sellerId={session?.user?.id || ''}
          onSubmit={handleSubmit}
          categories={categories}
          product={product}
          imageUrl={imageUrl}
          onImageUrlChange={setImageUrl}
          isEditing={true}
        />
      </div>
    </div>
  );
}