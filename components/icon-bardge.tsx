import { VariantProps, cva } from 'class-variance-authority'
import { Icon } from './icons'
import { cn } from '@/lib'

const backgroundVariant = cva('rounded-full flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-teal-400/10',
      success: 'bg-green-400/10',
      slate: 'bg-slate-400/10'
    },
    size: {
      default: 'p-2',
      sm: 'p-1'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

const iconVariant = cva('', {
  variants: {
    variant: {
      default: 'text-teal-400',
      success: 'text-green-400',
      slate: 'text-slate-400'
    },
    size: {
      default: 'size-7',
      sm: 'size-4'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type BackgroundVariant = VariantProps<typeof backgroundVariant>
type IconVariant = VariantProps<typeof iconVariant>

type IconBadgeProps = { icon: Icon } & BackgroundVariant & IconVariant

export function IconBadge({ icon: Icon, variant, size }: IconBadgeProps) {
  return (
    <div className={cn(backgroundVariant({ variant, size }))}>
      <Icon className={cn(iconVariant({ variant, size }))} />
    </div>
  )
}
