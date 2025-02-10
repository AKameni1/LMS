import { auth } from '@/auth';
import BookOverview from '@/components/book-overview';
import BookVideo from '@/components/book-video';
import SimilarBooks from '@/components/similar-books';
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  const session = await auth();

  // Fetch data based on the id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) {
    redirect('/404');
  }

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split('\n').map((line, index) => (
                <p key={`${line.length}-${index}`}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* SIMILAR BOOKS COMPONENT */}
        <SimilarBooks currentBookId={id} genre={bookDetails.genre} />
      </div>
    </>
  );
}
