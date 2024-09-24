'use client'

import { getPostBySlug } from '@/actions'
import BlurImage from '@/components/blur-image'
import dynamic from 'next/dynamic'

const Gallery = dynamic(() => import('react-photoswipe-gallery').then((mod) => mod.Gallery), { ssr: false })
const Item = dynamic(() => import('react-photoswipe-gallery').then((mod) => mod.Item), { ssr: false })

type PostImagesProps = {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
}

export default function PostImages({ post }: PostImagesProps) {
  const metadata = post.metadata as Record<string, any>
  const screenshots = metadata.screenshots as string[]

  return (
    <div className='flex flex-col gap-y-5'>
      <div className='max-h-[400px] w-full overflow-hidden rounded-lg'>
        <BlurImage
          className='!relative object-cover object-center'
          src={post.thumbnail ?? '/images/img-placeholder.jpg'}
          alt={post.title}
          fill
        />
      </div>

      <div className='flex flex-wrap gap-4 transition-all'>
        {screenshots && screenshots.length > 0 ? (
          <Gallery withCaption options={{ zoom: true, clickToCloseNonZoomable: false }}>
            {screenshots.map((src, i) => (
              <Item
                key={`${post.slug}-${i}`}
                original={src ?? '/images/img-placeholder.jpg'}
                id={`${post.slug}-${i}`}
                width={1280}
                height={720}
                caption={post.title + "'s screenshot #" + (i + 1)}
              >
                {({ ref, open }) => (
                  <div className='size-10 cursor-pointer overflow-hidden rounded-md lg:size-14'>
                    <BlurImage
                      ref={ref}
                      className='!relative flex-shrink-0 object-cover object-center'
                      src={src ?? '/images/img-placeholder.jpg'}
                      alt={post.title}
                      onClick={open}
                    />
                  </div>
                )}
              </Item>
            ))}
          </Gallery>
        ) : null}
      </div>
    </div>
  )
}
