
// src/auth.config.ts

import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login' // You might want a specific error page if you handle errors differently
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if a user session exists

      // Define all authentication routes (login/register pages)
      const isAuthPage =
        nextUrl.pathname.startsWith('/login') ||
        nextUrl.pathname.startsWith('/register');

      // Define ALL routes that require the user to be logged in (any user role)
      const isProtectedRoute =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/products/categories') || // <-- Explicitly protect this specific path
        nextUrl.pathname.startsWith('/products/manage') || 
        nextUrl.pathname.startsWith('/admin') ||  
        nextUrl.pathname.startsWith('/artisans') || 
        nextUrl.pathname.startsWith('/artisans/list');

      // 1. If it's an authentication page AND the user IS logged in, redirect to dashboard.
      // This prevents logged-in users from accessing login/register pages.
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // 2. If it's a protected route AND the user is NOT logged in, deny access.
      // Returning 'false' here tells NextAuth.js to redirect to the 'signIn' page.
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      // 3. For all other cases (e.g., public pages, or authenticated users on protected pages), allow access.
      // Role-based authorization will be handled in `middleware.ts` for authenticated users.
      return true;
    },
  },
  providers: [], // Add your providers here. They are usually imported from 'next-auth/providers'
};