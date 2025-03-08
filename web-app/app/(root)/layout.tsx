import { auth } from '@/auth';
import Header from '@/components/header';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import type { ReactNode } from 'react';

export default async function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session || !userId) {
    redirect('/sign-in');
  }

  // check if the current user is an admin

  const isAdmin = session?.user.isAdmin;

  if (isAdmin) {
    redirect('/admin');
  }

  after(async () => {
    if (!session?.user?.id) {
      return;
    }

    // Get the user's last activity date and see if the last activity was today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .then((res) => res[0]);
    if (user?.lastActivityDate === new Date().toISOString().slice(0, 10)) {
      return;
    }

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session.user.id));
  });

  return (
    <main className="root-container">
      <div className="max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}
