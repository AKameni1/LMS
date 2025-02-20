import BookListAdded from '@/components/admin/book-list-added';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function Page() {
  return (
    <div className="mt-4 flex-1 space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Recently Added Books
        </p>
        <Button className="bg-light-300 text-primary-admin transition-all duration-300 hover:bg-light-300/20">
          View all
        </Button>
      </div>

      {/* Add Button here */}
      <div className="book-stripe items-center">
        <button className="group flex items-center gap-2 font-medium text-dark-400">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-dark-400 transition-colors duration-300 group-hover:bg-dark-200/10">
            <Image
              src="/icons/admin/plus.svg"
              width={16}
              height={16}
              alt="View Request"
            />
          </div>
          <p className="font-medium text-dark-400 transition-colors duration-300 group-hover:text-dark-600">
            Add New Book
          </p>
        </button>
      </div>

      <div className="relative">
        <div className="hide-scrollbar overflow-auto">
          <BookListAdded />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
}
