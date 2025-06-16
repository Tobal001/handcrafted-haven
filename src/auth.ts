// src/auth.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

import { LoginFormSchema } from './lib/schemas';
import { User, UserRole } from './lib/definitions';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return result.rows[0];
  } catch (error) {
    console.error('[getUser] Failed to fetch user:', error);
    throw new Error('Database error');
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // 24 hours
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = LoginFormSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user || !user.password) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export const { auth, handlers } = handler;
