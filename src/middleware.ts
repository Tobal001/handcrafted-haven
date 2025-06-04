
// src/middleware.ts

import { auth } from './auth'; // Import your auth function
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './lib/definitions'; // Import UserRole type

// Define an interface for paths and the roles allowed to access them
interface ProtectedRouteConfig {
  path: string;
  allowedRoles: UserRole[];
  redirectPath?: string; // Optional: specify a custom redirect if access is denied
}

// --- START: ROLE-BASED PROTECTED ROUTES CONFIGURATION ---
// These routes require a specific role AFTER the user has already been authenticated
const roleBasedProtectedRoutes: ProtectedRouteConfig[] = [
  {
    path: '/dashboard/categories',
    allowedRoles: ['artisan', 'admin'],
    redirectPath: '/dashboard?message=Access%20Denied%20to%20Categories',
  },
  {
    path: '/products/categories', // <--- This will now only enforce role for logged-in users
    allowedRoles: ['artisan', 'admin'],
    redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Categories',
  },
  {
    path: '/admin', // Example: Protect all admin routes
    allowedRoles: ['admin'],
    redirectPath: '/dashboard?message=Administrator%20Access%20Required',
  },
  {
    path: '/products/manage', // Example: Artisan/Admin can manage products
    allowedRoles: ['artisan', 'admin'],
    redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Management',
  },
  {
    path: '/artisan', // Example: Artisan/Admin can manage products
    allowedRoles: ['artisan'],
    redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Management',
  },
  // Add other role-specific protected routes as needed
];
// --- END: ROLE-BASED PROTECTED ROUTES CONFIGURATION ---


export default auth((req: NextRequest) => { // Type req as NextRequest
  const { nextUrl } = req;
  const userRole: UserRole | undefined = req.auth?.user?.role; // Safely get user role from auth object

  // This middleware is only executed if the `authorized` callback in `auth.config.ts` returned `true`.
  // Therefore, `req.auth` should always be present here for paths requiring general authentication.

  // 1. Handle role-based access for specific routes (authorization)
  // Find if the current pathname matches any specifically role-protected routes
  const matchedRoleProtectedRoute = roleBasedProtectedRoutes.find(route =>
    nextUrl.pathname.startsWith(route.path)
  );

  if (matchedRoleProtectedRoute) {
    // If a user is logged in (which they must be to reach here) but their role is not allowed
    // for this specific route, redirect them.
    if (!userRole || !matchedRoleProtectedRoute.allowedRoles.includes(userRole)) {
      const redirectUrl = new URL(matchedRoleProtectedRoute.redirectPath || '/dashboard?message=Access%20Denied%20by%20Role', nextUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If no role-based restriction applies or if user is authorized, allow the request to proceed
  return NextResponse.next();
});

// Configure the matcher to apply middleware to relevant paths
export const config = {
  // This matcher should be broad, ensuring the middleware runs on all relevant pages.
  // The primary authentication check is in auth.config.ts.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)'],
};