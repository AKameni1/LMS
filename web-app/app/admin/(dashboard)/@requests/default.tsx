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
          src="/images/borrow-requests.svg"
          width={200}
          height={200}
          alt="Borrow Requests"
        />

        <p className="text-base font-semibold text-dark-400">
          No Pending Book Requests
        </p>
        <p className="text-sm text-dark-700">
          There are no borrow requests awaiting your review at this time
        </p>
      </div>
    </div>
  );
}
