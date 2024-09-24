import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { EditorBubbleItem, useEditor } from '@/editor/components'
import type { SelectorItem } from './node-selector'
import { EditorIcons } from '@/components/icons'
import ActionTooltipProvider from '@/components/provider/tooltip-provider'

export const TextButtons = () => {
  const { editor } = useEditor()
  if (!editor) return null
  const items: SelectorItem[] = [
    {
      name: 'Bold',
      icon: EditorIcons.bold,
      command: (editor) => editor?.chain().focus().toggleBold().run(),
      isActive: (editor) => (editor ? editor.isActive('bold') : false)
    },
    {
      name: 'Italic',
      icon: EditorIcons.italic,
      command: (editor) => editor?.chain().focus().toggleItalic().run(),
      isActive: (editor) => (editor ? editor.isActive('italic') : false)
    },
    {
      name: 'Underline',
      icon: EditorIcons.underline,
      command: (editor) => editor?.chain().focus().toggleUnderline().run(),
      isActive: (editor) => (editor ? editor.isActive('underline') : false)
    },
    {
      name: 'Strikethrough',
      icon: EditorIcons.strikethrough,
      command: (editor) => editor?.chain().focus().toggleStrike().run(),
      isActive: (editor) => (editor ? editor.isActive('strike') : false)
    },
    {
      name: 'Superscript',
      icon: EditorIcons.superscript,
      command: (editor) => {
        if (editor) {
          editor.chain().focus().toggleSuperscript().run()
          editor.chain().focus().unsetSubscript().run()
        }
      },
      isActive: (editor) => (editor ? editor.isActive('superscript') : false)
    },
    {
      name: 'Subscript',
      icon: EditorIcons.subscript,
      command: (editor) => {
        if (editor) {
          editor.chain().focus().toggleSubscript().run()
          editor.chain().focus().unsetSuperscript().run()
        }
      },
      isActive: (editor) => (editor ? editor.isActive('subscript') : false)
    },
    {
      name: 'Code',
      icon: EditorIcons.code,
      command: (editor) => editor?.chain().focus().toggleCode().run(),
      isActive: (editor) => (editor ? editor.isActive('code') : false)
    }
  ]
  return (
    <div className='flex'>
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={(editor) => {
            item.command(editor)
          }}
        >
          <ActionTooltipProvider label={item.name}>
            <Button type='button' size='sm' className='rounded-none' variant='ghost'>
              <item.icon
                className={cn('h-4 w-4', {
                  'text-blue-500': item.isActive(editor)
                })}
              />
            </Button>
          </ActionTooltipProvider>
        </EditorBubbleItem>
      ))}
    </div>
  )
}
