import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
  books,
  users,
  requests,
}: Readonly<{
  children: ReactNode;
  books: ReactNode;
  users: ReactNode;
  requests: ReactNode;
}>) {
  return (
    <main className=''>
      {children}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-2">
          {requests}
          {users}
        </div>
        <div className="h-[calc(100vh-13rem)] space-y-6 lg:col-span-2">
          {books}
        </div>
      </div>
    </main>
  );
}
