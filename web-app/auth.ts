import NextAuth, { type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db/drizzle';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
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
});
