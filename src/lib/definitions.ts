
// src/lib/definitions.ts

export type UserRole = 'buyer' | 'artisan' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  email_verified: boolean;
  verification_token: string | null;
  reset_token: string | null;
  reset_token_expires: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type UserInput = Omit<User, 'id' | 'created_at' | 'updated_at'> & {
  created_at?: Date;
  updated_at?: Date;
};

export type ArtisanProfile = {
  id: string;
  user_id: string;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  website: string | null;
  social_media: Record<string, string> | null;
  created_at: Date;
  updated_at: Date;
};


// Add this new interface for the session user
export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
  image?: string | null;
}