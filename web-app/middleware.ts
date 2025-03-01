import { auth } from '@/auth';
import { verifySession } from './lib/dal';
import { NextResponse } from 'next/server';

export default auth(async () => {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    return NextResponse.redirect('/sign-in');
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
