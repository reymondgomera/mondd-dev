import { getPosts } from '@/actions'
import { Icons } from '@/components/icons'
import { PostType, SearchParams } from '@/types'
import AsyncWrapper from '@/components/async-wrapper'
import { ComponentErrorFallback } from '@/components/error-fallback'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import PostTable from './_components/post-table'
import AddPostButton from './_components/add-post-button'
import HeaderHeading from '../../_components/header-heading'

type PostsPageProps = {
  params: { type: PostType }
  searchParams: SearchParams
}

export default function PostsPage({ params, searchParams }: PostsPageProps) {
  const postsPromise = getPosts(params.type, searchParams)

  function Heading() {
    switch (params.type) {
      case 'project': {
        return (
          <div className='flex items-center justify-between'>
            <HeaderHeading title='Projects' description='These are all the projects you have made throughout your career.' />
            <AddPostButton />
          </div>
        )
      }

      default: {
        return (
          <div className='flex items-center justify-between'>
            <HeaderHeading title='Blog' description='These are all the blogs you want to share with everyone.' />
            <AddPostButton />
          </div>
        )
      }
    }
  }

  return (
    <>
      <Heading />

      <AsyncWrapper
        errorBoundaryProps={{
          FallbackComponent: ComponentErrorFallback,
          extendedProps: {
            componentErrorFallback: {
              title: "Oops! project can't be loaded",
              description: 'Something went wrong!',
              className: 'p-2 h-[480px]',
              icon: <Icons.circleAlert className='size-14 text-destructive' />
            }
          }
        }}
        suspenseProps={{
          fallback: (
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['28rem', '32rem', '32rem', '36rem', '10rem']}
            />
          )
        }}
      >
        <PostTable postsPromise={postsPromise} />
      </AsyncWrapper>
    </>
  )
}
