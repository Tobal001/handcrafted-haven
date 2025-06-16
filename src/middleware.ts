import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './lib/definitions';

interface ProtectedRouteConfig {
  path: string;
  allowedRoles: UserRole[];
  redirectPath?: string;
}

const roleBasedProtectedRoutes: ProtectedRouteConfig[] = [
  { path: '/dashboard/categories', allowedRoles: ['artisan', 'admin'], redirectPath: '/dashboard?message=Access%20Denied%20to%20Categories' },
  { path: '/products/categories', allowedRoles: ['artisan', 'admin'], redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Categories' },
  { path: '/admin', allowedRoles: ['admin'], redirectPath: '/dashboard?message=Administrator%20Access%20Required' },
  { path: '/products/manage', allowedRoles: ['artisan', 'admin'], redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Management' },
  { path: '/artisan', allowedRoles: ['artisan'], redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Management' },
  { path: '/products/create', allowedRoles: ['artisan'], redirectPath: '/dashboard?message=Access%20Denied%20to%20Product%20Management' },
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const matchedRoute = roleBasedProtectedRoutes.find((route) =>
    pathname.startsWith(route.path)
  );

  if (matchedRoute) {
    const userRole = token?.role as UserRole | undefined;

    if (!userRole || !matchedRoute.allowedRoles.includes(userRole)) {
      return NextResponse.redirect(
        new URL(matchedRoute.redirectPath || '/dashboard?message=Access%20Denied', req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
