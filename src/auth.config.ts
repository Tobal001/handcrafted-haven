// src/auth.config.ts
import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.firstLogin = token.firstLogin;
        session.user.hasProfile = token.hasProfile;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstLogin = user.firstLogin;
        token.hasProfile = user.hasProfile;
      }
      return token;
    },
  },
  providers: [], // Add your providers like Credentials here
};
