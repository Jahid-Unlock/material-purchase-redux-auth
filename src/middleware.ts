// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  // Exclude API routes, static files, and other server-only paths
  if (
    pathname.startsWith('/api/') || // Exclude API routes
    pathname.startsWith('/_next/') || // Exclude Next.js internal files
    pathname.startsWith('/static/') || // Exclude static files
    pathname.match(/\.(.*)$/) // Exclude all file extensions (css, js, png, etc.)
  ) {
    return NextResponse.next();
  }

  // Allow POST requests for form submissions to pass through without redirection
  if (request.method === 'POST') {
    return NextResponse.next();
  }

  const token = request.cookies.get('authToken')?.value;
  const isAuthenticated = Boolean(token);

  // Redirect logic for GET requests
  if (!isAuthenticated && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Export config to enable the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
