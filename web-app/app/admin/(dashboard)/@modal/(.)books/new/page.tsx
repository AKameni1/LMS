import BookForm from '@/components/admin/forms/book-form';
import ModalForm from '@/components/admin/modal-form';

export default function CreateBookModal() {
  console.log('CreateBookModal');
  return (
    <ModalForm>
      <BookForm type="create" />
    </ModalForm>
  );
}
