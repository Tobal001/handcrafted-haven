
// src/lib/definitions.ts

import { z } from 'zod';
export type UserRole = 'buyer' | 'artisan' | 'admin';

// Corrected User type to match Prisma's camelCase naming and returned types
export type User = {
  id: string;
  name: string | null; // Corrected: name can be string or null
  email: string;
  password: string | null; // Corrected: password can be string or null
  role: UserRole;
  emailVerified: Date | null;
  verificationToken: string | null;
  resetToken: string | null;
  resetTokenExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// UserInput remains the same as it defines the structure of data provided for creation
export type UserInput = {
  name: string;
  email: string;
  password: string; // This is the hashed password string, provided as non-null input
  role: UserRole;
  email_verified: boolean;
  verification_token: string | null;
  reset_token: string | null;
  reset_token_expires: Date | null;
};


export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
  image?: string | null;
}


// --- PROFILE DEFINITIONS ---

// UPDATED: Changed to camelCase to match Prisma model
export interface Profile {
  profileId: string; 
  userId: string;    
  bio: string | null;
  profileImageUrl: string | null; 
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;      
  country: string | null;
  phoneNumber: string | null;  
  createdAt: Date; 
  updatedAt: Date; 
}

// export type ProfileFormData = Omit<Profile, 'profileId' | 'userId' | 'createdAt' | 'updatedAt' | 'profileImageUrl'>;
export type ProfileFormData = Omit<Profile, 'profileId' | 'userId' | 'createdAt' | 'updatedAt'>;

// --- NEW ZOD SCHEMA FOR PROFILE FORM ---
export const ProfileFormSchema = z.object({
  bio: z.string().max(500, "Bio must be 500 characters or less").optional().nullable(),
  profileImageUrl: z.string().url("Must be a valid URL").optional().nullable(),
  address: z.string().max(255, "Address must be 255 characters or less").optional().nullable(),
  city: z.string().max(255, "City must be 255 characters or less").optional().nullable(),
  state: z.string().max(255, "State must be 255 characters or less").optional().nullable(),
  zipCode: z.string().max(50, "ZIP/Postal Code must be 50 characters or less").optional().nullable(),
  country: z.string().max(100, "Country must be 100 characters or less").optional().nullable(),
  phoneNumber: z.string()
    .refine(val => !val || /^\+?[0-9\s-()]{7,20}$/.test(val), "Invalid phone number format") // Optional: Simple phone regex
    .optional()
    .nullable(),
});


// Define a type for validation errors
export type ProfileFormErrors = z.infer<typeof ProfileFormSchema>;
// Or, more explicitly:
export type ProfileFormValidationErrors = {
  bio?: string[];
  profileImageUrl?: string[]; 
  address?: string[];
  city?: string[];
  state?: string[];
  zipCode?: string[];
  country?: string[];
  phoneNumber?: string[];
};




// --- NEW CATEGORY DEFINITIONS ---

// Define a type for the minimal category information when nested in relations.
// This matches what you explicitly select for 'parent' and 'subcategories' in Prisma queries.
export type CategoryRelationInfo = {
  categoryId: string;
  name: string;
};

// This interface reflects the Prisma model for Category,
// with corrected types for nested relations.
export interface Category {
  categoryId: string;
  name: string;
  description: string | null;
  parentCategoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Prisma relations - now using the specific type for nested info
  parent?: CategoryRelationInfo | null; // A parent will only have ID and name (as selected)
  subcategories?: CategoryRelationInfo[]; // Subcategories will only have ID and name (as selected)
}

// Type for form data when creating/updating a category
// Omit fields handled automatically by Prisma or not part of direct form input
export type CategoryFormData = Omit<Category, 'categoryId' | 'createdAt' | 'updatedAt' | 'parent' | 'subcategories'>;

// Zod schema for validating category form input
export const CategoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Category name is required').max(255, "Name must be 255 characters or less"),
  description: z.string().max(1000, "Description must be 1000 characters or less").optional().nullable(),
  parentCategoryId: z.string().uuid("Invalid parent category ID format").optional().nullable(), // For new/edit forms, parentCategoryId can be null or a UUID
});

// Type for category form validation errors
export type CategoryFormErrors = z.infer<typeof CategoryFormSchema>;
// This type can be useful for displaying errors in a UI
export type CategoryFormValidationErrors = {
  name?: string[];
  description?: string[];
  parentCategoryId?: string[];
};





// ARTISANS DEFINATIONS

// Add to existing definitions

export interface ArtisanProfile {
  id: string;
  userId: string;
  shopName: string;
  shopDescription: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  policies: string | null;
  shippingInfo: string | null;
  returnPolicy: string | null;
  averageRating: number;
  totalSales: number;
  isTopArtisan: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ArtisanProfileFormData = Omit<
  ArtisanProfile,
  'id' | 'userId' | 'averageRating' | 'totalSales' | 'isTopArtisan' | 'createdAt' | 'updatedAt'
>;

export const ArtisanProfileFormSchema = z.object({
  shopName: z.string().min(1, 'Shop name is required').max(255, 'Shop name must be 255 characters or less'),
  shopDescription: z.string().max(1000, 'Description must be 1000 characters or less').optional().nullable(),
  bio: z.string().max(500, 'Bio must be 500 characters or less').optional().nullable(),
  location: z.string().max(100, 'Location must be 100 characters or less').optional().nullable(),
  website: z.string().url('Must be a valid URL').optional().nullable(),
  policies: z.string().max(2000, 'Policies must be 2000 characters or less').optional().nullable(),
  shippingInfo: z.string().max(2000, 'Shipping info must be 2000 characters or less').optional().nullable(),
  returnPolicy: z.string().max(2000, 'Return policy must be 2000 characters or less').optional().nullable(),
});

export type ArtisanProfileFormErrors = z.infer<typeof ArtisanProfileFormSchema>;
export type ArtisanProfileFormValidationErrors = {
  shopName?: string[];
  shopDescription?: string[];
  bio?: string[];
  location?: string[];
  website?: string[];
  policies?: string[];
  shippingInfo?: string[];
  returnPolicy?: string[];
};