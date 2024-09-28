'use client'

import { JSONContent, useEditor } from '@/editor/components'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { editorDefaultContent } from './editor-default-content'

type EditorInitializerProps = { value: string; setInitialContent: Dispatch<SetStateAction<JSONContent | null>> }

export default function EditorInitializer({ value, setInitialContent }: EditorInitializerProps) {
  const { editor } = useEditor()

  useEffect(() => {
    console.log({ value })

    if (editor && value) setInitialContent(JSON.parse(value))
    else setInitialContent(editorDefaultContent)

    return () => {
      editor?.destroy()
      setInitialContent(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return null
}
