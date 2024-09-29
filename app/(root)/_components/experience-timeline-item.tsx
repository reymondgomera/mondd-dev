'use client'

import { cn } from '@/lib'
import { ExperiencesDataForLandingPage } from '@/actions'
import { format } from 'date-fns'
import BadgeGroup from '@/components/badge-group'

type ExperienceTimelineItemProps = {
  index: number
  exprience: ExperiencesDataForLandingPage
  experiences: ExperiencesDataForLandingPage[]
}

export default function ExperienceTimelineItem({ experiences, exprience, index }: ExperienceTimelineItemProps) {
  return (
    <div className='grid grid-cols-[auto_repeat(3,minmax(0,1fr))] justify-center gap-x-6'>
      <div className={cn('ml-auto mt-1.5 hidden self-stretch md:flex md:flex-col md:items-center md:gap-2')}>
        <div className=' size-3 rounded-full bg-teal-300' />
        {index < experiences.length - 1 && <div className='flex h-full w-[1px] bg-slate-700' />}
      </div>

      <div className='mx-auto mt-1 hidden self-start text-xs font-semibold uppercase text-slate-500 lg:block'>
        {format(exprience.start, 'MMM yyyy')} - {exprience.end ? format(exprience.end, 'MMM yyyy') : 'PRESENT'}
      </div>

      <div className='col-span-4 flex flex-col gap-y-3 self-start pb-8 md:col-span-3 lg:col-span-2'>
        <div className='flex flex-col gap-1'>
          <div className='mt-1 w-full self-start text-center text-xs font-semibold uppercase text-slate-500 md:text-start lg:hidden'>
            {format(exprience.start, 'MMM yyyy')} - {exprience.end ? format(exprience.end, 'MMM yyyy') : 'PRESENT'}
          </div>
          <h1 className='text-balance text-center text-base font-semibold text-slate-200 md:text-start lg:text-lg'>{exprience.title}</h1>
          <p className='text-center text-sm leading-5 text-slate-400 md:text-start md:text-base md:leading-6 lg:leading-7'>
            {exprience.description}
          </p>
        </div>

        <BadgeGroup
          className='justify-center md:justify-start'
          max={7}
          data={exprience.tags}
          badgeProps={{ variant: 'primary', size: 'sm' }}
        />
      </div>
    </div>
  )
}
