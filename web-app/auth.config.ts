import { AuthError, type NextAuthConfig, type Session } from 'next-auth';
import { db } from './db/drizzle';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { checkIsAdmin, isBookBorrowed } from './lib/data';
import type { NextRequest } from 'next/server';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.isAdmin = await checkIsAdmin(token.id as string);
      }

      return session;
    },

    async authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const baseUrl = request.nextUrl.origin;
      if (isProtectedRoute(pathname) && !isAuthorizedUser(auth)) {
        return false;
      }

      if (isAdminRoute(pathname) && !isAdminUser(auth)) {
        return false;
      }

      if (isSignInPage(pathname)) {
        return false;
      }

      if (await isBookPreviewPage(pathname, auth)) {
        return false;
      }

      if (isErrorPage(pathname, request, baseUrl)) {
        return false;
      }

      return true;
    },

    async redirect({ url, baseUrl }) {
      const callbackUrl = new URL(url).searchParams.get('callbackUrl');

      if (callbackUrl) {
        return new URL(callbackUrl, baseUrl).toString();
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async signIn({ user }) {
      if (!user) {
        throw new Error('Invalid credentials');
      }
      if (!user.id) {
        throw new Error('Invalid credentials');
      }
      await db
        .select({ status: users.status })
        .from(users)
        .where(eq(users.id, user.id))
        .then((result) => {
          console.log(result);
          if (result[0].status === 'REJECTED') {
            throw new AuthError('AccessDenied');
          }
        });

      return true;
    },
  },
} satisfies NextAuthConfig;

// Helper functions
const protectedRoutes = ['/books', '/library', '/profile', '/my-favorites'];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isAuthorizedUser(auth: Session | null): boolean {
  return !!(auth?.user?.id && !auth.user.isAdmin);
}

function isAdminRoute(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

function isAdminUser(auth: Session | null): boolean {
  return !!(auth?.user?.id && auth.user.isAdmin);
}

function isSignInPage(pathname: string): boolean {
  return pathname.includes('sign-in') && pathname !== '/sign-in';
}

async function isBookPreviewPage(
  pathname: string,
  auth: Session | null,
): Promise<boolean> {
  if (pathname.startsWith('/books/') && pathname.endsWith('/preview')) {
    const bookId = pathname.split('/')[2];
    return !auth?.user?.id || !(await isBookBorrowed(bookId, auth.user.id));
  }
  return false;
}

function isErrorPage(
  pathname: string,
  request: NextRequest,
  baseUrl: string,
): boolean {
  if (pathname === '/error') {
    const referrer = request.headers.get('referer');
    return !referrer?.startsWith(baseUrl);
  }
  return false;
}
