import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public paths that don't require authentication
const publicPaths = ['/', '/unauthorized'];

export function middleware(request: NextRequest) {
  // Get auth cookie
  const authCookie = request.cookies.get('auth');
  const isAuthenticated = authCookie?.value === 'true';
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Redirect to login if accessing protected route without auth
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  // Redirect to daily summary if accessing login page while authenticated
  if (isAuthenticated && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/daily', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
