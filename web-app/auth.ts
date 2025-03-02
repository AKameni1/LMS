import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db/drizzle';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { checkIsAdmin } from './lib/data';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then((result) => result[0]);

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/error',
    // signOut: '/sign-out',
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
      const protectedRoutes = [
        '/books',
        '/library',
        '/profile',
        '/my-favorites',
      ];
      // Check if the user is trying to access a protected route
      if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!auth?.user?.id) {
          return false;
        }
        // an admin doesn't access to these routes so check if the user is an admin and redirect to admin page
        if (auth.user.isAdmin) {
          return false;
        }
      }

      if (pathname === '/admin' || pathname.startsWith('/admin/')) {
        if (!auth?.user?.id) {
          return false;
        }
        console.log('Checking if user is admin ---- AUTH.TS');
        return auth.user.isAdmin;
      }

      if (pathname.includes('sign-in') && pathname !== '/sign-in') {
        console.log('Redirecting to sign-in ---- AUTH.TS');
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
      return true;
    },
  },
});
