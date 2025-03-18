import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, userAgent, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request: NextRequest) {
  // Your custom middleware logic goes here
  const { device } = userAgent(request);
  console.log('Device type:', device);
  if (device.type === 'mobile') {
    const url = request.nextUrl.clone();
    url.pathname = '/mobile';
    return NextResponse.redirect(url);
  }
  return intlMiddleware(request);
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|.*\\.png$).*)',
    '/',
    '/(en|fr)/:path*',
  ],
};
