
// src/lib/db.ts

import { User, UserInput } from './definitions';
import bcrypt from 'bcryptjs'; // Keep this import for clarity, though it won't be used in createUser anymore
import prisma from './prisma';

export async function createUser(userInput: UserInput): Promise<User> {
  // REMOVE THE LINE BELOW - the password is ALREADY hashed in actions.ts
  // const hashedPassword = await bcrypt.hash(userInput.password, 10); 
  const now = new Date();

  try {
    const createdUser = await prisma.user.create({
      data: {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password, // USE THE ALREADY HASHED PASSWORD DIRECTLY
        role: userInput.role,
        emailVerified: userInput.email_verified ? now : null,
        verificationToken: userInput.verification_token ?? null,
        resetToken: userInput.reset_token ?? null,
        resetTokenExpires: userInput.reset_token_expires ?? null,
      },
    });
    return createdUser;
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      console.error('Registration error: Email already exists.');
      throw new Error('Email already registered. Please use a different email.');
    }
    console.error('Registration error:', error);
    throw new Error('Failed to create user.');
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user by email:', error);
    throw new Error('Failed to retrieve user data.');
  }
}