
// src/auth.ts

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { User, UserRole } from './lib/definitions';
import bcrypt from 'bcryptjs';
import { LoginFormSchema } from './lib/schemas';

async function getUser(email: string): Promise<User | undefined> {
  console.log(`[getUser] Attempting to fetch user for email: ${email}`); // DEBUG
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    if (user.rows.length > 0) {
      console.log(`[getUser] User fetched from DB: Found user with email ${email}`); // DEBUG
      return user.rows[0];
    } else {
      console.log(`[getUser] User not found for email: ${email}`); // DEBUG
      return undefined;
    }
  } catch (error) {
    console.error('[getUser] Failed to fetch user:', error); // DEBUG
    throw new Error('Failed to fetch user.');
  }
}

// Helper function to get base URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('--- Start of authorize function ---'); // DEBUG
        console.log('Attempting login with credentials:', credentials); // DEBUG (Be cautious with logging passwords in production)

        const parsedCredentials = LoginFormSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Parsed credentials failed:', parsedCredentials.error.flatten().fieldErrors); // DEBUG
          return null; // Invalid credentials format
        }

        console.log('Parsed credentials success: true'); // DEBUG - CORRECTED LINE
        const { email, password } = parsedCredentials.data;
        console.log(`Attempting login for email: ${email}`); // DEBUG

        const user = await getUser(email);
        if (!user) {
          console.log(`User fetched from DB: Not Found for email ${email}`); // DEBUG
          console.log('--- End of authorize function (User Not Found) ---'); // DEBUG
          return null; // User not found in database
        }

        // --- NEW CODE ADDED HERE ---
        // If user.password is null, this means there's no password stored for the user.
        // In such a case, the login should fail.
        if (user.password === null) {
          console.log(`Login attempt for ${user.email}: No password set for this user.`); // DEBUG
          console.log('--- End of authorize function (No Password) ---'); // DEBUG
          return null; // Prevent login if no password is set
        }
        // --- END NEW CODE ---

        console.log('User fetched from DB: Found'); // DEBUG
        console.log('Comparing passwords...'); // DEBUG
        // Now, TypeScript knows user.password is definitely a string here
        const passwordsMatch = await bcrypt.compare(password, user.password);
        console.log(`Passwords match result: ${passwordsMatch}`); // DEBUG

        if (passwordsMatch) {
          console.log(`Login successful for user: ${user.email}`); // DEBUG
          console.log('--- End of authorize function (Success) ---'); // DEBUG
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        } else {
          console.log('--- End of authorize function (Password Mismatch) ---'); // DEBUG
          return null; // Passwords do not match
        }
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
        session.user.name = token.name as string | null; // Ensure consistency with User type
        session.user.role = token.role as UserRole;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url }) {
      const siteUrl = getBaseUrl();

      if (url.startsWith('/login')) {
        return `${siteUrl}/dashboard`;
      }

      if (url === '/logout') {
        return `${siteUrl}/login`;
      }

      return url.startsWith('/') ? `${siteUrl}${url}` : url;
    }
  },
});