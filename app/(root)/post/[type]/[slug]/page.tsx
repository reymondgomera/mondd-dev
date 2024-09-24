import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { capitalize, db } from '@/lib'
import { getPostBySlug } from '@/actions'
import { TracingBeam } from '@/components/tracing-beam'
import PostHeader from './_components/post-header'
import PostImages from './_components/post-images'
import PostBody from './_components/post-body'
import BackButton from './_components/back-button'
import { siteConfig } from '@/constant'

//* cache function
const getPostBySlugCached = cache(getPostBySlug)

//* ISR
export async function generateStaticParams() {
  const posts = await db.post.findMany({ select: { slug: true, typeCode: true } })
  return posts.map((post) => ({ type: post.typeCode, slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { type: string; slug: string } }): Promise<Metadata> {
  const post = await getPostBySlugCached(params.type, params.slug, true)

  if (!post) return {}

  const title = post.title
  const type = capitalize(post.typeCode)
  const description = post.description

  return {
    title: `${type} - ${title}`,
    description,
    openGraph: {
      title,
      description
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  }
}

export default async function PostPage({ params }: { params: { type: string; slug: string } }) {
  const post = await getPostBySlugCached(params.type, params.slug, true)

  if (!post) notFound()

  return (
    <div>
      <div className='mx-10 my-8'>
        <BackButton />
      </div>

      <article className='container'>
        <TracingBeam
          className='px-6'
          dot={{ color: '--teal-300', border: '--teal-300' }}
          gradientColor={{ color1: '--teal-300', color2: '--teal-300', color3: '--teal-400', color4: '--teal-600' }}
        >
          <div className='relative flex flex-col gap-y-10'>
            <PostHeader post={post} />
            <PostImages post={post} />
            <PostBody post={post} />
          </div>
        </TracingBeam>
      </article>
    </div>
  )
}
