import Link from 'next/link'
import { format } from 'date-fns'

import { cn } from '@/lib'
import BadgeGroup from './badge-group'
import BlurImage from './blur-image'
import ActionTooltipProvider from './provider/tooltip-provider'

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn('mx-auto grid max-w-7xl auto-rows-[280px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3', className)}>
      {children}
    </div>
  )
}

type BentoGridItemProps = {
  thumbnail: string
  title: string
  description: string
  creationDate: Date
  madeAt?: string
  tags: string[]
  href: string
  className?: string
}

export const BentoGridItem = ({ thumbnail, title, description, creationDate, madeAt, tags, href, className }: BentoGridItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'group/bento relative row-span-1 flex cursor-pointer items-end rounded-xl bg-slate-400/10 p-5 transition-all hover:scale-105',
        className
      )}
    >
      <div className='invisible flex flex-col gap-2 transition-all group-hover/bento:visible'>
        <div>
          <p className='text-xs text-slate-400'>
            {format(creationDate, 'MMM yyyy')} {madeAt ? ` | ${madeAt}` : ''}
          </p>
          <ActionTooltipProvider label={title}>
            <h1 className='line-clamp-2 text-balance text-lg font-bold text-slate-200'>{title}</h1>
          </ActionTooltipProvider>
          <ActionTooltipProvider label={description}>
            <p className='line-clamp-2 text-sm text-slate-300'>{description}</p>
          </ActionTooltipProvider>
        </div>

        <BadgeGroup max={5} data={tags} badgeProps={{ variant: 'primary', size: 'sm' }} />
      </div>

      <BlurImage
        className='absolute inset-0 rounded-xl object-cover object-left transition-all group-hover/bento:-z-10 group-hover/bento:brightness-[15%]'
        src={thumbnail}
        alt={title}
        fill
      />
    </Link>
  )
}
