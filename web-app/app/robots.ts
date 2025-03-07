import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://lms-university.vercel.app/sitemap.xml',
    host: 'https://lms-university.vercel.app',
  };
}
