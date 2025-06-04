
// src/app/(main)/artisans/list/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Import the NEW specific function for the list page
import { fetchArtisanProfilesForList } from '@/lib/data/artisans';
// No need to import the general ArtisanProfile if you define a specific type here
// import { type ArtisanProfile } from '@/lib/definitions'; // Can likely remove this import if not used elsewhere

import { MapPinIcon, StarIcon } from '@heroicons/react/24/outline'; // Removed ShoppingBagIcon as it wasn't used
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline'; // For fallback image

// --- NEW TYPE DEFINITION FOR THE LIST DATA ---
// This interface explicitly defines the structure of data returned by fetchArtisanProfilesForList
interface ArtisanProfileForList {
  id: string;
  userId: string; // Used for linking to the individual artisan's page
  shopName: string;
  shopDescription: string | null;
  location: string | null;
  averageRating: number; // Based on your schema @default(0.0)
  totalSales: number; // Based on your schema @default(0)
  isTopArtisan: boolean;
  profileImageUrl: string | null; // This is the key field we are now fetching
  userName: string | null; // ADDED: User's name
  userEmail: string | null; // ADDED: User's email
}

export default function ArtisanListPage() {
  // Use the new, more specific type for the state
  const [artisans, setArtisans] = useState<ArtisanProfileForList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtisans() {
      try {
        // Call the NEW function
        const data = await fetchArtisanProfilesForList();
        setArtisans(data); // No casting needed as the type explicitly matches now
      } catch (err) {
        console.error('Failed to load artisans:', err);
        setError('Failed to load artisans. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    loadArtisans();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] animate-pulse"
            >
              <div className="h-48 bg-[#E6E1DC]"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 w-3/4 bg-[#E6E1DC] rounded"></div>
                <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
                <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">Error Loading Artisans</h2>
          <p className="text-[#6C6C6C] mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#B55B3D] hover:bg-[#9E4F37]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (artisans.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Artisans Found</h2>
          <p className="text-[#6C6C6C] mb-6">There are currently no artisans registered on the platform.</p>
          <Link href="/">
            <Button className="bg-[#B55B3D] hover:bg-[#9E4F37]">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#3E3E3E] mb-2">Meet Our Artisans</h1>
        <p className="text-[#6C6C6C] max-w-3xl">
          Discover talented artisans and their unique handcrafted creations. Each artisan brings their own style and
          craftsmanship to our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48 bg-[#F9F4EF] flex items-center justify-center">
              {/* Display profile image using the directly available profileImageUrl */}
              {artisan.profileImageUrl ? (
                <Image
                  src={artisan.profileImageUrl}
                  alt={`${artisan.shopName} profile`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#6C6C6C]">
                  <UserCircleIcon className="h-20 w-20" />
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-[#3E3E3E] truncate">{artisan.shopName}</h3>
                {artisan.isTopArtisan && (
                  <span className="flex items-center bg-[#FFF8F5] text-[#B55B3D] px-2 py-1 rounded-full text-xs">
                    <StarIcon className="h-3 w-3 mr-1" />
                    Top Artisan
                  </span>
                )}
              </div>

              {/* ADDED: Display User Name and Email */}
              {artisan.userName && <p className="text-sm text-[#3E3E3E] mb-1">By: {artisan.userName}</p>}
              {artisan.userEmail && <p className="text-sm text-[#6C6C6C] mb-2">{artisan.userEmail}</p>}

              {artisan.location && (
                <p className="text-sm text-[#6C6C6C] flex items-center mb-2">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {artisan.location}
                </p>
              )}

              {artisan.shopDescription && (
                <p className="text-sm text-[#3E3E3E] line-clamp-2 mb-4">{artisan.shopDescription}</p>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm ml-1">{artisan.averageRating?.toFixed(1) || '0.0'}</span>
                  <span className="text-sm text-[#6C6C6C] ml-1">({artisan.totalSales || 0})</span>
                </div>

                <Link href={`/artisans/${artisan.userId}`}>
                  <Button
                    variant="outline"
                    className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF] text-sm h-8 px-3"
                  >
                    View Shop
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}