import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

import { NextIntlClientProvider } from 'next-intl';

import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/auth';

import QueryProvider from '@/components/query-provider';
import SessionProviderWrapper from '@/components/session-provider-wrapper';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

const ibmPlexSans = localFont({
  src: [
    {
      path: '../../public/fonts/IBMPlexSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IBMPlexSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IBMPlexSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IBMPlexSans-Bold.woff2',
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
      path: '../../public/fonts/BebasNeue-Regular.woff2',
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
    default: 'BookWise Library',
    template: '%s | BookWise',
  },
  description:
    'BookWise is a book borrowing university library management platform.',
  metadataBase: new URL('https://lms-university.vercel.app/'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BookWise Library',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const session = await auth();
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'fr')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <SessionProviderWrapper session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </QueryProvider>
          <Toaster closeButton richColors position="top-center" />
          <SpeedInsights />
          <Analytics />
          <Script
            src="/nutrient-viewer/nutrient-viewer.js"
            strategy="lazyOnload"
          />
        </body>
      </SessionProviderWrapper>
    </html>
  );
}
