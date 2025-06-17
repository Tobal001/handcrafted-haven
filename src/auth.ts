import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import prisma from '@/lib/prisma';
import { UserRole } from './lib/definitions';
import bcrypt from 'bcryptjs';
import { LoginFormSchema } from './lib/schemas';

// --- getUser using Prisma ---
async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error('[getUser] Error:', error);
    throw new Error('Failed to fetch user.');
  }
}

// --- Helper for absolute redirects ---
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

const authOptions: NextAuthConfig = {
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
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

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role as UserRole;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string | null;
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url }: { url: string }) {
      const siteUrl = getBaseUrl();
      if (url.startsWith('/login')) return `${siteUrl}/dashboard`;
      if (url === '/logout') return `${siteUrl}/login`;
      return url.startsWith('/') ? `${siteUrl}${url}` : url;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { authOptions };
