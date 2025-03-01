import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import '@/styles/admin.css';
import Sidebar from '@/components/admin/sidebar';
import Header from '@/components/admin/header';
import { checkIsAdmin } from '@/lib/data';
import { SearchProvider } from '@/context/search-context';
import { after } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('sign-in');
  }

  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    redirect('/');
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
    <SearchProvider>
      <main className="flex min-h-dvh w-full flex-row">
        <Sidebar session={session} />

        <div className="admin-container">
          <Header session={session} />
          {children}
        </div>
      </main>
    </SearchProvider>
  );
}
