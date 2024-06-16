import { cn } from '@/lib'
import { Icons } from './icons'
import { Badge } from './ui/badge'

export function SkillSkilliton() {
  return (
    <div className='w-full'>
      <div className='inline-flex w-full flex-wrap items-center justify-center gap-3 p-1'>
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
        <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
      </div>

      <div className='mt-2 flex w-full max-w-3xl flex-wrap justify-center gap-4 p-3 sm:min-w-72 lg:max-w-5xl'>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`${i}-skill-skilliton`}
            className='flex size-24 animate-pulse cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-slate-800/90 lg:size-32'
          >
            <Icons.image className='size-8 animate-pulse text-slate-700/80 lg:size-[45px]' />
            <div className='h-3 w-14 animate-pulse rounded-full bg-slate-700/80' />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectSkilliton() {
  return (
    <div className='mx-auto grid max-w-5xl grid-cols-1 grid-rows-[repeat(5,280px)_auto] gap-5 md:grid-cols-2 md:grid-rows-[repeat(3,280px)_auto] lg:grid-cols-3 lg:grid-rows-[repeat(2,280px)_auto]'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`${i}-project-skilliton`}
          className={cn(
            'relative row-span-1 animate-pulse overflow-hidden rounded-xl bg-slate-800/90 p-5',
            i === 3 || i === 6 ? 'lg:col-span-2' : '',
            i === 2 && 'md:col-span-2 lg:col-span-1'
          )}
        >
          <div className='invisible flex flex-col gap-2'>
            <div>
              <p className='text-xs text-slate-400'>Jan 2024 | Xyz Inc.</p>
              <h1 className='text-balance text-lg font-bold text-slate-200'>Lorem Ipsum Dolor Sit</h1>
              <p className='line-clamp-2 text-sm text-slate-300'>Lorem ipsum dolor sit amet consectetur. Vivamus hendrerit duis.</p>
            </div>

            <div className='flex flex-wrap gap-1'>
              {['React.js', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL qwe qweqw ewqe wqe qw'].map((tag, i) => (
                <Badge key={`${tag}-${i}`} variant='primary' size='sm'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Icons.image className='absolute inset-0 mx-auto my-auto size-28 flex-shrink-0 animate-pulse text-slate-700/80' />
        </div>
      ))}

      <div className='h-5 w-[245px] animate-pulse rounded-full bg-slate-800/90' />
    </div>
  )
}

export function ExperienceSkilliton() {
  return (
    <div className='mx-auto max-w-3xl'>
      <div className='flex flex-col'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`${i}-experience-skilliton`} className='grid grid-cols-[auto_repeat(3,minmax(0,1fr))] justify-center gap-x-6'>
            <div className={cn('ml-auto mt-1.5 hidden self-stretch md:flex md:flex-col md:items-center md:gap-2')}>
              <div className=' size-3 animate-pulse rounded-full bg-slate-800/90' />
              <div className='flex h-full w-[1px] animate-pulse bg-slate-800/90' />
            </div>

            <div className='mx-auto mt-1 hidden h-5 w-32 animate-pulse self-start rounded-full bg-slate-800/90 lg:block' />

            <div className='col-span-4 flex flex-col gap-y-3 self-start pb-8 md:col-span-3 lg:col-span-2'>
              <div className='flex flex-col gap-3'>
                <div className='mt-1 h-5 w-32 animate-pulse self-start rounded-full bg-slate-800/90 lg:hidden' />

                <div className='h-5 max-w-80 animate-pulse rounded-full bg-slate-800/90' />

                <div className='h-5 w-[80%] animate-pulse rounded-full bg-slate-800/90' />
                <div className='h-5 w-[90%] animate-pulse rounded-full bg-slate-800/90' />
                <div className='h-5 w-[75%] animate-pulse rounded-full bg-slate-800/90' />
                <div className='h-5 w-[90%] animate-pulse rounded-full bg-slate-800/90' />
                <div className='h-5 w-[100%] animate-pulse rounded-full bg-slate-800/90' />
              </div>

              <div className='flex flex-wrap gap-x-2 gap-y-1.5'>
                <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
                <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
                <div className='h-5 w-20 animate-pulse rounded-full bg-slate-800/90' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
