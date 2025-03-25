import './globals.css';

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@/lib/cache';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { hideAsync } from 'expo-splash-screen';
import { useEffect } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Bebas Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'IBMPlexSans-Bold': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
    'IBMPlexSans-Medium': require('../assets/fonts/IBMPlexSans-Medium.ttf'),
    'IBMPlexSans-Regular': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
    'IBMPlexSans-SemiBold': require('../assets/fonts/IBMPlexSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
