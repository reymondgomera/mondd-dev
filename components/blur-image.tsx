'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

import { cn } from '@/lib'

export default function BlurImage(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return <Image {...props} fill className={cn(props.className, isLoading ? 'blur-md' : 'blur-0')} onLoad={() => setIsLoading(false)} />
}
