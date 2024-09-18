'use client'

import { Table } from '@tanstack/react-table'

import { cn } from '@/lib'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DataTableViewOptions } from './data-table-view-options'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface DataTableCommonActionProps<TData> {
  table: Table<TData>
}

export default function DataTableCommonAction<TData>({ table }: DataTableCommonActionProps<TData>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const isAdvancedFilter = useMemo(() => {
    return searchParams && searchParams.get('advanced_filter') === 'true'
  }, [searchParams])

  const toggleAdvancedFilter = () => {
    // //* reset filter
    setTimeout(() => {
      table.getAllColumns().forEach((column) => {
        column.setFilterValue(undefined)
      })
    }, 500)

    if (!isAdvancedFilter) router.push(`${pathname}?advanced_filter=true`)
    else router.push(`${pathname}?advanced_filter=false`)
  }

  return (
    <>
      <Button
        className={cn(isAdvancedFilter && 'bg-accent text-accent-foreground')}
        onClick={toggleAdvancedFilter}
        variant='outline'
        size='sm'
      >
        <Icons.shapes className='mr-2 size-4' />
        Advanced Filter
      </Button>

      <DataTableViewOptions table={table} />
    </>
  )
}
