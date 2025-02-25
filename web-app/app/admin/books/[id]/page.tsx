import BookView from '@/components/admin/book-view';
import GoBackButton from '@/components/admin/go-back-button';

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id;
  return (
    <>
      <GoBackButton />

      <BookView id={id} />
    </>
  );
}
