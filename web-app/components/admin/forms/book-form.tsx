'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { bookSchema } from '@/lib/validations';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/file-upload';
import ColorPicker from '../color-picker';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { Loader2Icon } from 'lucide-react';
import { createBook, updateBook } from '@/lib/actions/admin/books';

interface AuthFormPropsType extends Partial<Book> {
  type: 'create' | 'update';
}

export default function BookForm({
  type,
  ...book
}: Readonly<AuthFormPropsType>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const text = type === 'create' ? 'Create Book' : 'Update Book';

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      genre: book?.genre ?? '',
      rating: book?.rating ?? 1,
      totalCopies: book?.totalCopies ?? 1,
      coverUrl: book?.coverUrl ?? '',
      coverColor: book?.coverColor ?? '#000000',
      videoUrl: book?.videoUrl ?? '',
      description: book?.description ?? '',
      summary: book?.summary ?? '',
    },
  });

  const showError = (title: string, error?: string) => {
    toast.error(title, {
      description: error ?? 'An unexpected error occurred',
    });
  };

  const handleUpdateBook = async (values: z.infer<typeof bookSchema>) => {
    // Implement your update book logic here
    if (!book.id) {
      throw new Error('Book ID is required for update');
    }

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([key, v]) => {
        console.log(key);
        return v !== undefined;
      }),
    );

    const result = await updateBook(filteredValues, book.id);
    console.log('Updating book:', book.id, values);
    return result;
  };

  const handleCreateBook = async (values: z.infer<typeof bookSchema>) => {
    // Implement your create book logic here
    const result = await createBook(values);
    console.log('Creating book:', values);
    return result;
  };

  const handleSubmit = (values: z.infer<typeof bookSchema>) => {
    startTransition(async () => {
      try {
        const { success, error, data } = await (type === 'create'
          ? handleCreateBook(values)
          : handleUpdateBook(values));

        if (success && data) {
          toast.info(`${text} Successful`, {
            description: `Book has been ${type}d successfully.`,
          });
          router.replace(`/admin/books/${data.id}`);
          router.refresh();
        } else {
          showError(`${text} Failed`, error);
          form.setError('root', {
            type: 'manual',
            message: error ?? 'Something went wrong',
          });
        }
      } catch (error) {
        showError(`${text} Failed`, String(error));
        form.setError('root', {
          type: 'manual',
          message: 'An unexpected error occurred',
        });
      }
    });
  };

  return (
    <>
      <div className="mb-2 space-y-1">
        <h3 className="text-xl font-semibold">
          {type === 'create' ? 'Add New Book' : 'Edit Book'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {type === 'create'
            ? 'Add a new book to the library'
            : 'Edit book details'}
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Book Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={type === 'create'}
                      placeholder="Enter the book title"
                      {...field}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'author'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={type === 'create'}
                      placeholder="Enter the author name"
                      {...field}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'genre'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Genre
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={type === 'create'}
                      placeholder="Enter the genre of the book"
                      {...field}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name={'rating'}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-medium text-dark-500">
                      Rating
                    </FormLabel>
                    <FormControl>
                      <Input
                        step={0.1}
                        type="number"
                        min={1}
                        max={5}
                        {...field}
                        className="book-form_input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={'totalCopies'}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-medium text-dark-500">
                      Total number of books
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={10000}
                        {...field}
                        className="book-form_input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={'coverUrl'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Book Image
                  </FormLabel>
                  <FormControl className="h-auto">
                    <FileUpload
                      type="image"
                      accept="image/*"
                      placeholder="Upload a book cover"
                      folder="books/covers"
                      variant="light"
                      onFileChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'coverColor'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Book Primary Color
                  </FormLabel>
                  <FormControl>
                    <div className="color-picker">
                      <ColorPicker
                        onPickerChange={field.onChange}
                        value={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'description'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Book Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief description of the book"
                      {...field}
                      rows={5}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'videoUrl'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Book Trailer
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      type="video"
                      accept="video/*"
                      placeholder="Upload a book trailer"
                      folder="books/videos"
                      variant="light"
                      onFileChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'summary'}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className="text-base font-medium text-dark-500">
                    Book Summary
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief summary of the book"
                      {...field}
                      rows={5}
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                className="min-h-14 w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="book-form_btn text-white"
              >
                {isPending ? (
                  <Loader2Icon className="size-10 animate-spin" />
                ) : (
                  text
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
