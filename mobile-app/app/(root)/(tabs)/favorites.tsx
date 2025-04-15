import EmptyList from '@/components/empty-list';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';

export default function Favorites() {
  return (
    <ScrollView className="flex-1 bg-[#232839]">
      <SignedIn>
        {true ? (
          <View className="h-screen">
            <EmptyList />
          </View>
        ) : (
          <View className="h-screen">
            <View className="box-border h-[25%] justify-center">
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
            <View className="h-full items-center">
              <Text className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                laboriosam cupiditate optio voluptas tempora voluptatibus illo
                non voluptatem itaque quisquam minus, ut quos. Quisquam dolore
                provident voluptas explicabo, incidunt vero.
              </Text>
            </View>
          </View>
        )}
      </SignedIn>

      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </ScrollView>
  );
}
