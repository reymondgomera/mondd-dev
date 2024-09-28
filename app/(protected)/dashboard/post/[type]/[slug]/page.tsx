import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/actions'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { capitalize } from '@/lib'
import PostForm from './_components/post-form'

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { type: string; slug: string } }) {
  const post = await getPostBySlug(params.type, params.slug)

  if (!post) notFound()

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className='dark:hover:text-slate:200 dark:text-slate-400' href={`/dashboard/post/${params.type}`}>
                {capitalize(params.type)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className='font-semibold text-primary hover:text-primary dark:text-slate-200'
                href={`/dashboard/post/${params.type}/${params.slug}`}
              >
                {post.slug}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PostForm post={post} />
    </>
  )
}
