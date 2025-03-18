import { fetchBookById } from '@/lib/data';
import BookVideo from '../book-video';
import BookCover from '../book-cover';
import chroma from 'chroma-js';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';

export default async function BookView({ id }: Readonly<{ id: string }>) {
  const book = await fetchBookById(id);
  if (!book) {
    notFound();
  }

  const {
    coverColor,
    coverUrl,
    title,
    genre,
    videoUrl,
    summary,
    author,
    createdAt,
  } = book;

  const backgroundColor = chroma(coverColor).brighten(0.6).css();
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:gap-9">
        <div
          className="flex w-full max-w-64 items-center justify-center rounded-xl px-4 py-4 md:w-64 lg:px-9"
          style={{ backgroundColor }}
        >
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            bookTitle={title}
            variant="medium"
            className="drop-shadow-md"
          />
        </div>
        <div className="flex max-w-full flex-col gap-4 md:max-w-lg">
          <div className="mb-2 flex items-center gap-2 text-lg">
            <p className="text-slate-500">Created at:</p>
            <Image
              src={'/icons/admin/calendar.svg'}
              width={20}
              height={20}
              alt="calendar icon"
            />
            <span className="text-dark-200">
              {createdAt?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-dark-400 md:text-2xl">
            {title}
          </h2>
          <p className="text-base font-semibold text-dark-200 md:text-lg">
            By {author}
          </p>
          <p className="text-base text-slate-500">{genre}</p>
          <Button
            className="h-full w-full bg-primary-admin text-white transition-all duration-300 hover:bg-primary-admin/90 md:w-auto"
            asChild
          >
            <Link href={`/admin/books/${id}/edit`}>
              <Image
                src={'/icons/admin/edit-2.svg'}
                width={20}
                height={20}
                alt="edit icon"
              />
              Edit Book
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20 mt-2 grid grid-cols-1 gap-8 md:gap-16 lg:mt-1 lg:grid-cols-[1.5fr_1fr]">
        <section className="mt-10 flex flex-col gap-7">
          <h3 className="text-base font-semibold text-dark-400">Summary</h3>

          <div className="space-y-5 text-base text-slate-500">
            {summary.split('\n').map((line, index) => (
              <p key={`${line.length}-${index}`}>{line}</p>
            ))}
          </div>
        </section>

        <section className="mt-10 flex w-full flex-col gap-7">
          <h3 className="text-base font-semibold text-dark-400">Video</h3>
          <BookVideo videoUrl={videoUrl} />
        </section>
      </div>
    </>
  );
}
