import { CountdownTimer } from '@/components/counterdown-timer';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  // This page is shown when a user is trying to sign in or sign up too fast.
  // Read 'locked_until' from a cookie to show a countdown timer until the user can try again.
  const lockedUntil = (await cookies()).get('locked_until')?.value;
  const now = Date.now();

  if (!lockedUntil || now > parseInt(lockedUntil)) {
    return redirect('/sign-in');
  }

  return (
    <main className="root-container flex min-h-dvh flex-col items-center justify-center text-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Whoa, slow down! You&apos;re doing that too fast. Please wait a moment
        before trying again.
      </h1>
      <p className="mt-3 max-w-xl text-light-100">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again
        shortly.
      </p>

      <CountdownTimer lockedUntil={Number.parseInt(lockedUntil)} />
    </main>
  );
}
