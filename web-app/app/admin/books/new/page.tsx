import BookForm from '@/components/admin/forms/book-form';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <Image
            src="/icons/admin/arrow-left.svg"
            className="size-auto"
            alt="return at all books"
            width={16}
            height={16}
          />
          <span className="font-medium text-[#3A354E]">Go back</span>
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
}
