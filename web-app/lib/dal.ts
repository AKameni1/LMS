import 'server-only';

import { auth } from '@/auth';
import { cache } from 'react';
import { redirect } from '@/i18n/navigation';

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect({
      href: '/sign-in',
      locale: 'en',
    });
  }

  return {
    isAuth: true,
    userId: session.user.id,
    isAdmin: session.user.isAdmin,
  };
});
