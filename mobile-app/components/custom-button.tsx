import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types/types';
import { Text, TouchableOpacity } from 'react-native';

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-500';
    case 'danger':
      return 'bg-red-500';
    case 'success':
      return 'bg-green-500';
    case 'outline':
      return 'bg-transparent border-neutral-300 border-[0.5px]';
    default:
      return 'bg-light-200';
  }
};

const getTextVariantStyle = (textVariant: ButtonProps['textVariant']) => {
  switch (textVariant) {
    case 'primary':
      return 'text-light-300';
    case 'secondary':
      return 'text-gray-100';
    case 'danger':
      return 'text-red-100';
    case 'success':
      return 'text-green-100';
    default:
      return 'text-dark-200';
  }
};

export default function CustomButton({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        'mb-5 w-full items-center justify-center rounded-full p-4 shadow-md shadow-neutral-500/70',
        getBgVariantStyle(bgVariant),
        className,
      )}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={cn(
          'font-ibm-plex-sans-bold text-lg',
          getTextVariantStyle(textVariant),
        )}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
}
