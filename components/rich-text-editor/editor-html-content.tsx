'use client'

import { useMemo } from 'react'
import { JSONContent } from '@tiptap/core'

import { cn, getGeneratedHTML } from '@/lib'

type EditorHtmlContentProps = {
  className?: string
  value?: string | null
}

export default function EditorHtmlContent({ className, value }: EditorHtmlContentProps) {
  const html = useMemo(() => {
    if (!value) return null
    const content = JSON.parse(value) as JSONContent
    if (content) return getGeneratedHTML(content)
  }, [value])

  if (!html) return null

  return (
    <div
      className={cn('empty-p prose-headings:font-title prose prose-base prose-slate w-full max-w-full p-5 dark:prose-invert', className)}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  )
}
