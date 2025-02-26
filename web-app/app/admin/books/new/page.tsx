import BookForm from '@/components/admin/forms/book-form';
import GoBackButton from '@/components/admin/go-back-button';

export default function Page() {
  return (
    <>
      <GoBackButton />

      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
}
