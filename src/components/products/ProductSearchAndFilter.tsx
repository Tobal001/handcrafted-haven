
// src/components/products/ProductSearchAndFilter.tsx

'use client'; 

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { fetchCategories } from '@/lib/data/categories'; // Assuming this is a server action accessible from client

interface Category {
  categoryId: string;
  name: string;
}

export default function ProductSearchAndFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current query parameters from URL
  const searchQuery = searchParams.get('query') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sortOrder = (searchParams.get('sort') || 'newest') as 'newest' | 'price-asc' | 'price-desc' | 'rating';

  const [localSearchInput, setLocalSearchInput] = useState(searchQuery);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Effect to sync local search input with URL changes (e.g., if user navigates back/forward)
  useEffect(() => {
    setLocalSearchInput(searchQuery);
  }, [searchQuery]);

  // Effect to fetch categories (only once on mount)
  useEffect(() => {
    async function loadCategories() {
      setCategoriesLoading(true);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    }
    loadCategories();
  }, []);

  // Function to trigger the actual search (updates URL)
  const triggerSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (localSearchInput) {
      params.set('query', localSearchInput);
    } else {
      params.delete('query');
    }
    params.set('page', '1'); // Reset to first page on new search
    router.replace(`${pathname}?${params.toString()}`);
  }, [localSearchInput, searchParams, router, pathname]);

  // Handle Enter key press in the search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  // Update URL for category filter
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('category', e.target.value);
    } else {
      params.delete('category');
    }
    params.set('page', '1'); // Reset to first page on new filter
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Update URL for sort order
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('sort', e.target.value);
    } else {
      params.delete('sort');
    }
    params.set('page', '1'); // Reset to first page on new sort
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-[#E6E1DC]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input with Integrated Button */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-md border border-[#E6E1DC] py-2 pl-3 pr-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            value={localSearchInput}
            onChange={(e) => setLocalSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={triggerSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Category Filter */}
        <div>
          <select
            className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            value={categoryFilter}
            onChange={handleCategoryChange}
            disabled={categoriesLoading} // Disable while categories are loading
          >
            <option value="">All Categories</option>
            {categoriesLoading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <select
            className="w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}