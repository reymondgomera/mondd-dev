'use client'

import { forwardRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib'

const BlurImage = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} ref={ref} fill className={cn(props.className, isLoading ? 'blur-md' : 'blur-0')} onLoad={() => setIsLoading(false)} />
  )
})

BlurImage.displayName = 'BlurImage'

export default BlurImage
