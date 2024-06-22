import React from 'react'
import { ToolTipContentProps, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type ActionTooltipProviderProps = ToolTipContentProps & { label: string; children: React.ReactNode }

export default function ActionTooltipProvider({ label, children, ...props }: ActionTooltipProviderProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent {...props}>
          <p className='text-sm font-semibold capitalize'>{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
