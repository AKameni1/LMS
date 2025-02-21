import LinkButton from '@/components/admin/link-button';
import RequestList from '@/components/admin/request-list';
import { ScrollArea } from '@/components/admin/scroll-area';
import React from 'react';

export default async function Page() {
  return (
    <div className="mt-4 flex-1 space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Borrow Requests
        </p>
        <LinkButton href="/admin/book-requests" />
      </div>

      <ScrollArea className="max-h-[300px]">
        <RequestList />
      </ScrollArea>
    </div>
  );
}
