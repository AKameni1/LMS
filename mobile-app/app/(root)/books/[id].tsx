import books from '@/books.json';
import { icons } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

type BookInfoProps = {
  label: string;
  value?: string | number | null;
};

const MovieInfo = ({ label, value }: Readonly<BookInfoProps>) => (
  <View className="mt-5 flex-col items-start justify-center">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="mt-2 text-sm font-bold text-light-100">
      {value ?? 'N/A'}
    </Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const book = books.find((m) => m.id === id);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `${book?.cover_url}`,
            }}
            className="h-[500px] w-full"
            resizeMode="stretch"
          />
        </View>
        <View className="mt-5 flex-col items-start justify-center px-5">
          <Text className="text-xl font-bold text-white">{book?.title}</Text>
          <View className="mt-2 flex-row items-center gap-x-1">
            <Text className="text-sm text-light-200">
              {book?.release_date.split('-')[0]}
            </Text>
            <Text className="text-sm text-light-200">|</Text>
            <Text className="text-sm text-light-200">{book?.runtime}m</Text>
          </View>
          <View className="mt-2 flex-row items-center gap-x-1 rounded-md bg-dark-100 px-2 py-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm font-bold text-white">
              {Math.round(book?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200">({book?.vote_count} votes)</Text>
          </View>
          <MovieInfo label="Overview" value={book?.overview} />
          <MovieInfo
            label="Genres"
            value={book?.genres?.map((g) => g.name).join(' - ') ?? 'N/A'}
          />
          <View className="flex w-1/2 flex-row justify-between">
            <MovieInfo
              label="Budget"
              value={`$${(book?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${((book?.revenue ?? 0) / 1_000_000).toFixed(3)}`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              book?.production_companies.map((c) => c.name).join(', ') ?? 'N/A'
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="bg-accent absolute bottom-5 left-0 right-0 z-50 mx-5 flex flex-row items-center justify-center rounded-lg py-3.5"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="mr-1 mt-0.5 size-5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-base font-semibold text-white">Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
