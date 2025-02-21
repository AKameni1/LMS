import BookListAdded from '@/components/admin/book-list-added';
import LinkButton from '@/components/admin/link-button';
import { ScrollArea } from '@/components/admin/scroll-area';
import Image from 'next/image';

export default async function Page() {
  return (
    <div className="mt-4 flex-1 space-y-5 rounded-xl bg-white p-5">
      <div className="stat-info">
        <p className="truncate whitespace-nowrap text-lg font-semibold text-dark-400">
          Recently Added Books
        </p>
        <LinkButton href="/admin/books" />
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

      <ScrollArea className="max-h-[475px]">
        <BookListAdded />
      </ScrollArea>
    </div>
  );
}
