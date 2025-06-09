
// src/app/(main)/artisans/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  fetchArtisanProfileByUserId,
  createArtisanProfile,
  updateArtisanProfile,
  deleteArtisanProfile
} from '@/lib/data/artisans';
import { fetchProfileByUserId } from '@/lib/data/profile';
import { fetchSellerAverageRating } from '@/lib/data/products'; // NEW: Import for average rating
import ArtisanProfileForm from '@/components/artisans/ArtisanProfileForm';
import ArtisanProfileView from '@/components/artisans/ArtisanProfileView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StarIcon, PlusIcon, FolderOpenIcon } from '@heroicons/react/24/outline'; // New icons for product management

export default function ArtisansPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [artisanProfile, setArtisanProfile] = useState<any>(null);
  const [averageProductRating, setAverageProductRating] = useState<number | null>(null); // NEW state for average rating
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (session?.user?.id) {
        try {
          const userProfile = await fetchProfileByUserId(session.user.id);
          setProfile(userProfile || null);
          setHasProfile(!!userProfile);

          if (userProfile) {
            const artisanData = await fetchArtisanProfileByUserId(session.user.id);
            setArtisanProfile(artisanData || null);

            // NEW: Fetch average product rating for this artisan
            const avgRating = await fetchSellerAverageRating(session.user.id);
            setAverageProductRating(avgRating.averageRating);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to load profiles or rating:', error);
          setIsLoading(false);
        }
      }
    }
    loadData();
  }, [session]);

  const handleCreateProfile = async (formData: FormData) => {
    try {
      if (!session?.user?.id) return;
      await createArtisanProfile(session.user.id, formData);
      const newProfile = await fetchArtisanProfileByUserId(session.user.id);
      setArtisanProfile(newProfile);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create artisan profile:', error);
    }
  };

  const handleUpdateProfile = async (formData: FormData) => {
    try {
      if (!session?.user?.id) return;
      await updateArtisanProfile(session.user.id, formData);
      const updatedProfile = await fetchArtisanProfileByUserId(session.user.id);
      setArtisanProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update artisan profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      if (!session?.user?.id) return;
      // Add a confirmation dialog here for better UX
      if (confirm('Are you sure you want to delete your artisan profile? This action cannot be undone.')) {
        await deleteArtisanProfile(session.user.id);
        setArtisanProfile(null);
      }
    } catch (error) {
      console.error('Failed to delete artisan profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
          <div className="h-8 w-1/3 bg-[#E6E1DC] rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 w-full bg-[#E6E1DC] rounded"></div>
            <div className="h-4 w-2/3 bg-[#E6E1DC] rounded"></div>
            <div className="h-4 w-1/2 bg-[#E6E1DC] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // If user doesn't have a profile yet
  if (!hasProfile) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">Profile Required</h2>
          <p className="text-[#6C6C6C] mb-6">
            You need to create a personal profile before you can create an artisan profile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => router.push('/dashboard/profile')}
              className="bg-[#B55B3D] hover:bg-[#9E4F37]"
            >
              Create Profile
            </Button>
            <Link href="/dashboard">
              <Button 
                variant="outline"
                className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user has profile but no artisan profile
  if (!artisanProfile && !isCreating) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6 text-center">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-4">No Artisan Profile Found</h2>
          <p className="text-[#6C6C6C] mb-6">You haven't created an artisan profile yet.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-[#B55B3D] hover:bg-[#9E4F37]"
            >
              Create Artisan Profile
            </Button>
            <Link href="/dashboard">
              <Button 
                variant="outline"
                className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Create Artisan Profile</h2>
          <ArtisanProfileForm 
            onSubmit={handleCreateProfile}
          />
          <div className="mt-4">
            <Button 
              onClick={() => setIsCreating(false)}
              variant="outline"
              className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
          <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6">Edit Artisan Profile</h2>
          <ArtisanProfileForm 
            profile={artisanProfile}
            onSubmit={handleUpdateProfile}
            isEditing={true}
          />
          <div className="mt-4">
            <Button 
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="border-[#3E3E3E] text-[#3E3E3E] hover:bg-[#F9F4EF]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Display both profile and artisan profile when both exist
  return (
    <div className="p-6 space-y-6">
      {/* Page Title & Description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3E3E3E] mb-2">
          Artisan Dashboard
        </h1>
        <p className="text-[#6C6C6C] max-w-2xl">
          Manage your personal and artisan profiles, and oversee your product listings.
        </p>
      </div>

      {/* Main Content Grid for Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-[#F3ECE5]">
            <h2 className="text-xl font-serif font-bold text-[#3E3E3E]">Personal Information</h2>
            <Button 
              onClick={() => router.push('/dashboard/profile')}
              variant="outline"
              className="border-[#B55B3D] text-[#B55B3D] hover:bg-[#F9F4EF] text-sm py-1 px-3"
            >
              Edit Profile
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {profile?.profileImageUrl && (
              <div className="flex-shrink-0">
                <img 
                  src={profile.profileImageUrl} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full object-cover border-2 border-[#B55B3D] shadow-sm"
                />
              </div>
            )}
            <div className="flex-grow text-center md:text-left">
              {session?.user?.name && (
                <p className="text-[#3E3E3E] text-xl font-semibold mb-2">{session.user.name}</p>
              )}
              {session?.user?.email && (
                <p className="text-sm text-[#6C6C6C] mb-4">{session.user.email}</p>
              )}

              {profile?.bio && (
                <div className="mb-4 text-[#3E3E3E]">
                  <h3 className="text-xs font-medium text-[#6C6C6C] uppercase tracking-wider mb-1">About Me</h3>
                  <p>{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#F3ECE5] grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            {(profile?.address || profile?.city || profile?.state || profile?.zipCode) && (
              <div>
                <h3 className="text-xs font-medium text-[#6C6C6C] uppercase tracking-wider mb-1">Address</h3>
                <p className="text-[#3E3E3E]">
                  {profile.address && <>{profile.address}<br /></>}
                  {profile.city && <>{profile.city}, </>}
                  {profile.state} {profile.zipCode}
                </p>
              </div>
            )}
            {profile?.country && (
              <div>
                <h3 className="text-xs font-medium text-[#6C6C6C] uppercase tracking-wider mb-1">Country</h3>
                <p className="text-[#3E3E3E]">{profile.country}</p>
              </div>
            )}
            {profile?.phoneNumber && (
              <div>
                <h3 className="text-xs font-medium text-[#6C6C6C] uppercase tracking-wider mb-1">Phone</h3>
                <p className="text-[#3E3E3E]">{profile.phoneNumber}</p>
              </div>
            )}
          </div>
        </div>
    
        {/* Artisan Profile Section (Existing component, but with added Avg Rating) */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
          <ArtisanProfileView 
            profile={artisanProfile}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteProfile}
          />
          {/* NEW: Average Rating Display */}
          <div className="mt-6 pt-4 border-t border-[#F3ECE5] text-center md:text-left">
            <h3 className="text-xs font-medium text-[#6C6C6C] uppercase tracking-wider mb-2">Average Product Rating</h3>
            {averageProductRating !== null && averageProductRating > 0 ? ( // Display only if rating is available and > 0
              <div className="flex items-center justify-center md:justify-start">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageProductRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill={star <= Math.round(averageProductRating) ? 'currentColor' : 'none'} // Ensure solid stars
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-[#3E3E3E]">
                  {averageProductRating.toFixed(1)}
                </span>
                {/* Review count can be fetched from the overall product review count for the artisan, or removed if not aggregated */}
                {/* <span className="text-sm text-[#6C6C6C] ml-2">({artisanProfile?.totalSales || 0} reviews)</span>  */}
              </div>
            ) : (
              <p className="text-[#6C6C6C]">No products reviewed yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Management Section (NEW) */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E6E1DC] p-6">
        <h2 className="text-xl font-serif font-bold text-[#3E3E3E] mb-6 border-b pb-4 border-[#F3ECE5]">
          Product Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/artisans/products" className="block">
            <Button className="w-full bg-[#B55B3D] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#9E4F37] transition-colors">
              <FolderOpenIcon className="h-5 w-5" />
              Manage All Products
            </Button>
          </Link>
          <Link href="/products/create" className="block">
            <Button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
              <PlusIcon className="h-5 w-5" />
              Add New Product
            </Button>
          </Link>
          {/* Link to manage categories (if applicable, assuming a dedicated page) */}
          <Link href="/products/categories" className="block">
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <FolderOpenIcon className="h-5 w-5" />
              Manage Categories
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/dashboard" className="text-[#B55B3D] hover:underline text-sm">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}