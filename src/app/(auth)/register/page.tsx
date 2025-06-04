
// src/app/(auth)/register/page.tsx

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '../../../lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useState
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

export default function RegisterForm() {
  const [state, formAction] = useActionState(register, {
    errors: {},
    message: null,
    success: false,
    redirectUrl: null,
  });
  const router = useRouter();

  // --- Start of Sticky Form Implementation ---
  // Use useState to manage the input values, initialized with empty strings or default values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('buyer'); // Default value for the select

  useEffect(() => {
    // Read from localStorage when the component mounts on the client
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('registerFormName');
      const savedEmail = localStorage.getItem('registerFormEmail');
      const savedRole = localStorage.getItem('registerFormRole'); // Corrected key for consistency

      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedRole) setRole(savedRole);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Handler for input changes to update state and localStorage
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: fieldName, value } = e.target; // Renamed 'name' to 'fieldName' to avoid conflict with component's 'name' state

    switch (fieldName) {
      case 'name':
        setName(value);
        localStorage.setItem('registerFormName', value);
        break;
      case 'email':
        setEmail(value);
        localStorage.setItem('registerFormEmail', value);
        break;
      case 'role':
        setRole(value);
        localStorage.setItem('registerFormRole', value);
        break;
      // Passwords are NOT handled here for security reasons
      default:
        break;
    }
  };
  // --- End of Sticky Form Implementation ---

  useEffect(() => {
    if (state?.success && state.redirectUrl) {
      router.push(state.redirectUrl);
      // Optionally clear localStorage on successful submission
      if (typeof window !== 'undefined') {
        localStorage.removeItem('registerFormName');
        localStorage.removeItem('registerFormEmail');
        localStorage.removeItem('registerFormRole');
      }
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F4EF]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-8 border border-[#E6E1DC]">
        <h1 className="text-2xl font-bold text-[#3E3E3E] mb-6 font-serif">Register</h1>
        {state?.message && !state.success && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {state.message}
          </div>
        )}
        <form action={formAction} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#3E3E3E]">
              Full Name
            </label>
            <div className="relative mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name} // Controlled input: value comes from state
                onChange={handleInputChange} // Update state and localStorage on change
                className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
            </div>
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3E3E3E]">
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email} // Controlled input: value comes from state
                onChange={handleInputChange} // Update state and localStorage on change
                className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
            </div>
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
            )}
          </div>

          {/* Password (no changes for security) */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3E3E3E]">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
            </div>
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
            )}
          </div>

          {/* Confirm Password (no changes for security) */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#3E3E3E]">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="block w-full rounded-md border border-[#E6E1DC] py-2 pl-10 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
            </div>
            {state?.errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#3E3E3E]">
              Register as
            </label>
            <select
              id="role"
              name="role"
              value={role} // Controlled select: value comes from state
              onChange={handleInputChange} // Update state and localStorage on change
              className="mt-1 block w-full rounded-md border border-[#E6E1DC] py-2 px-3 shadow-sm focus:border-[#B55B3D] focus:ring-[#B55B3D] bg-white text-[#3E3E3E]"
            >
              <option value="buyer">Buyer</option>
              <option value="artisan">Artisan</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <RegisterButton />

          {/* General Error Message */}
          {state?.message && !state.success && (
            <p className="mt-4 text-sm text-red-600">{state.message}</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#3E3E3E]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#B55B3D] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full rounded-md bg-[#B55B3D] py-2 px-4 text-white hover:bg-[#9E4F37] focus:outline-none focus:ring-2 focus:ring-[#B55B3D] focus:ring-offset-2 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}