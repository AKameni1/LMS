import { Image, Text, View } from 'react-native';
import { Button } from 'react-native';
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
        <Text className="text-white text-xl ">
          Go and find your next great read.
        </Text>
        <View className="m-10 items-center justify-center">
          <Button
            onPress={() => router.navigate('/(root)/(tabs)/library')}
            title="Search Library"
            color="#757575"
          />
        </View>
      </View>
    </View>
  );
}
