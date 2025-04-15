const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      authenticationEndpoint:
        process.env.NEXT_PUBLIC_IMAGEKIT_AUTHENTICATION_ENDPOINT!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    resendToken: process.env.RESEND_TOKEN!,
    publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!,
  },
};

export default config;
