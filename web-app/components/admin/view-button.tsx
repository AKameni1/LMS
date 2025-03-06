'use client';

import Image from 'next/image';
import { Button } from '../ui/button';

export default function ViewButton() {
  const handleOnClick = () => {
    console.log('View Button Clicked');
  };

  return (
    <Button
      className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-1 text-dark-400 drop-shadow-sm transition-colors duration-300 hover:bg-light-300"
      onClick={handleOnClick}
    >
      <Image
        src="/icons/admin/eye.svg"
        width={16}
        height={16}
        alt="View Request"
      />
    </Button>
  );
}
