import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import InactivityReminderEmail from '@/emails/inactivity-reminder-email';
import WelcomeBackEmail from '@/emails/welcome-back-email';
import WelcomeEmail from '@/emails/welcome-email';
import { sendEmail } from '@/lib/workflow';
import { render } from '@react-email/render';
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
const THREE_DAYS_IN_SECONDS = THREE_DAY_IN_MS / 1000;
const THIRTY_DAYS_IN_SECONDS = THIRTY_DAY_IN_MS / 1000;

const getUserState = async (email: string): Promise<UserState> => {
  // Implement user state logic here
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((res) => res[0]);

  if (!user?.lastActivityDate) {
    return 'non-active';
  }

  const lastActivityDate = new Date(user.lastActivityDate);
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
      const htmlMessage = await render(
        React.createElement(WelcomeEmail, { studentName: fullName }),
        { pretty: true, plainText: true },
      );
      const message = String(htmlMessage);
      const response = await sendEmail({
        email,
        subject: 'Welcome to BookWise Library',
        message,
      });
      console.log('Welcome email sent successfully', response.data);
      return response;
    } catch (error) {
      console.error('Error sending welcome email:', error);
    }
  });

  await context.sleep('wait-for-3-days', THREE_DAYS_IN_SECONDS);

  const inactivityEmail = String(
    await render(
      React.createElement(InactivityReminderEmail, { studentName: fullName }),
      { pretty: true, plainText: true },
    ),
  );

  const welcomeBackEmail = String(
    await render(
      React.createElement(WelcomeBackEmail, { studentName: fullName }),
      { pretty: true, plainText: true },
    ),
  );

  let attempts = 0;
  while (attempts < 12) {
    // 12 months
    const state = await context.run('check-user-state', async () => {
      return await getUserState(email);
    });

    if (state === 'non-active') {
      await context.run('send-email-non-active', async () => {
        try {
          const response = await sendEmail({
            email,
            subject: 'Are you still there?',
            message: inactivityEmail,
          });
          console.log(
            'Inactivity reminder email sent successfully',
            response.data,
          );
          return response;
        } catch (error) {
          console.error('Error sending non-active email:', error);
        }
      });
    } else if (state === 'active') {
      await context.run('send-email-active', async () => {
        try {
          await sendEmail({
            email,
            subject: 'Welcome back!',
            message: welcomeBackEmail,
          });
        } catch (error) {
          console.error('Error sending active email:', error);
        }
      });

      await context.sleep('recheck-in-3-days', THREE_DAYS_IN_SECONDS);
      continue;
    }

    attempts++;
    await context.sleep('wait-for-1-month', THIRTY_DAYS_IN_SECONDS);
  }

  // After 12 months, deactivate the user
  await context.run('final-inactive-email', async () => {
    await sendEmail({
      email,
      subject: 'We might say goodbye soon... 😢',
      message: `Hey ${fullName}, we we haven't seen you in a while! 
      If you still want to use BookWise, log in soon, or we might deactivate your account.`,
    });
  });

  // Deactivate user
  await context.run('deactivate-user', async () => {
    // Verify user exists before deactivating
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .then((res) => res[0]);

    if (!user) {
      console.warn(`User ${email} not found in database before deactivation.`);
      return;
    }

    // Deactivate user
    await db
      .update(users)
      .set({ status: 'REJECTED' })
      .where(eq(users.email, email));

    console.log(`User ${email} has been deactivated.`);
  });
});
