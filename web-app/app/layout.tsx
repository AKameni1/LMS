import { SpeedInsights } from '@vercel/speed-insights/next';

import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';

import { SessionProvider } from 'next-auth/react';

export const experimental_ppr = true;

const ibmPlexSans = localFont({
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--bebas-neue',
});

export const metadata: Metadata = {
  title: 'BookWise',
  description:
    'BookWise is a book borrowing university library management platform.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
          <SpeedInsights />
        </body>
      </SessionProvider>
    </html>
  );
}
