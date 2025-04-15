import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  const { user } = useUser();
  return (
    <View className="flex-1 items-center justify-center bg-[#232839]">
      <SignedIn>
        <Text className=" mt-8 max-w-md self-center text-3xl font-semibold text-light-300">
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <Text className="mt-8 max-w-md self-center text-xl font-semibold text-light-200 xs:text-5xl">
            Welcome to your next great read.
        </Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
