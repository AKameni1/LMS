import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <Image
            src="/icons/admin/arrow-left.svg"
            className="size-auto"
            alt="return at all books"
            width={18}
            height={18}
          />
          <span className="font-medium text-sm -tracking-wider">Go back</span>
        </Link>
      </Button>

      <div>Book {id}</div>
    </>
  );
}
