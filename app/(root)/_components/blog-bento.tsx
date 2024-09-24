import Link from 'next/link'

import { cn } from '@/lib'
import { BentoGrid, BentoGridItem } from '@/components/bento-grid'
import { Icons } from '@/components/icons'
import { getLatestFeaturedAndPublishedPosts } from '@/actions'

export default async function BlogBento() {
  const blogs = await getLatestFeaturedAndPublishedPosts('blog')

  return (
    <BentoGrid className='mx-auto max-w-5xl grid-rows-[repeat(5,280px)_auto] md:grid-rows-[repeat(3,280px)_auto] lg:grid-rows-[repeat(2,280px)_auto]'>
      {blogs &&
        blogs.map((item, i) => {
          return (
            <BentoGridItem
              key={i}
              thumbnail={item.thumbnail ?? '/images/img-placeholder.jpg'}
              title={item.title}
              description={item.description}
              creationDate={item.createdAt}
              tags={item.tags}
              href={`/post/blog/${item.slug}`}
              className={cn(i === 0 && 'lg:row-span-2', i === 2 && 'md:col-span-2 lg:col-span-1')}
            />
          )
        })}

      <Link
        className='text-based group inline-flex w-full items-center gap-1.5 font-semibold decoration-teal-300 underline-offset-4 hover:underline'
        href='/post/blog'
        replace={false}
      >
        <span>View All Blogs</span> <Icons.arrowRight className='size-4 transition-all group-hover:translate-x-1.5' />
      </Link>
    </BentoGrid>
  )
}
