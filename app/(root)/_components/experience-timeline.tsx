import BadgeGroup from '@/components/badge-group'
import { cn } from '@/lib'
import { format } from 'date-fns'
import React from 'react'

export default async function ExperienceTimeline() {
  // await new Promise((resolve) => setTimeout(resolve, 30000))

  // !TODO: fetch experiences

  const exp = [
    {
      title: 'Lorem Ipsum Dolor Sit Amet Consectetur',
      description: `Lorem ipsum dolor sit amet consectetur. Elit justo libero pellentesque id morbi id. Suspendisse vivamus vel pellentesque
      adipiscing. Lorem urna mi mi auctor. Quam in malesuada turpis elit viverra. Amet morbi venenatis in habitant habitasse
      vitae sit volutpat. Eu vestibulum proin consequat ac nisi id leo.`,
      start: new Date('2022-03-01'),
      end: null,
      tags: ['TypeScript', 'Next.js', 'Shadcn UI', 'Nest.js', 'PostgreSQL'],
      order: 3
    },
    {
      title: 'Lorem Ipsum Dolor Sit Amet Consectetur',
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus enim cupiditate molestiae iure unde fuga illo ipsa ratione ea vitae, corporis nulla repellendus sapiente doloremque eveniet voluptates velit hic! Doloribus.
          Minima aliquid, impedit blanditiis aperiam alias at necessitatibus. Qui sed culpa a quidem blanditiis tempora harum voluptate nemo tempore eaque eos incidunt, adipisci doloribus, quas inventore laudantium et dolor reprehenderit!`,
      start: new Date('2022-02-01'),
      end: new Date('2022-02-31'),
      tags: ['TypeScript', 'Next.js', 'Shadcn UI', 'Nest.js', 'PostgreSQL'],
      order: 2
    },
    {
      title: 'Lorem Ipsum Dolor Sit Amet Consectetur',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, consequuntur natus dolorum inventore dignissimos odio! Dolor quo nesciunt consequuntur, quis mollitia voluptatibus culpa enim error, magni accusamus eligendi explicabo rerum!
          Laborum delectus corporis distinctio molestias praesentium, animi impedit doloremque aperiam sapiente ipsam, iusto neque ipsum autem dolor asperiores nesciunt aliquid voluptatum. Obcaecati atque veniam, exercitationem accusantium nulla explicabo vitae impedit.`,
      start: new Date('2022-01-01'),
      end: new Date('2022-01-31'),
      tags: ['TypeScript', 'Next.js', 'Shadcn UI', 'Nest.js', 'PostgreSQL'],
      order: 1
    }
  ]

  return (
    <div className='mx-auto max-w-3xl'>
      <div className='flex flex-col'>
        {exp
          .sort((a, b) => b.order - a.order)
          .map((item, i) => (
            <div className='grid grid-cols-[auto_repeat(3,minmax(0,1fr))] justify-center gap-x-6'>
              <div className={cn('ml-auto mt-1.5 hidden self-stretch md:flex md:flex-col md:items-center md:gap-2')}>
                <div className=' size-3 rounded-full bg-teal-300' />
                {i < exp.length - 1 && <div className='flex h-full w-[1px] bg-slate-700' />}
              </div>

              <div className='mx-auto mt-1 hidden self-start text-xs font-semibold uppercase text-slate-500 lg:block'>
                {format(item.start, 'MMM yyyy')} - {item.end ? format(item.end, 'MMM yyyy') : 'PRESENT'}
              </div>

              <div className='col-span-4 flex flex-col gap-y-3 self-start pb-8 md:col-span-3 lg:col-span-2'>
                <div className='flex flex-col gap-1'>
                  <div className='mt-1 w-full self-start text-center text-xs font-semibold uppercase text-slate-500 md:text-start lg:hidden'>
                    {format(item.start, 'MMM yyyy')} - {item.end ? format(item.end, 'MMM yyyy') : 'PRESENT'}
                  </div>
                  <h1 className='text-balance text-center text-base font-semibold text-slate-200 md:text-start lg:text-lg'>{item.title}</h1>
                  <p className='text-center text-sm leading-5 text-slate-400 md:text-start md:text-base md:leading-6 lg:leading-7'>
                    {item.description}
                  </p>
                </div>

                <BadgeGroup
                  className='justify-center md:justify-start'
                  max={7}
                  data={item.tags}
                  badgeProps={{ variant: 'primary', size: 'sm' }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
