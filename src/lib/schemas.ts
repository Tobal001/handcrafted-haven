

// src/lib/schemas.ts

import { z } from 'zod';

export const RegisterFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  role: z.enum(['buyer', 'artisan', 'admin']).default('buyer'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  role?: string[];
};

export type RegisterFormState = {
  errors?: RegisterFormErrors;
  message?: string | null;
  success?: boolean;
  redirectUrl?: string | null;
};

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional()
});

export type LoginFormErrors = {
  email?: string[];
  password?: string[];
};

export type LoginFormState = {
  errors?: LoginFormErrors;
  message?: string | null;
  success?: boolean;
  redirectUrl?: string;
};