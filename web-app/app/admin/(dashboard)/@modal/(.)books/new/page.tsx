import BookForm from '@/components/admin/forms/book-form';
import ModalForm from '@/components/admin/modal-form';

export default function CreateBookModal() {
  console.log('CreateBookModal');
  return (
    <ModalForm className="max-h-full max-w-2xl overflow-auto hide-scrollbar">
      <BookForm type="create" />
    </ModalForm>
  );
}
