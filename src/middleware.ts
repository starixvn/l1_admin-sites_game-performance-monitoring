import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Bypass authentication for health check
  if (request.nextUrl.pathname.endsWith('/health')) {
    return NextResponse.next();
  }

  // Rest of your authentication logic
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - health (for health checks)
     * - login (for authentication)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!health|login|_next/static|_next/image|favicon.ico).*)',
  ],
};
