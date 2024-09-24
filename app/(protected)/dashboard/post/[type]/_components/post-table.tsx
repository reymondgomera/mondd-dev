'use client'

import { use, useMemo } from 'react'

import { PostData, getPosts } from '@/actions'
import { DataTableFilterField } from '@/types'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar'
import { getColumns } from './post-table-columns'
import { useSearchParams } from 'next/navigation'

type PostTableProps = {
  postsPromise: ReturnType<typeof getPosts>
}

export default function PostTable({ postsPromise }: PostTableProps) {
  const { data, pageCount } = use(postsPromise)

  const searchParams = useSearchParams()

  const isAdvancedFilter = useMemo(() => {
    return searchParams.get('advanced_filter') === 'true'
  }, [searchParams])

  const columns = useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<PostData>[] = [
    {
      label: 'Title',
      value: 'title',
      placeholder: 'Search titles...'
    },
    {
      label: 'Highlight',
      value: 'isFeatured',
      options: [
        { label: 'Featured', value: 'true' },
        { label: 'Unfeatured', value: 'false' }
      ]
    },
    {
      label: 'Visibility',
      value: 'isPublished',
      options: [
        { label: 'Published', value: 'true' },
        { label: 'Draft', value: 'false' }
      ]
    }
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] }
    },
    enableAdvancedFilter: isAdvancedFilter,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}` //* For remembering the previous row selection on page change
  })

  return (
    <DataTable table={table}>
      {isAdvancedFilter ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields} />
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields} />
      )}
    </DataTable>
  )
}
