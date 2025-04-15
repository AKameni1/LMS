import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants';

export default function EmptyList() {
  const router = useRouter();

  return (
    <View className="mt-10 flow-root">
      <View id="not-found" className="m-10 items-center justify-center">
        <Image
          source={images.noBooks}
          alt="No books found"
          width={300}
          height={300}
        />
        <Text className="mt-4 text-3xl text-white">No Results Found</Text>
        <Text className="mt-4 text-xl text-white">
          You don't have any books in your favorites.
        </Text>
        <Text className="text-xl text-white">
          Go and find your next great read.
        </Text>
        <View className="m-10 items-center justify-center">
          <TouchableOpacity
            onPress={() => router.navigate('/(root)/(tabs)/library')}
            className="h-10 w-40 items-center justify-center rounded-full bg-light-500 px-4 py-2"
          >
            <Text className="font-bold">Search Library</Text>
          </TouchableOpacity>

          {/* <Image
            source={{
              uri: 'https://ik.imagekit.io/lmsarthur/books/covers/81D1MekgL2L._SY466__IwvQarqFn.jpg',
            }}
            width={300}
            height={200}
            className="rounded-lg"
            resizeMode="center"
          /> */}
        </View>
      </View>
    </View>
  );
}
