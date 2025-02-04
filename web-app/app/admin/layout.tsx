import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import '@/styles/admin.css';
import Sidebar from '@/components/admin/sidebar';
import Header from '@/components/admin/header';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('sign-in');
  }

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session?.user?.id))
    .then((res) => res[0]?.isAdmin === 'ADMIN');

  if (!isAdmin) {
    redirect('/');
  }
  return (
    <main className="flex min-h-dvh w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
}
