
// src/lib/actions.ts

'use server';

// import { z } from 'zod';
import { LoginFormSchema, RegisterFormSchema, type LoginFormState, type RegisterFormState } from './schemas';
import bcrypt from 'bcryptjs';
import { signIn } from '../auth';
import { createUser, getUserByEmail } from './db';
// import { redirect } from 'next/navigation';

export async function login(
  prevState: LoginFormState | null,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    remember: formData.get('remember') === 'on'
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      success: false
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (!result) {
      return {
        message: 'No response from authentication server',
        success: false
      };
    }

    if (result.error) {
      return {
        message: 'Invalid email or password. Please try again.',
        success: false
      };
    }

    return { 
      success: true,
      message: 'Login successful!',
      redirectUrl: result.url || '/dashboard'
    };
    
  } catch (error) {
    console.error('Login error:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false
    };
  }
}

export async function register(
  prevState: RegisterFormState | null,
  formData: FormData
): Promise<RegisterFormState> {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      success: false
    };
  }

  const { name, email, password, role } = validatedFields.data;

  try {
    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        errors: { email: ['Email already in use'] },
        message: 'This email is already registered.',
        success: false
      };
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      name,
      email,
      password: hashedPassword,
      role,
      email_verified: false,
      verification_token: null,
      reset_token: null,
      reset_token_expires: null
    });

    return { 
      success: true,
      message: 'Registration successful! Redirecting to login...',
      redirectUrl: '/login?registered=true'
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      message: 'An error occurred during registration. Please try again.',
      success: false
    };
  }
}