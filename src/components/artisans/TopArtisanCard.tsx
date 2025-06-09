
// src/components/artisans/TopArtisanCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ArtisanProfileForDisplay } from '@/lib/data/artisans'; // Import the new shared type

export default function TopArtisanCard({ artisan }: { artisan: ArtisanProfileForDisplay }) {
  // Use a default image if profileImageUrl is null or empty.
  // Consider having a proper placeholder image in your public directory.
  const defaultProfileImage = '/placeholder-artisan.jpg'; // Ensure this path is correct
  const profileImage = artisan.profileImageUrl || defaultProfileImage;

  return (
    <div className="relative group flex flex-col items-center bg-white rounded-xl shadow-lg border border-[#E6E1DC] overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Background/Header Area - could be a banner image or a colored block */}
      <div className="w-full h-32 bg-[#F3ECE5] relative flex items-center justify-center">
        {/* You could add a background image here if desired */}
      </div>

      {/* Profile Image (absolute positioning for overlap) */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#E6E1DC] flex items-center justify-center">
        {profileImage && profileImage !== defaultProfileImage ? (
          <Image
            src={profileImage}
            alt={`${artisan.shopName} profile`}
            fill
            sizes="112px" // Optimize image loading
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <UserCircleIcon className="h-full w-full text-[#9E4F37]" />
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 pt-16 text-center w-full">
        <Link href={`/artisans/${artisan.userId}`} className="block">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#3E3E3E] group-hover:text-[#B55B3D] transition-colors line-clamp-1">
            {artisan.shopName}
          </h3>
        </Link>
        
        {/* Display User Name and Email */}
        {artisan.userName && (
          <p className="text-sm text-[#6C6C6C] mt-1">by {artisan.userName}</p>
        )}
        {artisan.userEmail && (
          <p className="text-sm text-[#6C6C6C] mb-2">{artisan.userEmail}</p>
        )}

        {/* Rating Display */}
        <div className="flex items-center justify-center mt-3 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(artisan.averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-base text-[#6C6C6C] ml-2">
            {artisan.averageRating.toFixed(1)} ({artisan.totalSales || 0})
          </span>
        </div>

        {artisan.location && (
          <p className="text-sm text-[#6C6C6C] flex items-center justify-center mb-3">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {artisan.location}
          </p>
        )}

        {artisan.shopDescription && (
          <p className="text-sm text-[#3E3E3E] line-clamp-3 mb-4 min-h-[4.5rem]">
            {artisan.shopDescription}
          </p>
        )}

        <Link href={`/meet-artisans/${artisan.userId}`} className="inline-block bg-[#B55B3D] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#9E4F37] transition-colors text-base">
          View Profile
        </Link>
      </div>
    </div>
  );
}