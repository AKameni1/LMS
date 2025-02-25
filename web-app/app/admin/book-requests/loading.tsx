import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Borrow Requests</h2>
        <Skeleton className="h-8 w-20 rounded-md bg-gray-200" />
      </div>

      <div className="mt-7 flex w-full flex-col gap-2 overflow-hidden">        
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg bg-light-300 text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Book
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                User Requested
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Borrowed Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Return Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Due Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Status
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Receipt{''}
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap px-3 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-14 w-11 rounded bg-gray-200" />
          <Skeleton className="h-6 w-24 rounded bg-gray-200" />
        </div>
      </td>
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
          <Skeleton className="h-5 w-24 rounded bg-gray-200" />
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-5 w-1/2 rounded bg-gray-200" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-5 w-1/2 rounded bg-gray-200" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-5 w-1/2 rounded bg-gray-200" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-5 w-1/2 rounded bg-gray-200" />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-full rounded bg-gray-200" />
      </td>
    </tr>
  );
}
