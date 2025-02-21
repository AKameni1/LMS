import { SpeedInsights } from '@vercel/speed-insights/next';

import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/auth';

import QueryProvider from '@/components/query-provider';
import SessionProviderWrapper from '@/components/session-provider-wrapper';

export const experimental_ppr = true;

const ibmPlexSans = localFont({
  src: [
    {
      path: '../public/fonts/IBMPlexSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/IBMPlexSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const bebasNeue = localFont({
  src: [
    {
      path: '../public/fonts/BebasNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
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
    <html lang="en" suppressHydrationWarning>
      <SessionProviderWrapper session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster closeButton richColors position="top-center" />
          <SpeedInsights />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
