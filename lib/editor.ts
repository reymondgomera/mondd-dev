'use client'

const hljs = require('highlight.js')
import { JSONContent } from '@tiptap/core'
import { generateHTML } from '@tiptap/html'

import { defaultExtensions } from '@/components/rich-text-editor/editor-extensions'
import katex from 'katex'

export const formatHtml = (content: string) => {
  if (typeof window === 'undefined') return

  // highlight codeblocks
  const doc = new DOMParser().parseFromString(content, 'text/html')
  doc.querySelectorAll<HTMLElement>('pre code').forEach((el) => hljs.highlightElement(el))

  // format katex
  doc.querySelectorAll<HTMLElement>('[data-type="math"]').forEach((el) => {
    const latex = el.innerText
    el.innerHTML = katex.renderToString(latex, { throwOnError: false })
  })

  return new XMLSerializer().serializeToString(doc)
}

export const getGeneratedHTML = (content: JSONContent | null | undefined) => {
  if (!content) return undefined
  const html = generateHTML(content, defaultExtensions)
  return formatHtml(html)
}
