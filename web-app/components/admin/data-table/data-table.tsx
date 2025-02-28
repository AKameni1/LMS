'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialSorting?: SortingState;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  initialSorting = [],
  className,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <section>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="group h-9 border-slate-200 bg-white px-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-0">
              Columns
              <ChevronDownIcon className="ml-2 h-4 w-4 text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 rounded-md border border-slate-200 bg-white shadow-md"
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium text-slate-700">
              Toggle Columns
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column, index, array) => {
                const isFirstOrLast = index === 0 || index === array.length - 1;
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="cursor-pointer text-sm capitalize hover:bg-slate-50 focus:bg-slate-50 data-[state=checked]:bg-slate-50"
                    checked={column.getIsVisible()}
                    disabled={isFirstOrLast}
                    onCheckedChange={(value) => {
                      if (!isFirstOrLast) {
                        column.toggleVisibility(!!value);
                      }
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4">
        <Table className={cn('w-full table-auto text-center', className)}>
          <TableHeader className="h-14 bg-light-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="h-20"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results Found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm font-medium text-dark-200">
          {table.getPageCount() > 0
            ? `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`
            : 'No Pages'}
        </span>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
