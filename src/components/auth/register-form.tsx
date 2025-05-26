

// // src/components/auth/register-form.tsx

// 'use client';

// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { register } from '../../lib/actions';
// import {
//   CheckIcon,
//   UserCircleIcon,
//   EnvelopeIcon,
//   LockClosedIcon,
//   KeyIcon,
// } from '@heroicons/react/24/outline';
// import { Button } from '../../components/ui/button';
// import Link from 'next/link';

// export default function RegisterForm() {
//   const [state, formAction] = useActionState(register, {
//     errors: {},
//     message: null,
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-amber-50">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-8">
//         <h1 className="text-2xl font-bold text-amber-900 mb-6">Register</h1>
//         <form action={formAction} className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-amber-900">
//               Full Name
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
//                 aria-describedby="name-error"
//               />
//               <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
//             </div>
//             {state?.errors?.name && (
//               <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-amber-900">
//               Email
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
//                 aria-describedby="email-error"
//               />
//               <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
//             </div>
//             {state?.errors?.email && (
//               <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-amber-900">
//               Password
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 minLength={6}
//                 className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
//                 aria-describedby="password-error"
//               />
//               <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
//             </div>
//             {state?.errors?.password && (
//               <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-900">
//               Confirm Password
//             </label>
//             <div className="relative mt-1">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 minLength={6}
//                 className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
//                 aria-describedby="confirmPassword-error"
//               />
//               <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
//             </div>
//             {state?.errors?.confirmPassword && (
//               <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Role Selection */}
//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-amber-900">
//               Register as
//             </label>
//             <select
//               id="role"
//               name="role"
//               className="mt-1 block w-full rounded-md border border-amber-200 py-2 px-3 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50 text-amber-900"
//               defaultValue="buyer"
//             >
//               <option value="buyer">Buyer</option>
//               <option value="artisan">Artisan</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <RegisterButton />

//           {/* General Error Message */}
//           {state?.message && (
//             <p className="mt-4 text-sm text-red-600">{state.message}</p>
//           )}
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-sm text-amber-800">
//             Already have an account?{' '}
//             <Link href="/login" className="text-amber-600 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RegisterButton() {
//   const { pending } = useFormStatus();
  
//   return (
//     <button
//       type="submit"
//       className="w-full rounded-md bg-amber-600 py-2 px-4 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
//       disabled={pending}
//     >
//       {pending ? 'Registering...' : 'Register'}
//     </button>
//   );
// }








// src/components/auth/register-form.tsx

'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '../../lib/actions';
import {
  // CheckIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
// import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function RegisterForm() {
  const [state, formAction] = useActionState(register, {
    errors: {},
    message: null,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md my-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Register</h1>
        <form action={formAction} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-amber-900">
              Full Name
            </label>
            <div className="relative mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
                aria-describedby="name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
            </div>
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-900">
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
                aria-describedby="email-error"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
            </div>
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-900">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
                aria-describedby="password-error"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
            </div>
            {state?.errors?.password && (
              <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-900">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="block w-full rounded-md border border-amber-200 py-2 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
                aria-describedby="confirmPassword-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-500" />
            </div>
            {state?.errors?.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-amber-900">
              Register as
            </label>
            <select
              id="role"
              name="role"
              className="mt-1 block w-full rounded-md border border-amber-200 py-2 px-3 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-amber-50 text-amber-900"
              defaultValue="buyer"
            >
              <option value="buyer">Buyer</option>
              <option value="artisan">Artisan</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <RegisterButton />

          {/* General Error Message */}
          {state?.message && (
            <p className="mt-4 text-sm text-red-600">{state.message}</p>
          )}
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-amber-800">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-600 hover:underline">
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
      className="w-full rounded-md bg-amber-600 py-2 px-4 text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}