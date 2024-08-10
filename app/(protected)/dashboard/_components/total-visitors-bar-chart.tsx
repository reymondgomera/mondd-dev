'use client'

import Card from '@/components/custom/card'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { TrendData } from '@/types'
import TrendValue from './trend-value'

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: '#2DD4BF'
  }
} satisfies ChartConfig

const data = [
  { month: 'January', visitors: 186 },
  { month: 'February', visitors: 305 },
  { month: 'March', visitors: 237 },
  { month: 'April', visitors: 73 },
  { month: 'May', visitors: 209 },
  { month: 'June', visitors: 700 },
  { month: 'July', visitors: 670 },
  { month: 'August', visitors: 400 },
  { month: 'September', visitors: 320 },
  { month: 'October', visitors: 799 },
  { month: 'November', visitors: 900 },
  { month: 'December', visitors: 542 }
]

const trendData = {
  value: '5.2%',
  text: 'since last month'
} satisfies TrendData

export default function TotalVisitorsLineChart() {
  return (
    <Card
      title='Total Visitors'
      description='Year 2024'
      extendedProps={{
        cardTitleProps: { className: 'text-center' },
        cardDescriptionProps: { className: 'text-center' },
        cardHeaderProps: { className: 'pb-4' },
        cardContentProps: { className: 'flex flex-col item-center justify-center gap-y-4' }
      }}
    >
      <ChartContainer config={chartConfig} className='h-[275px]'>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
          <Bar dataKey='visitors' fill='var(--color-visitors)' radius={4} />
        </BarChart>
      </ChartContainer>

      <div className='flex justify-center'>
        <TrendValue type='positive' data={trendData} />
      </div>
    </Card>
  )
}
