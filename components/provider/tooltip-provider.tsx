import React from 'react'
import { ToolTipContentProps, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type ActionTooltipProviderProps = ToolTipContentProps & {
  label: string | React.ReactNode
  children: React.ReactNode & { asChild?: boolean }
  delayDuration?: number
}

export default function ActionTooltipProvider({ label, children, delayDuration = 500, ...props }: ActionTooltipProviderProps) {
  function renderLabel(label: string | React.ReactNode) {
    if (typeof label === 'string') return <p className='text-sm font-medium capitalize'>{label.toLowerCase()}</p>
    return label
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...props}>{renderLabel(label)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
