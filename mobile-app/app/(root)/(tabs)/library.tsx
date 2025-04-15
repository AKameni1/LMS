import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import dummies from '@/dummy-books.json';
import { bookCover } from '@/constants';

export default function Library() {
  return (
    <View className="flex-1 bg-[#232839]">
      <SignedIn>
        <View className="flex-1">
          <View className="box-border h-[25%] justify-center">
            <Text className="mt-2 max-w-md self-center text-3xl font-semibold text-white xs:text-5xl">
              Discover your next great read:
            </Text>
            <Text className="mt-4 max-w-md self-center text-3xl font-semibold text-light-200 xs:text-5xl">
              Explore and Search for
            </Text>
            <Text className="mt-2 max-w-md self-center text-3xl font-semibold text-white xs:text-5xl">
              Any Book In Our Library
            </Text>
          </View>
          <ScrollView className="h-full flex-1 self-center p-5 mb-24">
            <View className='mb-8'>
              <Image source={bookCover.book1} className='mb-2'/>
              <Text className="self-center text-xl text-white">
                {dummies[0].title}
              </Text>
              <Text className="text-md self-center italic text-light-200">
                {dummies[0].author}
              </Text>
            </View>
            <View className='mb-8'>
              <Image source={bookCover.book3} className='mb-2'/>
              <Text className="self-center text-xl text-white">
                {dummies[1].title}
              </Text>
              <Text className="text-md self-center italic text-light-200">
                {dummies[1].author}
              </Text>
            </View>
            <View className='mb-8'>
              <Image source={bookCover.book4} className='mb-2'/>
              <Text className="self-center text-xl text-white">
                {dummies[2].title}
              </Text>
              <Text className="text-md self-center italic text-light-200">
                {dummies[2].author}
              </Text>
            </View>
            <View className='mb-8'>
              <Image source={bookCover.book5} className='mb-2'/>
              <Text className="self-center text-xl text-white">
                {dummies[3].title}
              </Text>
              <Text className="text-md self-center italic text-light-200">
                {dummies[3].author}
              </Text>
            </View>
            <View className='mb-8'>
              <Image source={bookCover.book6} className='mb-2'/>
              <Text className="self-center text-xl text-white">
                {dummies[4].title}
              </Text>
              <Text className="text-md self-center italic text-light-200">
                {dummies[4].author}
              </Text>
            </View>
            <View className='mb-8'>
              <Image source={bookCover.book7} className='mb-2'/>
              <Text className="self-center text-xl text-white">
                {dummies[5].title}
              </Text>
              <Text className="text-md self-center italic text-light-200">
                {dummies[5].author}
              </Text>
            </View>
          </ScrollView>
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
