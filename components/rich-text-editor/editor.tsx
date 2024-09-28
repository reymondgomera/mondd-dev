'use client'

import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { EditorEvents } from '@tiptap/core'
import { Fragment } from '@tiptap/pm/model'
import { onDelete } from '@/actions/editor'
import { toast } from 'sonner'

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorBubble,
  type EditorInstance,
  EditorRoot,
  type JSONContent
} from '@/editor/components'
import { ImageResizer, handleCommandNavigation } from '@/editor/extensions'
import { handleImageDrop, handleImagePaste } from '@/editor/plugins'
import { defaultExtensions } from './editor-extensions'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { NodeSelector } from './selectors/node-selector'
import { MathSelector } from './selectors/math-selector'
import { TextButtons } from './selectors/text-buttons'
import { getSlashCommand, getSuggestionItems } from './editor-slash-command'
import { TextAlignSelector } from './selectors/text-align-selector'
import EditorInitializer from './editor-initializer'
import { uploadFn } from './image-upload/editor-image-upload'
import { cn, extractFileKeyFromUrl } from '@/lib'
import { Transaction } from '@tiptap/pm/state'
import EditorInfo from './editor-info'
import { EditorIcons } from '../icons'
import { EditorKeyboardShortcuts } from './editor-keyboard-shortcuts'
import { editorDefaultContent } from './editor-default-content'

export type RichTextEditorProps = {
  onChange: (content: string) => void
  onUpdate?: (content: string) => Promise<any>
  value: string
  limit?: number
  debounceMs?: number
  className?: string
  editorClassName?: string
  showEditorInfo?: boolean
  isLoading?: boolean
}

const RichTextEditor = ({
  onChange,
  onUpdate,
  value,
  limit = 20,
  debounceMs = 500,
  className,
  editorClassName,
  showEditorInfo = true,
  isLoading
}: RichTextEditorProps) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(null)
  const [saveStatus, setSaveStatus] = useState('Saved')
  const [wordsCount, setWordsCount] = useState<number>()
  const [charsCount, setCharsCount] = useState<number>()

  const suggestionItems = getSuggestionItems(limit)
  const slashCommand = getSlashCommand(limit)
  const extensions = [...defaultExtensions, slashCommand]

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [openTextAlign, setOpenTextAlign] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
    const characters = editor.storage.characterCount.characters()
    const words = editor.storage.characterCount.words()
    const jsonContent = editor.getJSON()

    setWordsCount(words)
    setCharsCount(characters)
    onChange(JSON.stringify(jsonContent))

    if (onUpdate) await onUpdate(JSON.stringify(jsonContent))

    setSaveStatus('Saved')
  }, debounceMs)

  const handleOnTransaction = async ({ transaction }: EditorEvents['transaction']) => {
    const getImageSrcs = (fragment: Fragment) => {
      let srcs = new Set()
      fragment.forEach((node) => {
        if (node.type.name === 'image') {
          srcs.add(node.attrs.src)
        }
      })
      return srcs
    }

    let currentSrcs = getImageSrcs(transaction.doc.content)
    let previousSrcs = getImageSrcs(transaction.before.content)

    if (currentSrcs.size === 0 && previousSrcs.size === 0) {
      return
    }

    //? Determine which images were deleted
    let deletedImageSrcs = [...previousSrcs].filter((src) => !currentSrcs.has(src))

    if (deletedImageSrcs.length > 0) {
      try {
        const imgUrl = deletedImageSrcs[0] as string
        await onDelete(extractFileKeyFromUrl(imgUrl))
      } catch (error) {
        console.error(error)
        toast.error('Failed to delete uploaded image')
      }
    }
  }

  const handleOnCreate = ({ editor }: { editor: EditorInstance }) => {
    editor.view.dom.setAttribute('spellcheck', 'false')
    editor.view.dom.setAttribute('autocomplete', 'off')
    editor.view.dom.setAttribute('autocapitalize', 'off')
  }

  const handleOnUpdate = ({ editor }: { editor: EditorInstance; transaction: Transaction }) => {
    debouncedUpdates(editor)
    setSaveStatus('Unsaved')
  }

  useEffect(() => {
    if (isLoading) {
      setSaveStatus('Saving...')
      return
    }

    setSaveStatus('Saved')
  }, [isLoading])

  useEffect(() => {
    if (value) setInitialContent(JSON.parse(value))
    else setInitialContent(editorDefaultContent)
  }, [])

  if (!initialContent) return null

  return (
    <div className='relative flex w-full flex-col justify-center rounded-md border border-input bg-background'>
      {showEditorInfo ? (
        <div className='relative z-10 flex flex-wrap justify-end gap-2 self-end px-5 pt-5'>
          <div className='flex items-center gap-1.5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'>
            {isLoading ? <EditorIcons.loading className='size-4 animate-spin' /> : <EditorIcons.save className='size-4' />} {saveStatus}
          </div>
          <EditorInfo wordsCount={wordsCount} charsCount={charsCount} />
          <EditorKeyboardShortcuts />
        </div>
      ) : null}
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={initialContent}
          extensions={extensions}
          className={cn('relative min-h-[500px] w-full', className)}
          editorProps={{
            handleDOMEvents: { keydown: (_view, event) => handleCommandNavigation(event) },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn(limit)),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn(limit)),
            attributes: {
              class: cn(
                'prose prose-base prose-slate dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
                editorClassName
              )
            }
          }}
          onUpdate={handleOnUpdate}
          onCreate={handleOnCreate}
          onTransaction={handleOnTransaction}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
            <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className='flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent'
                  key={item.title}
                >
                  <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>{item.icon}</div>
                  <div>
                    <p className='font-medium'>{item.title}</p>
                    <p className='text-xs text-muted-foreground'>{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble className='flex w-fit max-w-[90vw] divide-x-[1px] overflow-hidden rounded border border-muted bg-background shadow-xl'>
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <MathSelector />
            <TextButtons />
            <TextAlignSelector open={openTextAlign} onOpenChange={setOpenTextAlign} />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}

export default RichTextEditor
