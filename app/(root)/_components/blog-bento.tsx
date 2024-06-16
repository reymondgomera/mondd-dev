import Link from 'next/link'

import { cn } from '@/lib'
import { BentoGrid, BentoGridItem } from '@/components/bento-grid'
import { Icons } from '@/components/icons'

export default async function BlogBento() {
  // await new Promise((resolve) => setTimeout(resolve, 20000))

  // !TODO: fetch projects

  const items = [
    {
      thumbnail: 'https://picsum.photos/id/77/450/300',
      title: 'Lorem Ipsum Dolor Sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Vivamus hendrerit duis.',
      creationDate: new Date('01-24-2024'),
      madeAt: 'Xyz Inc.',
      tags: ['React.js', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Google Analytics', 'Zod']
    },
    {
      thumbnail: 'https://picsum.photos/id/78/450/300',
      title: 'Lorem Ipsum Dolor Sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Vivamus hendrerit duis.',
      creationDate: new Date('01-24-2024'),
      madeAt: 'Xyz Inc.',
      tags: ['React.js', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL']
    },
    {
      thumbnail: 'https://picsum.photos/id/79/450/300',
      title: 'Lorem Ipsum Dolor Sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Vivamus hendrerit duis.',
      creationDate: new Date('01-24-2024'),
      madeAt: 'Xyz Inc.',
      tags: ['React.js', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL']
    },
    {
      thumbnail: 'https://picsum.photos/id/80/450/300',
      title: 'Lorem Ipsum Dolor Sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Vivamus hendrerit duis.',
      creationDate: new Date('01-24-2024'),
      madeAt: 'Xyz Inc.',
      tags: ['React.js', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL']
    },
    {
      thumbnail: 'https://picsum.photos/id/81/450/300',
      title: 'Lorem Ipsum Dolor Sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Vivamus hendrerit duis.',
      creationDate: new Date('01-24-2024'),
      madeAt: 'Xyz Inc.',
      tags: ['React.js', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL']
    }
  ]

  return (
    <BentoGrid className='mx-auto max-w-5xl grid-rows-[repeat(5,280px)_auto] md:grid-rows-[repeat(3,280px)_auto] lg:grid-rows-[repeat(2,280px)_auto]'>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          thumbnail={item.thumbnail}
          title={item.title}
          description={item.description}
          creationDate={item.creationDate}
          madeAt={item.madeAt}
          tags={item.tags}
          className={cn(i === 0 && 'lg:row-span-2', i === 2 && 'md:col-span-2 lg:col-span-1')}
        />
      ))}

      <Link
        className='text-based group inline-flex w-full items-center gap-1.5 font-semibold decoration-teal-300 underline-offset-4 hover:underline'
        href='/blog'
      >
        <span>View All Blogs</span> <Icons.arrowRight className='size-4 transition-all group-hover:translate-x-1.5' />
      </Link>
    </BentoGrid>
  )
}
