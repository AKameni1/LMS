import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function Default() {
  return (
    <div className="stat">
      <div className="stat-info">
        <p className="whitespace-nowrap text-lg font-semibold text-dark-400">
          Account Requests
        </p>
        <Button className="bg-light-300 text-primary-admin transition-all duration-300 hover:bg-light-300/20">
          View all
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src="/images/account-requests.svg"
          width={200}
          height={200}
          alt="Account Requests"
        />

        <p className="text-base font-semibold text-dark-400">
          No Pending Account Requests
        </p>
        <p className="text-sm text-dark-700">
          There are no account requests awaiting your review at this time
        </p>
      </div>
    </div>
  );
}
