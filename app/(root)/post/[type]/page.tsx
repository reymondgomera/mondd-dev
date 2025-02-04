import { Metadata } from 'next'

import { getPostsForLandingPage } from '@/actions'
import { PostType, SearchParams } from '@/types'
import PostList from './_components/post-list'
import AsyncWrapper from '@/components/async-wrapper'
import { ComponentErrorFallback } from '@/components/error-fallback'
import { Icons } from '@/components/icons'
import { PostsListSkeleton } from '@/components/loading-fallback'
import { siteConfig } from '@/constant'
import PostHeader from './_components/post-header'

type PostsPageProps = {
  params: { type: PostType }
  searchParams: SearchParams
}

export async function generateMetadata({ params }: { params: { type: PostType } }): Promise<Metadata> {
  const post = siteConfig.pages.posts[params.type]

  const title = post.title
  const description = post.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: '/opengraph-image.png'
    }
  }
}

export default async function PostPage({ params, searchParams }: PostsPageProps) {
  const postsPromise = getPostsForLandingPage(params.type, searchParams)

  return (
    <div className='py-6'>
      <div className='container flex flex-col items-center justify-center'>
        <PostHeader />

        <AsyncWrapper
          errorBoundaryProps={{
            FallbackComponent: ComponentErrorFallback,
            extendedProps: {
              componentErrorFallback: {
                title: "Oops! posts can't be loaded",
                description: 'Something went wrong!',
                className: 'p-2',
                icon: <Icons.circleAlert className='size-14 text-destructive' />
              }
            }
          }}
          suspenseProps={{ fallback: <PostsListSkeleton /> }}
        >
          <PostList postsPromise={postsPromise} />
        </AsyncWrapper>
      </div>
    </div>
  )
}
