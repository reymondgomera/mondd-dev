'use client'

import { format } from 'date-fns'

import { PostDataForLandingPage } from '@/actions'
import BadgeGroup from '@/components/badge-group'
import BlurImage from '@/components/blur-image'
import Link from 'next/link'
import ActionTooltipProvider from '@/components/provider/tooltip-provider'

type PostCardProps = {
  post: PostDataForLandingPage
}

export default function PostCard({ post }: PostCardProps) {
  const metadata = post.metadata as Record<string, any>

  return (
    <Link href={`/post/${post.typeCode}/${post.slug}`} className='flex flex-col gap-y-3 sm:w-[340px] lg:w-[300px] xl:w-[360px]'>
      <div className='h-[200px] w-full overflow-hidden rounded-xl'>
        <BlurImage
          className='!relative object-cover object-center'
          alt={post.title}
          src={post.thumbnail ?? '/images/img-placeholder.jpg'}
          fill
        />
      </div>

      <div>
        <div className='flex flex-col gap-y-1'>
          <span className='truncate text-xs capitalize text-slate-400'>
            {post.typeCode === 'project'
              ? metadata.createdAt
                ? format(metadata.createdAt, 'MMM yyyy')
                : format(post.createdAt, 'MMM yyyy')
              : format(post.createdAt, 'MMM yyyy')}
            {post.typeCode === 'project' ? (metadata.madeAt ? ` | ${metadata.madeAt}` : '') : ''}
          </span>
          <ActionTooltipProvider label={post.title}>
            <h1 className='line-clamp-2 text-sm font-bold text-slate-200 md:text-base'>{post.title}</h1>
          </ActionTooltipProvider>
          <ActionTooltipProvider label={post.description}>
            <p className='line-clamp-2 text-xs text-slate-400 md:text-sm'>{post.description}</p>
          </ActionTooltipProvider>
        </div>
      </div>

      <BadgeGroup max={7} data={post.tags} badgeProps={{ variant: 'primary', size: 'sm' }} />
    </Link>
  )
}
