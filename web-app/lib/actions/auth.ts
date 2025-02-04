'use server';

import { signIn } from '@/auth';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';
import { workflowClient } from '../workflow';
import config from '../config';

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, 'email' | 'password'>,
) => {
  const { email, password } = credentials;

  const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect('/too-fast');
  }

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
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
  const { success } = await ratelimit.limit(ip);

  if (!success) {
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

    await signInWithCredentials({ email, password });

    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: `Error creating user. ${error}`,
    };
  }
};
