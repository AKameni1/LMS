import { signOut } from '@/auth'
import BookList from '@/components/book-list'
import { Button } from '@/components/ui/button'
import { db } from '@/db/drizzle'
import { books } from '@/db/schema'
import { desc } from 'drizzle-orm'
import React from 'react'

export default async function Page() {
  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[]

  return (
    <>
      <form action={async () => {
        'use server'

        await signOut()
      }} className='mb-10'>
        <Button>Logout</Button>
      </form>

      <BookList title='Borrowed Books' books={latestBooks} />
    </>

  )
}
