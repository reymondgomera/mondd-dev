'use client'

import dynamic from 'next/dynamic'

import { getPostBySlug } from '@/actions'

const EditorHtmlContent = dynamic(() => import('@/components/rich-text-editor/editor-html-content'), { ssr: false })

type PostBodyProps = {
  post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>
}

export default function PostBody({ post }: PostBodyProps) {
  return <EditorHtmlContent value={post.body} />
}
