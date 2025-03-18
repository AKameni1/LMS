'use client';

import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from '@/i18n/navigation';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button className="back-btn" onClick={() => router.back()}>
      <Image
        src="/icons/admin/arrow-left.svg"
        className="size-auto"
        alt="return to previous page"
        width={18}
        height={18}
      />
      <span className="text-sm font-medium -tracking-wider">Go back</span>
    </Button>
  );
}
