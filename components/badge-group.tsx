import React from 'react'
import { Badge, BadgeProps } from './ui/badge'
import { cn } from '@/lib'
import ActionTooltipProvider from './provider/tooltip-provider'

type BadgeGroupProps = {
  className?: string
  data: string[]
  max: number
  badgeProps: BadgeProps
}

const countFormatter = new Intl.NumberFormat(undefined, { notation: 'compact' })

export default function BadgeGroup({ data, max, badgeProps, className }: BadgeGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-x-1 gap-y-1.5', className)}>
      {data.slice(0, max).map((data, i) => (
        <Badge {...badgeProps} key={`${i}-${data}`} {...badgeProps}>
          {data}
        </Badge>
      ))}

      {data.length > max && (
        <ActionTooltipProvider label={data.slice(max).join(', ')}>
          <Badge {...badgeProps}>+{countFormatter.format(data.length - max)}</Badge>
        </ActionTooltipProvider>
      )}
    </div>
  )
}
