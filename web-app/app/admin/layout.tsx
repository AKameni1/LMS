import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import '@/styles/admin.css';
import Sidebar from '@/components/admin/sidebar';
import Header from '@/components/admin/header';
import { checkIsAdmin } from '@/lib/data';
import { SearchProvider } from '@/context/search-context';

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
