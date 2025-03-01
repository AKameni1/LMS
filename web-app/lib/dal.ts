import 'server-only';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { checkIsAdmin } from './data';

export const verifySession = cache(async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  const isAdmin = await checkIsAdmin(session.user.id);

  return { isAuth: true, userId: session.user.id, isAdmin };
});
