import React from 'react';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  return <div>Book {id}</div>;
}
