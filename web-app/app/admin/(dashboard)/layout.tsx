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
    <main className="max-h-full">
      {children}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:grid-rows-[auto_1fr]">
        <div className="space-y-6 lg:col-span-2 lg:row-span-1">{requests}</div>
        <div className="space-y-6 lg:col-span-2 lg:row-span-2">
          {books}
        </div>
        <div className="lg:col-span-2 lg:row-span-1">{users}</div>
      </div>
    </main>
  );
}
