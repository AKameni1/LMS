import BookForm from '@/components/admin/forms/book-form';
import GoBackButton from '@/components/admin/go-back-button';

export default function Page() {
  // check if the user is authenticated and an admin
  return (
    <>
      <GoBackButton />

      <section className="w-full max-w-2xl">
        <BookForm type="create" />
      </section>
    </>
  );
}
