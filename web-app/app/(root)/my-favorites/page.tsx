import {books} from "@/db/schema"
import {db} from "@/db/drizzle"
import BookList from "@/components/book-list"

export default async function Page() {

    const latestBooks = (await db
        .select({
          id: books.id,
          title: books.title,
          author: books.author,
          genre: books.genre,
          rating: books.rating,
          totalCopies: books.totalCopies,
          availableCopies: books.availableCopies,
          description: books.description,
          coverColor: books.coverColor,
          coverUrl: books.coverUrl,
          videoUrl: books.videoUrl,
          summary: books.summary,
        }).from(books))
    
    return <>
    <BookList
    title="Your liked books"
    books={latestBooks as Book[]}
    containerClassName="mt-28"/></>
}