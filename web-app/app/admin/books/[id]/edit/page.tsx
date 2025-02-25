import BookForm from '@/components/admin/forms/book-form';
import GoBackButton from '@/components/admin/go-back-button';
import { fetchBookById } from '@/lib/data';
import React from 'react';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;

  // In a real application, you would fetch the book data here
  const book = await fetchBookById(id);

  return (
    <>
      <GoBackButton />

      <section className="w-full max-w-2xl">
        <BookForm type="update" {...book} />
      </section>
    </>
  );
}
