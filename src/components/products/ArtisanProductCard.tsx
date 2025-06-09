
// src/components/products/ArtisanProductCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/definitions';
import { StarFilledIcon } from '@radix-ui/react-icons';

// Helper to calculate average rating (reused from HomeProductCard)
function calculateAverageRating(reviews: Product['reviews']) {
  if (!reviews || reviews.length === 0) {
    return { average: 0, count: 0 };
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = totalRating / reviews.length;
  return { average: parseFloat(average.toFixed(1)), count: reviews.length };
}

export default function ArtisanProductCard({ product }: { product: Product }) {
  // Fallback image if product has no images or primary image URL is missing
  const primaryImage = product.images?.[0]?.imageUrl || '/placeholder-image.jpg';
  const { average: avgRating, count: reviewCount } = calculateAverageRating(product.reviews);

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border border-[#E6E1DC] hover:shadow-xl transition-all duration-300 ease-in-out">
      {/* Product Image */}
      <Link href={`/products/${product.productId}`} className="block">
        <div className="relative w-full h-48 bg-[#E6E1DC] overflow-hidden">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Featured & Active Badges - kept from original HomeProductCard */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
        {product.isFeatured && (
          <span className="bg-[#B55B3D] text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
            Featured
          </span>
        )}
        {product.isActive && (
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
            Active
          </span>
        )}
        {!product.isActive && (
          <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
            Inactive
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${product.productId}`} className="block">
          <h3 className="text-lg font-serif font-bold text-[#3E3E3E] hover:text-[#B55B3D] transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>
        {/*
          CRITICAL CHANGE: This line now specifically expects product.seller?.shopName.
          Since fetchProductsBySellerWithShopInfo is designed to provide this,
          it should now display correctly. No more 'Unknown Artisan' fallback needed here,
          as the data fetching function ensures it's either present or not.
        */}
        {product.seller?.shopName && (
          <p className="text-[#6C6C6C] text-sm mt-1">
            From: {product.seller.shopName}
          </p>
        )}


        {/* Rating and Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-600">
            {avgRating > 0 ? (
              <>
                <StarFilledIcon className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{avgRating} ({reviewCount})</span>
              </>
            ) : (
              <span className="text-gray-400">No reviews yet</span>
            )}
          </div>
          <p className="text-xl font-bold text-[#B55B3D]">${product.price.toFixed(2)}</p>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link href={`/products/${product.productId}`} className="block w-full bg-[#B55B3D] text-white text-center py-2 rounded-md font-semibold hover:bg-[#9E4F37] transition-colors text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
