import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { WELCOME_EMAIL } from '@/emails/emails';
import { sendEmail } from '@/lib/workflow';
import { serve } from '@upstash/workflow/nextjs';
import { eq } from 'drizzle-orm';
import React from 'react';

type UserState = 'non-active' | 'active';

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const THREE_DAY_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAY_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  // Implement user state logic here
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((res) => res[0]);

  if (!user) {
    return 'non-active';
  }

  const lastActivityDate = new Date(user.lastActivityDate!);
  const now = new Date();

  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAY_IN_MS && timeDifference <= THIRTY_DAY_IN_MS) {
    return 'non-active';
  }

  return 'active';
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome email
  await context.run('new-signup', async () => {
    try {
      const response = await sendEmail({
        email,
        subject: 'Welcome to BookWise Library',
        message: WELCOME_EMAIL.replace('[Student Name]', fullName),
      });
      console.log('Welcome email sent successfully', response.data);
      return response;
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  });

  await context.sleep('wait-for-3-days', 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email);
    });

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        await sendEmail({
          email,
          subject: 'Are you still there?',
          message: `Hey ${fullName}, we miss you!`,
        });
      });
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        await sendEmail({
          email,
          subject: 'Welcome back!',
          message: `Welcome back ${fullName}!`,
        });
      });
    }

    await context.sleep('wait-for-1-month', 60 * 60 * 24 * 30);
  }
});
