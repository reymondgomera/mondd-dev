'use client'

import { use } from 'react'

import { getPostsForLandingPage } from '@/actions'
import ListPagination from '@/components/custom/pagination'
import PostCard from './post-card'
import { useParams } from 'next/navigation'
import { PostType } from '@/types'

type PostListProps = {
  postsPromise: ReturnType<typeof getPostsForLandingPage>
}

export default function PostList({ postsPromise }: PostListProps) {
  const { data, pageCount } = use(postsPromise)
  const { type } = useParams() as { type: PostType }

  return (
    <>
      <div className='mt-11 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
        {data.length > 0 ? (
          data.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div key='not-found' className='mt-10 flex flex-col items-center justify-center gap-y-3 md:col-span-2 lg:col-span-3'>
            <h1 className='text-center text-2xl font-extrabold md:text-3xl lg:text-4xl'>No {type} found</h1>
            <p className='text-center text-sm leading-5 text-slate-400 md:text-base md:leading-6 lg:leading-7'>
              Sorry, what you're looking for couldn't be found or may not exist.
            </p>
          </div>
        )}
      </div>

      <ListPagination className='mt-10' data={data} pageCount={pageCount} initialPerPage={6} />
    </>
  )
}
