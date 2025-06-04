
// src/lib/data/profile.ts

'use server'; // <--- Ensure this is at the very top

import { unstable_noStore as noStore } from 'next/cache';
import { Profile, ProfileFormData } from '@/lib/definitions';
import prisma from '@/lib/prisma'; 

// Helper function to safely get string values from FormData
function getStringValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  // Check if value is truly null or an empty string, treat empty string as null
  if (value === null || (typeof value === 'string' && value.trim() === '')) return null;

  if (typeof value === 'string') return value;
  return null; // Return null for non-string values (e.g., File objects if input type was file)
}

export async function createProfile(userId: string, formData: FormData) {
  noStore();
  try {
    const profileData: ProfileFormData = {
      bio: getStringValue(formData, 'bio'),
      profileImageUrl: getStringValue(formData, 'profileImageUrl'), // NEW: Get profileImageUrl
      address: getStringValue(formData, 'address'),
      city: getStringValue(formData, 'city'),
      state: getStringValue(formData, 'state'),
      zipCode: getStringValue(formData, 'zipCode'),
      country: getStringValue(formData, 'country'),
      phoneNumber: getStringValue(formData, 'phoneNumber'),
    };

    // Use Prisma to create the profile
    await prisma.profile.create({
      data: {
        userId: userId,
        bio: profileData.bio,
        profileImageUrl: profileData.profileImageUrl, // NEW: Include profileImageUrl
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipCode: profileData.zipCode,
        country: profileData.country,
        phoneNumber: profileData.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Database Error (createProfile):', error);
    throw new Error('Failed to create profile.');
  }
}

export async function fetchProfileByUserId(userId: string): Promise<Profile | undefined> {
  noStore();
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    return profile || undefined;
  } catch (error) {
    console.error('Database Error (fetchProfileByUserId):', error);
    throw new Error('Failed to fetch profile.');
  }
}

export async function updateProfile(userId: string, formData: FormData) {
  noStore();
  try {
    const profileData: ProfileFormData = {
      bio: getStringValue(formData, 'bio'),
      profileImageUrl: getStringValue(formData, 'profileImageUrl'), // NEW: Get profileImageUrl
      address: getStringValue(formData, 'address'),
      city: getStringValue(formData, 'city'),
      state: getStringValue(formData, 'state'),
      zipCode: getStringValue(formData, 'zipCode'),
      country: getStringValue(formData, 'country'),
      phoneNumber: getStringValue(formData, 'phoneNumber'),
    };

    // Use Prisma to update the profile
    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        bio: profileData.bio,
        profileImageUrl: profileData.profileImageUrl, // NEW: Include profileImageUrl
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        zipCode: profileData.zipCode,
        country: profileData.country,
        phoneNumber: profileData.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Database Error (updateProfile):', error);
    throw new Error('Failed to update profile.');
  }
}

export async function deleteProfile(userId: string) {
  noStore();
  try {
    await prisma.profile.delete({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error('Database Error (deleteProfile):', error);
    throw new Error('Failed to delete profile.');
  }
}