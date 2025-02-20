import RequestList from '@/components/admin/request-list';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Page() {
  return (
    <div className="mt-4 flex-1 space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="whitespace-nowrap text-lg font-semibold text-dark-400">
          Borrow Requests
        </p>
        <Button className="bg-light-300 text-primary-admin transition-all duration-300 hover:bg-light-300/20">
          View all
        </Button>
      </div>
      <div className="relative">
        <div className="h-[300px] hide-scrollbar overflow-auto">
          <RequestList />
        </div>
        <div className="pointer-events-none absolute z-50 bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
