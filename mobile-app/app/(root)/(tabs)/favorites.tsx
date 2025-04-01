import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Favorites() {
  return (
    <View className="flex-1 bg-[#232839]">
      <SignedIn>
        <View className='h-[25%] justify-center'>
        <Text className="mt-2 max-w-md self-center text-3xl font-semibold text-white xs:text-5xl">
          Discover and Find All
        </Text>
        <Text className="mt-2 max-w-md self-center text-3xl font-semibold text-light-200 xs:text-5xl">
          Your Favorite Books
        </Text>
        <Text className="mt-2 max-w-md self-center text-3xl font-semibold text-white xs:text-5xl">
          In Our Library
        </Text>
        </View>
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
