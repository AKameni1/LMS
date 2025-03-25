import './globals.css'
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(root)" options={{ headerShown: false }} />
    <Stack.Screen name="+not-found" />
  </Stack>;
}
