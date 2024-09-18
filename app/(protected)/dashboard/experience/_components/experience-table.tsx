'use client'

import { use, useMemo } from 'react'

import { ExperienceData, getExperiences } from '@/actions'
import { getColumns } from './experience-table-column'
import { useDataTable, useDataTableStore } from '@/hooks/use-data-table'
import { DataTableFilterField } from '@/types'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { useSearchParams } from 'next/navigation'

type ExperienceTableProps = {
  experiencesPromise: ReturnType<typeof getExperiences>
}

export default function ExperienceTable({ experiencesPromise }: ExperienceTableProps) {
  const { data, pageCount } = use(experiencesPromise)

  const searchParams = useSearchParams()

  const isAdvancedFilter = useMemo(() => {
    return searchParams.get('advanced_filter') === 'true'
  }, [searchParams])

  const columns = useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<ExperienceData>[] = [
    {
      label: 'Title',
      value: 'title',
      placeholder: 'Search titles...'
    }
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    initialState: {
      sorting: [{ id: 'start', desc: true }],
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
