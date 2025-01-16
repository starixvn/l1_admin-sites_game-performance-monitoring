import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Bypass for health check
  if (request.nextUrl.pathname.endsWith('/health')) {
    return NextResponse.next();
  }

  const auth = request.cookies.get('auth');
  const isRootPath = request.nextUrl.pathname === '/';

  // Case 1: No auth and not at root - redirect to root
  if (!auth && !isRootPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Case 2: Has auth and at root - redirect to daily
  if (auth && isRootPath) {
    return NextResponse.redirect(new URL('/daily', request.url));
  }

  // All other cases - proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!health|_next/static|_next/image|favicon.ico).*)'],
};
