
// src/types/next-auth.d.ts

import { NextRequest as OriginalNextRequest } from 'next/server';
import { Session } from 'next-auth'; // Import Session type from next-auth
import { JWT as OriginalJWT } from 'next-auth/jwt'; // Import OriginalJWT

// Extend the NextRequest interface to include the `auth` property
declare module 'next/server' {
  interface NextRequest {
    auth?: Session | null; // The 'auth' property can be a Session object or null
  }
}

// Extend the JWT interface to allow null/undefined for name and email
declare module "next-auth/jwt" {
  interface JWT extends OriginalJWT {
    id: string;
    role: 'buyer' | 'artisan' | 'admin';
    // Allow name and email to be string | null | undefined as per SessionUser
    name?: string | null;
    email?: string | null;
  }
}

// Ensure DefaultSession and DefaultUser are also updated
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: 'buyer' | 'artisan' | 'admin';
      name?: string | null; // Match SessionUser type
      email?: string | null; // Match SessionUser type
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: 'buyer' | 'artisan' | 'admin';
    name?: string | null; // Match User type
    email?: string | null; // Match User type
  }
}