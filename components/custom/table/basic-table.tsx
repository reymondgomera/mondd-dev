import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { cn } from '@/lib'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type ExtendedProps = {
  tableProps?: React.ComponentPropsWithoutRef<typeof Table>
  tableHeaderProps?: React.ComponentPropsWithoutRef<typeof TableHeader>
  tableHeadProps?: React.ComponentPropsWithoutRef<typeof TableHead>
  tableRowProps?: React.ComponentPropsWithoutRef<typeof TableRow>
  tableCellProps?: React.ComponentPropsWithoutRef<typeof TableCell>
  tableBodyProps?: React.ComponentPropsWithoutRef<typeof TableBody>
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  extendedProps?: ExtendedProps
}

export function BasicDataTable<TData, TValue>({ columns, data, extendedProps }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Table {...extendedProps?.tableProps}>
      <TableHeader {...extendedProps?.tableHeaderProps}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} {...extendedProps?.tableRowProps}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} {...extendedProps?.tableHeadProps}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody {...extendedProps?.tableBodyProps}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} {...extendedProps?.tableRowProps}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} {...extendedProps?.tableCellProps}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow {...extendedProps?.tableRowProps}>
            <TableCell
              colSpan={columns.length}
              {...extendedProps?.tableCellProps}
              className={cn('h-24 text-center', extendedProps?.tableCellProps?.className)}
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
