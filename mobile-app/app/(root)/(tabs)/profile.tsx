import { SignOutButton } from '@/components/signout-button';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Profile() {

    const { user } = useUser();
  return (
    <View className="flex-1 bg-[#232839]">
      <SignedIn>
       
          <View className="flex-1">
            <View className="box-border h-[25%] justify-center">
              <Text className="mt-2 max-w-md self-center text-2xl font-semibold text-white xs:text-5xl">
                Username: {user?.emailAddresses[0].emailAddress}
              </Text>
              <Text className="mt-2 max-w-md self-center text-2xl font-semibold text-light-200 xs:text-5xl">
                
              </Text>
              <Text className="mt-2 max-w-md self-center text-2xl font-semibold text-white xs:text-5xl">
                
              </Text>
            </View>
            <SignOutButton/>
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
