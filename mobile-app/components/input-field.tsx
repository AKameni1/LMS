import { cn } from '@/lib/utils';
import type { InputFieldProps } from '@/types/types';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: Readonly<InputFieldProps>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={cn(
              'font-jakarta-semibold mb-3 text-lg text-light-100',
              labelStyle,
            )}
          >
            {label}
          </Text>
          <View
            className={cn(
              'relative flex-row items-center justify-start rounded-full border border-dark-300 bg-dark-300 text-base text-white focus:border-dark-100',
              containerStyle,
            )}
          >
            {icon && (
              <Image
                source={icon}
                className={cn('ml-4 size-6', iconStyle)}
                tintColor="#D6E0FF"
              />
            )}
            <TextInput
              className={cn(
                'font-ibm-plex-sans-semibold flex-1 rounded-full p-4 text-left text-sm text-light-100',
                inputStyle,
              )}
              placeholderTextColor="#D6E0FFAF"
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
