import CustomButton from '@/components/custom-button';
import InputField from '@/components/input-field';
import OAuth from '@/components/oauth';
import { icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: 'success',
        });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setVerification({
          ...verification,
          state: 'failed',
          error: 'Verification failed',
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        state: 'failed',
        error: String(err.errors[0].longMessage),
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#12141d]">
      <SafeAreaView>
        <View className="relative h-64 w-full">
          <Image source={images.authIllustration} className="z-0 h-64 w-full" />
          <Text className="font-ibm-plex-sans-semibold absolute bottom-5 left-5 text-2xl text-black">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-in"
            className="mt-10 text-center text-lg text-light-400"
          >
            <Text>Already have an account? </Text>
            <Text className="text-blue-500">Log In</Text>
          </Link>

          <ReactNativeModal
            isVisible={verification.state === 'pending'}
            onModalHide={() => {
              if (verification.state === 'success') {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className="min-h-72 rounded-2xl bg-white p-7">
              <Text className="font-ibm-plex-sans-bold text-2xl">
                Verification
              </Text>

              <Text className="mb-5 font-ibm-plex-sans">
                We&apos;ve sent a verification code to {form.email}. Please
                enter the code below.
              </Text>

              <InputField
                label="Verification Code"
                labelStyle="text-black-200"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(value) =>
                  setVerification({ ...verification, code: value })
                }
              />

              {!!verification.error && (
                <Text className="mt-1 text-sm text-red-600">
                  {verification.error}
                </Text>
              )}

              <CustomButton
                title="Verify Email"
                onPress={onVerifyPress}
                className="mt-5"
                bgVariant="success"
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="min-h-72 rounded-2xl bg-white p-7">
              <Image source={images.check} className="mx-auto my-5 size-28" />

              <Text className="font-ibm-plex-sans-bold text-center text-3xl">
                Verified
              </Text>

              <Text className="mt-2 text-center font-ibm-plex-sans text-base text-gray-400">
                You have successfully verified your account.
              </Text>

              <CustomButton
                title="Browse Home"
                onPress={() => {
                  setShowSuccessModal(false);
                  router.replace('/(root)/(tabs)/home');
                }}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
