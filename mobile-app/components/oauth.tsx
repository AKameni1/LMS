import { View, Text, Image } from 'react-native';
import CustomButton from './custom-button';
import { icons } from '@/constants';

export default function OAuth() {
  const handleGoogleSignIn = () => {};

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-center gap-x-3">
        <View className="h-0.5 flex-1 bg-gray-100/80" />
        <Text className="text-lg text-light-200">Or</Text>
        <View className="h-0.5 flex-1 bg-gray-100/80" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full flex-row shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="mx-2 size-5"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}
