'use client'

import { format } from 'date-fns'
import rt from 'reading-time'

import { getPostBySlug } from '@/actions'
import BadgeGroup from '@/components/badge-group'
import Link from 'next/link'
import { Icons } from '@/components/icons'

type PostHeaderProps = {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
}

export default function PostHeader({ post }: PostHeaderProps) {
  const metadata = post.metadata as Record<string, any>
  const readingTime = rt(post.body)

  return (
    <header className='flex flex-col gap-y-4'>
      <div className='flex flex-col gap-y-1'>
        <span className='truncate text-xs capitalize text-slate-400'>
          {post.typeCode === 'project'
            ? metadata.createdAt
              ? format(metadata.createdAt, 'MMM yyyy')
              : format(post.createdAt, 'MMM yyyy')
            : format(post.createdAt, 'MMM yyyy')}
          {post.typeCode === 'project' ? (metadata.madeAt ? ` | ${metadata.madeAt}` : '') : ''}
        </span>
        <h1 className='text-balance text-2xl font-extrabold md:text-3xl'>{post.title}</h1>
      </div>

      <BadgeGroup max={post.tags.length ?? 7} data={post.tags} badgeProps={{ variant: 'primary', size: 'sm', className: 'capitalize' }} />

      {readingTime ? <p className='text-sm text-slate-400'>{readingTime.text}</p> : null}

      {metadata.url ? (
        <Link
          className='flex w-full items-center gap-x-2 text-sm text-slate-400 hover:text-slate-200'
          href={metadata.url}
          target='_blank'
          rel='noreferrer'
        >
          <Icons.openNewTab className='size-4' />
          <span>{metadata.url}</span>
        </Link>
      ) : null}
    </header>
  )
}
