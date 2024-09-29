'use client'

import { useEffect, useState } from 'react'
import { getImageSize } from 'react-image-size'
import BeatLoader from 'react-spinners/BeatLoader'

import { getPostBySlug } from '@/actions'
import BlurImage from '@/components/blur-image'
import dynamic from 'next/dynamic'
import { Icons } from '@/components/icons'

const Gallery = dynamic(() => import('react-photoswipe-gallery').then((mod) => mod.Gallery), { ssr: false })
const Item = dynamic(() => import('react-photoswipe-gallery').then((mod) => mod.Item), { ssr: false })

type PostImagesProps = {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
}

export default function PostImages({ post }: PostImagesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const metadata = post.metadata as Record<string, any>
  const screenshots = metadata.screenshots as string[]

  const [screenshotsWithDimensions, setScreenshotsWithDimensions] = useState<{ src: string; width: number; height: number }[]>([])

  async function getImageDimensions(srcs: string[]) {
    try {
      setIsLoading(true)
      const promises = srcs.map((src) => getImageSize(src))
      const dimensions = await Promise.all(promises)
      const imgs = srcs.map((src, i) => ({ src, width: dimensions[i].width, height: dimensions[i].height }))

      setScreenshotsWithDimensions(imgs)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsError(true)
    }
  }

  useEffect(() => {
    if (screenshots && screenshots.length > 0) getImageDimensions(screenshots)
  }, [screenshots])

  if (isLoading) return <BeatLoader color='#E2E8F0' size={10} />

  if (isError)
    return (
      <div className='flex items-center gap-x-1.5 text-sm text-rose-500'>
        <Icons.circleAlert className='size-4' /> Failed to load screenshots!
      </div>
    )

  return (
    <div className='flex flex-col gap-y-5'>
      <div className='w-full overflow-hidden rounded-lg'>
        <BlurImage
          className='!relative object-cover object-center'
          src={post.thumbnail ?? '/images/img-placeholder.jpg'}
          alt={post.title}
          fill
        />
      </div>

      <div className='flex flex-wrap gap-4 transition-all'>
        {screenshotsWithDimensions.length > 0 ? (
          <Gallery withCaption options={{ zoom: true, clickToCloseNonZoomable: false }}>
            {screenshotsWithDimensions.map((img, i) => (
              <Item
                key={`${post.slug}-${i}`}
                original={img.src ?? '/images/img-placeholder.jpg'}
                id={`${post.slug}-${i}`}
                width={img.width}
                height={img.height}
                caption={post.title + "'s screenshot #" + (i + 1)}
              >
                {({ ref, open }) => (
                  <div className='size-10 cursor-pointer overflow-hidden rounded-md lg:size-14'>
                    <BlurImage
                      ref={ref}
                      className='!relative flex-shrink-0 object-cover object-center'
                      src={img.src ?? '/images/img-placeholder.jpg'}
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
