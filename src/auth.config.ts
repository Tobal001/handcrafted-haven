
// src/auth.config.ts

import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = 
        nextUrl.pathname.startsWith('/login') || 
        nextUrl.pathname.startsWith('/register');
      
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      // Protect dashboard routes
      if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }
      
      return true;
    },
  },
  providers: [],
};

