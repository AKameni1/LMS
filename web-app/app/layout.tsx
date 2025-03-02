import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import type { ReactNode } from 'react';
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
  display: 'swap',
  preload: true,
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
  display: 'swap',
  preload: true,
});

/** @type {import("next").Metadata} */
export const metadata: Metadata = {
  title: {
    default: 'BookWise',
    template: '%s | BookWise',
  },
  description:
    'BookWise is a book borrowing university library management platform.',
  metadataBase: new URL('https://lms-university.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BookWise',
    url: 'https://lms-university.vercel.app/',
  },
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
          <Analytics />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
