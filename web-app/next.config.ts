import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'nutrient-sdk/viewer': '@nutrient-sdk/viewer',
      });
    }

    return config;
  },

  experimental: {
    turbo: {
      resolveAlias: {
        '@nutrient-sdk/viewer': '@nutrient-sdk/viewer',
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'books.google.com',
      },
    ],
  },
};

export default nextConfig;
