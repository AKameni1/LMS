import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported by your application
  locales: ['en', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en',
});
