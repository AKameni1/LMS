'use server';

import { signIn, signOut } from '@/auth';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { cookies, headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import { workflowClient } from '../workflow';
import config from '../config';
import redis from '@/db/redis';

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, 'email' | 'password'>,
) => {
  const { email, password } = credentials;

  const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';

  if (await checkLimitation(ip, email)) {
    return redirect('/too-fast');
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      redirectTo: '/admin/books',
    });

    if (result?.error) {
      return {
        success: false,
        message: 'Error signing in',
      };
    }

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: `Error signing in. ${error}`,
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = params;

  const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';

  if (await checkLimitation(ip, email)) {
    return redirect('/too-fast');
  }

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((result) => result[0]);

  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityCard,
      universityId,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await redis.del('dashboard_stats');

    await signInWithCredentials({ email, password });

    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: `Error creating user. ${error}`,
    };
  }
};

export const signOutComplete = async () => {
  await signOut({
    redirectTo: '/sign-in',
  });
};

const checkLimitation = async (ip: string, email: string): Promise<boolean> => {
  const key = `${ip}-${email}`;

  try {
    // Check if the user is locked out in redis
    const lockedUntil = (await redis.get(`locked_until:${email}`)) as string;
    const now = Date.now();

    if (lockedUntil && parseInt(JSON.stringify(lockedUntil)) > now) {
      (await cookies()).set('locked_until', lockedUntil, {
        maxAge: 300,
        httpOnly: true,
      });
      return true;
    }

    // Check if the user is ratelimited
    const { success } = await ratelimit.limit(key);
    if (!success) {
      const lockDuration = 5 * 60 * 1000; // 5 minutes
      const expiry = now + lockDuration;

      await redis.set(`locked_until:${email}`, expiry, { ex: 300 });
      (await cookies()).set('locked_until', String(expiry), {
        maxAge: 300,
        httpOnly: true,
      });

      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    throw new Error('Error checking ratelimit');
  }
};
