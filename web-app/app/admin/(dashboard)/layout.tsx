import { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <main>{children}</main>;
}
