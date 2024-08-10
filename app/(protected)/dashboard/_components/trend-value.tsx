import { Icons } from '@/components/icons'
import { cn } from '@/lib'
import { TrendData, TrendType } from '@/types'

type TrendValueProps = {
  className?: string
  type: TrendType
  data?: TrendData
}

export default function TrendValue({ className, type, data }: TrendValueProps) {
  if (type === 'neutral' || !data) return null

  return (
    <p className={cn('item inline-flex flex-wrap items-center justify-center gap-1.5 text-sm', className)}>
      <span className='inline-flex gap-x-1'>
        <TrendIcon type={type} />
        <span className={cn(type === 'positive' ? 'text-green-500' : 'text-rose-500')}>{data.value}</span>
      </span>
      {data.text ? <span className='text-center text-xs text-muted-foreground'>{data.text}</span> : null}
    </p>
  )
}

function TrendIcon({ type }: { type: TrendType }) {
  switch (type) {
    case 'positive':
      return <Icons.trendUp className='h-4 w-4 text-green-500' />
    case 'negative':
      return <Icons.trendDown className='h-4 w-4 text-rose-500' />
    default:
      return null
  }
}
