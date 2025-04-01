import CustomButton from '@/components/custom-button';
import { images, onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default function Welcome() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View className="flex-1 bg-pattern">
      <ImageBackground
        source={images.pattern}
        resizeMode="cover"
        className="z-0 w-full flex-1 items-center"
      >
        <TouchableOpacity
          onPress={() => {
            router.replace('/(auth)/sign-up');
          }}
          className="mt-8 w-full items-end justify-end p-5"
        >
          <Text className="font-ibm-plex-sans-bold text-lg text-light-300">
            Skip
          </Text>
        </TouchableOpacity>

        <Swiper
          ref={swiperRef}
          loop={false}
          dot={<View className="mx-1 h-1 w-8 rounded-full bg-gray-100" />}
          activeDot={
            <View className="mx-1 h-1 w-8 rounded-full bg-light-200" />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="items-center justify-center p-5">
              <Image
                source={item.image}
                className="h-72 w-full"
                resizeMode="contain"
              />

              <View className="mt-10 w-full flex-row items-center justify-center">
                <Text className="mx-10 text-center text-3xl font-bold text-light-300">
                  {item.title}
                </Text>
              </View>

              <Text className="mx-10 mt-3 text-center font-ibm-plex-sans-semibold text-lg text-light-200/80">
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>

        <CustomButton
          title={isLastSlide ? 'Get Started' : 'Next'}
          onPress={() =>
            isLastSlide
              ? router.replace('/(auth)/sign-up')
              : swiperRef.current?.scrollBy(1)
          }
          className="mt-7 w-11/12"
        />
      </ImageBackground>
    </View>
  );
}
