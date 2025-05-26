
// src/middleware.ts
import { auth } from './auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = ['/login', '/register'].includes(nextUrl.pathname);
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard');

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};







// // src/middleware.ts
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'
//   ]
// };