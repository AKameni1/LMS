import { auth } from '@/auth';
import BookOverview from '@/components/book-overview';
import BookVideo from '@/components/book-video';
import SimilarBooks from '@/components/similar-books';
import { fetchBookById } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  const session = await auth();

  const userId = session?.user?.id

  // check if user is logged in
  if (!session || !userId) {
    redirect('/sign-in');
  }

  // Fetch data based on the id
  const bookDetails = await fetchBookById(id);

  if (!bookDetails) {
    redirect('/404');
  }

  return (
    <>
      <BookOverview {...bookDetails} userId={userId} />

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
