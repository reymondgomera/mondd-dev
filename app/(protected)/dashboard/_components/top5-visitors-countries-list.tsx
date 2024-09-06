'use client'

import { ColumnDef } from '@tanstack/react-table'

import { TrendData, TrendType } from '@/types'
import { formatNumber } from '@/lib/formatter'
import TrendValue from './trend-value'
import Card from '@/components/custom/card'
import { BasicDataTable } from '@/components/custom/table/basic-table'

type TableRowData = { country: string; visitors: number; type: TrendType; trendData: TrendData }

type TopSellingItemsCardProps = {
  data: TableRowData[]
}

const columns: ColumnDef<TableRowData>[] = [
  {
    header: '#',
    cell: ({ row }) => <span>{row.index + 1}</span>
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 20
  },
  {
    accessorKey: 'visitors',
    header: 'Visitors',
    cell: ({ row }) => formatNumber(row.original.visitors)
  },
  {
    accessorKey: 'trend',
    header: 'Trend',
    cell: ({ row }) => <TrendValue type={row.original.type} data={row.original.trendData} />
  }
]

const data: TableRowData[] = [
  {
    country: 'Philippines',
    visitors: 1229,
    type: 'positive',
    trendData: { value: '12.5%' }
  },
  {
    country: 'United States of America',
    visitors: 1204,
    type: 'positive',
    trendData: { value: '10.7%' }
  },
  {
    country: 'United Kingdom',
    visitors: 1110,
    type: 'negative',
    trendData: { value: '9.2%' }
  },
  {
    country: 'Japan',
    visitors: 900,
    type: 'negative',
    trendData: { value: '7.2%' }
  },
  {
    country: 'Russia',
    visitors: 675,
    type: 'negative',
    trendData: { value: '12.5%' }
  }
]

export default function Top5VisitorsCountriesList() {
  return (
    <Card title='Top 5 Visitor’s Countries' description='For this month'>
      <BasicDataTable
        columns={columns}
        data={data}
        extendedProps={{
          tableHeaderProps: { className: '[&>tr>th:first-child]:px-0' },
          tableBodyProps: { className: '[&>tr>td:first-child]:px-0' }
        }}
      />
    </Card>
  )
}
