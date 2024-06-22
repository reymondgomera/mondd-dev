'use client'

import { FallbackProps } from 'react-error-boundary'
import { Icon, Icons } from './icons'
import { cn } from '@/lib'
import { Button } from './ui/button'

type FallbackComponentProps = FallbackProps & Record<string, any>

type ComponentErrorFallbackProps = {
  className?: string
  title: string
  description: string
  icon: React.ReactNode
}

// TODO: GlobalErrorFallback & PageErrorFallback Components
export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackComponentProps) {}
export function PageErrorFallback({ error, resetErrorBoundary }: FallbackComponentProps) {}

export function ComponentErrorFallback({ error, resetErrorBoundary, ...extendedProps }: FallbackComponentProps) {
  const { className, title, description, icon } = extendedProps.componentErrorFallback as ComponentErrorFallbackProps

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {icon}
      <div className='mt-2.5 flex flex-col items-center justify-center gap-1'>
        <h1 className='text-center text-xl font-medium'>{title}</h1>
        <p className='text-center text-sm text-slate-500 dark:text-slate-400'>{description || error.message}</p>
      </div>

      <Button className='mt-4' size='sm' variant='destructive' onClick={() => resetErrorBoundary()}>
        Reset
      </Button>
    </div>
  )
}
