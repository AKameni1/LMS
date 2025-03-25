import CustomButton from '@/components/custom-button';
import InputField from '@/components/input-field';
import OAuth from '@/components/oauth';
import { icons, images } from '@/constants';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/home');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#12141d]">
      <SafeAreaView>
        <View className="relative h-64 w-full">
          <Image source={images.authIllustration} className="z-0 h-64 w-full" />
          <Text className="font-ibm-plex-sans-semibold absolute bottom-5 left-5 text-2xl text-black">
            Welcome To BookWise 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="mt-10 text-center text-lg text-light-400"
          >
            <Text>Don&apos;t have an account? </Text>
            <Text className="text-blue-500">Sign Up</Text>
          </Link>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
