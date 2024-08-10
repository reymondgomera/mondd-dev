'use client'

import * as React from 'react'

import { Label, Pie, PieChart } from 'recharts'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import Card from '@/components/custom/card'
import TrendValue from './trend-value'
import { TrendData } from '@/types'

const chartData = [
  { country: 'PH', visitors: 275, fill: 'var(--color-PH)' },
  { country: 'US', visitors: 200, fill: 'var(--color-US)' },
  { country: 'UK', visitors: 287, fill: 'var(--color-UK)' },
  { country: 'JP', visitors: 173, fill: 'var(--color-JP)' },
  { country: 'RU', visitors: 190, fill: 'var(--color-RU)' }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  PH: {
    label: 'Philippines',
    color: '#E76E50'
  },
  US: {
    label: 'United States of America',
    color: '#2A9D90'
  },
  UK: {
    label: 'United Kingdom',
    color: '#264552'
  },
  JP: {
    label: 'Japan',
    color: '#E8C468'
  },
  RU: {
    label: 'Russia',
    color: '#E8C468'
  }
} satisfies ChartConfig

const trendData = {
  value: '5.2%',
  text: 'since last month'
} satisfies TrendData

export default function Top5VisitorsCountriesPieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card
      title='Top 5 Visitors Countries'
      description='For this month'
      extendedProps={{
        cardTitleProps: { className: 'text-center' },
        cardDescriptionProps: { className: 'text-center' },
        cardHeaderProps: { className: 'pb-0' }
      }}
    >
      <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[208px]'>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey='visitors' nameKey='country' innerRadius={60} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                      <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-3xl font-bold'>
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
                        Visitors
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className='flex justify-center'>
        <TrendValue type='positive' data={trendData} />
      </div>
    </Card>
  )
}
