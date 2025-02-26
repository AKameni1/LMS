import { NextResponse, type NextRequest } from 'next/server';
export { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if path contains "sign-in" but is not exactly "sign-in"
  if (pathname.includes('sign-in') && pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }

  // Continue with the auth middleware
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
