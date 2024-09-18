'use client'

import { use, useMemo } from 'react'

import { SkillData, getReferences, getSkills } from '@/actions'
import { getColumns } from './skill-table-column'
import { DataTableFilterField } from '@/types'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import { useSearchParams } from 'next/navigation'

type SkillTableProps = {
  skillsPromise: ReturnType<typeof getSkills>
  skillTypesPromise: ReturnType<typeof getReferences>
}

export default function SkillTable({ skillsPromise, skillTypesPromise }: SkillTableProps) {
  const { data, pageCount } = use(skillsPromise)
  const skillTypes = use(skillTypesPromise)

  const searchParams = useSearchParams()

  const isAdvancedFilter = useMemo(() => {
    return searchParams.get('advanced_filter') === 'true'
  }, [searchParams])

  const columns = useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<SkillData>[] = [
    {
      label: 'Title',
      value: 'title',
      placeholder: 'Search titles...'
    },
    {
      label: 'Type',
      value: 'typeCode',
      options: skillTypes.map((type) => ({ label: type.name, value: type.code }))
    },
    {
      label: 'Favorite',
      value: 'isFavorite',
      options: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' }
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
