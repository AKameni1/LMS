'use client';

import { Button } from '@/components/ui/button';
import { truncateText } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import BookCover from '@/components/book-cover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import SuperAdminDialog from '../dialog/super-admin-dialog';

/**
 * Defines the columns for the data table in the admin panel.
 *
 * @type {ColumnDef<BookRequest>[]}
 *
 * @property {ColumnDef<BookRequest>} bookTitle - Column for the book title, includes the book cover and title with a tooltip.
 * @property {ColumnDef<BookRequest>} author - Column for the author of the book.
 * @property {ColumnDef<BookRequest>} genre - Column for the genre of the book.
 * @property {ColumnDef<BookRequest>} createdAt - Column for the date the book was created.
 * @property {ColumnDef<BookRequest>} view - Column for viewing the book details, includes a link to the book's detail page.
 * @property {ColumnDef<BookRequest>} actions - Column for actions on the book, includes buttons for editing and deleting the book.
 *
 * @returns {ColumnDef<BookRequest>[]} The columns for the data table in the admin panel.
 */
export const columns: ColumnDef<BookRequest>[] = [
  {
    accessorKey: 'bookTitle',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Book
        </Button>
      );
    },
    cell: ({ row }) => {
      const { coverColor, coverUrl, title } = row.original;
      return (
        <div className="flex flex-row items-center gap-2 text-left">
          <BookCover
            coverImage={coverUrl}
            bookTitle={title}
            variant="extraSmall"
            coverColor={coverColor}
          />
          <div className="flex flex-col items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="font-medium text-dark-400">
                    {truncateText(title, 30)}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="bg-light-700 text-dark-400">
                  {title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'author',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Author
        </Button>
      );
    },
    cell: ({ row }) => {
      const { author } = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-medium text-dark-400">
                {truncateText(author, 30)}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-light-700 text-dark-400">
              {author}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'genre',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Genre
        </Button>
      );
    },
    cell: ({ row }) => {
      const { genre } = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-medium text-dark-400">
                {truncateText(genre, 30)}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-light-700 text-dark-400">
              {genre}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className="text-sm text-dark-200"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Created
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
      );
      return <span className="text-sm font-medium text-dark-200">{date}</span>;
    },
  },
  {
    accessorKey: 'view',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">View</span>;
    },
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Button
          className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-light-300 px-4 py-2 text-sm font-medium text-primary-admin shadow transition-all duration-300 hover:bg-light-300/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          asChild
        >
          <Link href={`/admin/books/${id}`}>View</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return <span className="text-sm font-medium text-dark-200">Actions</span>;
    },
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className="flex flex-row items-center justify-around">
          <DeleteCell id={id} />

          <Link
            className="transition-all duration-300 hover:brightness-125 hover:filter"
            href={`/admin/books/${id}/edit`}
          >
            <Image
              src={'/icons/admin/edit.svg'}
              width={20}
              height={20}
              alt={`edit book ${id}`}
            />
          </Link>
        </div>
      );
    },
  },
];

export function DeleteCell({ id }: Readonly<{ id: string }>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="transition-all duration-300 hover:brightness-150 hover:filter"
      >
        <Image
          src={'/icons/admin/trash.svg'}
          width={20}
          height={20}
          alt={`delete book ${id}`}
        />
      </button>

      <SuperAdminDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log(`Deleting book ${id}`);
        }}
      />
    </>
  );
}
