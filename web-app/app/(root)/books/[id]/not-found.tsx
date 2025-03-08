import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Book Not Found</h1>
      <p className="mb-8 text-xl">
        We couldn&apos;t find the book you&apos;re looking for. It may have been removed
        or doesn&apos;t exist.
      </p>
      <Link
        href="/books"
        className="rounded-md bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
        replace
      >
        Browse All Books
      </Link>
    </div>
  );
}
