
// src/lib/data/artisans.ts:

'use server';

import { fetchProfileByUserId } from './profile';
import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/lib/prisma';
import { ArtisanProfile, ArtisanProfileFormData } from '@/lib/definitions';

// Helper function to safely get string values from FormData
function getStringValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  if (typeof value === 'string') {
    return value;
  }
  return null;
}

export async function createArtisanProfile(userId: string, formData: FormData) {
  noStore();
  try {
    const profileData: ArtisanProfileFormData = {
      shopName: getStringValue(formData, 'shopName') || '', // Required field
      shopDescription: getStringValue(formData, 'shopDescription'),
      bio: getStringValue(formData, 'bio'),
      location: getStringValue(formData, 'location'),
      website: getStringValue(formData, 'website'),
      policies: getStringValue(formData, 'policies'),
      shippingInfo: getStringValue(formData, 'shippingInfo'),
      returnPolicy: getStringValue(formData, 'returnPolicy'),
    };

    // Use Prisma to create the artisan profile
    await prisma.artisanProfile.create({
      data: {
        userId: userId,
        shopName: profileData.shopName,
        shopDescription: profileData.shopDescription,
        bio: profileData.bio,
        location: profileData.location,
        website: profileData.website,
        policies: profileData.policies,
        shippingInfo: profileData.shippingInfo,
        returnPolicy: profileData.returnPolicy,
      },
    });
  } catch (error) {
    console.error('Database Error (createArtisanProfile):', error);
    throw new Error('Failed to create artisan profile.');
  }
}

export async function fetchArtisanProfileByUserId(userId: string): Promise<ArtisanProfile | undefined> {
  noStore();
  try {
    const profile = await prisma.artisanProfile.findUnique({
      where: {
        userId: userId,
      },
    });
    return profile || undefined;
  } catch (error) {
    console.error('Database Error (fetchArtisanProfileByUserId):', error);
    throw new Error('Failed to fetch artisan profile.');
  }
}

export async function updateArtisanProfile(userId: string, formData: FormData) {
  noStore();
  try {
    const profileData: Partial<ArtisanProfileFormData> = {
      shopName: getStringValue(formData, 'shopName') || undefined,
      shopDescription: getStringValue(formData, 'shopDescription'),
      bio: getStringValue(formData, 'bio'),
      location: getStringValue(formData, 'location'),
      website: getStringValue(formData, 'website'),
      policies: getStringValue(formData, 'policies'),
      shippingInfo: getStringValue(formData, 'shippingInfo'),
      returnPolicy: getStringValue(formData, 'returnPolicy')
    };

    // Filter out undefined values
    const updateData = Object.fromEntries(
      Object.entries(profileData).filter(([_, v]) => v !== undefined)
    );

    // Use Prisma to update the artisan profile
    await prisma.artisanProfile.update({
      where: {
        userId: userId,
      },
      data: updateData,
    });
  } catch (error) {
    console.error('Database Error (updateArtisanProfile):', error);
    throw new Error('Failed to update artisan profile.');
  }
}

export async function deleteArtisanProfile(userId: string) {
  noStore();
  try {
    await prisma.artisanProfile.delete({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error('Database Error (deleteArtisanProfile):', error);
    throw new Error('Failed to delete artisan profile.');
  }
}





// Add this function to your existing artisans data file
export async function fetchAllArtisanProfiles(): Promise<ArtisanProfile[]> {
  try {
    const artisans = await prisma.artisanProfile.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          },
        },
      },
    });

    return artisans.map((artisan) => ({
      ...artisan,
      name: artisan.user.name || '',
      email: artisan.user.email || '',
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artisan profiles.');
  }
}




// NEW FUNCTION: Optimized for the artisan list page with images
export async function fetchArtisanProfilesForList() {
  noStore(); // Prevents caching for fresh data

  try {
    const artisans = await prisma.artisanProfile.findMany({
      select: {
        id: true,
        userId: true, // You might need this for the Link href
        shopName: true,
        shopDescription: true,
        location: true,
        averageRating: true,
        totalSales: true,
        isTopArtisan: true,
        user: {
          select: {
            name: true, // ADDED: Select the user's name
            email: true, // ADDED: Select the user's email
            profile: {
              select: {
                profileImageUrl: true, // ONLY select the image URL
              },
            },
          },
        },
      },
    });

    // Map to flatten the structure slightly if needed for your component's type,
    // or adjust your component's type to match the nested structure.
    return artisans.map((artisan) => ({
      ...artisan,
      profileImageUrl: artisan.user?.profile?.profileImageUrl || null,
      userName: artisan.user?.name || null, // ADDED: Flatten user name
      userEmail: artisan.user?.email || null, // ADDED: Flatten user email
    }));
  } catch (error) {
    console.error('Database Error (fetchArtisanProfilesForList):', error);
    throw new Error('Failed to fetch artisan profiles for list with images.');
  }
}