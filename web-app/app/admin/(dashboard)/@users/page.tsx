import UserList from '@/components/admin/user-list';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Page() {
  return (
    <div className="mt-4 flex-1 space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="whitespace-nowrap text-lg font-semibold text-dark-400">
          Account Requests
        </p>
        <Button className="bg-light-300 text-primary-admin transition-all duration-300 hover:bg-light-300/20">
          View all
        </Button>
      </div>
      {/* Users List */}
      <div className="relative">
        <div className="h-[155px] overflow-auto hide-scrollbar">
          <UserList />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
