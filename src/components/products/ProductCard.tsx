
// src/components/products/ProductCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/definitions'; // Assuming Product is defined here
import { StarIcon } from '@heroicons/react/24/solid';
// We're no longer using calculateAverageRating here as avgRating comes directly from product
// import { calculateAverageRating } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

  // Use the directly provided averageRating and reviewCount from the product object
  // Fallback to 0 if they are null/undefined or not yet populated in the DB
  const displayAverageRating = product.averageRating || 0;
  const displayReviewCount = product.reviewCount || 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E6E1DC] hover:shadow-lg transition-shadow">
      <Link href={`/dashboard/products/${product.productId}`} className="block">
        {/* Product Image */}
        <div className="aspect-square bg-[#F9F4EF] relative">
          {primaryImage ? (
            <Image
              src={primaryImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-[#3E3E3E] mb-1 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(displayAverageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {/* Displaying average rating and count in the desired format */}
            <span className="text-xs text-[#6C6C6C] ml-1">
              {displayAverageRating > 0 ? (
                // Display format: 4.0 (2)
                <>{displayAverageRating.toFixed(1)} ({displayReviewCount})</>
              ) : (
                '(No reviews yet)' // Fallback text when no reviews
              )}
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-[#B55B3D]">
            ${product.price.toFixed(2)}
          </p>

          {/* Seller - Modified to display "By Unknown Artisan" if seller info is missing */}
          <p className="text-sm text-[#6C6C6C] mt-1">
            {/* From {product.seller?.shopName || 'Unknown Artisan'} Store */}
            {product.seller?.shopName || ''} 
          </p>
        </div>
      </Link>
    </div>
  );
}