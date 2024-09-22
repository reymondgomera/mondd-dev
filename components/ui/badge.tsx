import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        primary: 'border-transparent bg-teal-600 text-slate-200 dark:bg-teal-400/10 dark:text-teal-300 dark:hover:bg-teal-400/20',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground'
      },
      size: {
        default: 'py-0.5 px-2.5',
        sm: 'px-3 py-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, size, ...props }, ref) => (
  <div className={cn(badgeVariants({ variant, size }), className)} {...props} ref={ref} />
))

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
