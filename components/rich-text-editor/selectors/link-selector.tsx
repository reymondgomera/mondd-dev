import { useEffect, useRef } from 'react'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'

import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useEditor } from '@/editor/components'
import { EditorIcons } from '@/components/icons'
import ActionTooltipProvider from '@/components/provider/tooltip-provider'

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (_e) {
    return false
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (_e) {
    return null
  }
}
interface LinkSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { editor } = useEditor()

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus()
  })
  if (!editor) return null

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <ActionTooltipProvider label='Link'>
        <PopoverTrigger asChild>
          <Button size='sm' variant='ghost' className='gap-2 rounded-none'>
            <EditorIcons.link className={cn('h-4 w-4', editor.isActive('link') && 'text-blue-500')} />
            <p
              className={cn('underline decoration-slate-400 underline-offset-4', {
                'text-blue-500 decoration-blue-500': editor.isActive('link')
              })}
            >
              Link
            </p>
          </Button>
        </PopoverTrigger>
      </ActionTooltipProvider>
      <PopoverContent align='start' className='w-60 p-0' sideOffset={10}>
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement
            e.preventDefault()
            const input = target[0] as HTMLInputElement
            const url = getUrlFromString(input.value)
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
              onOpenChange(false)
            }
          }}
          className='flex  p-1 '
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Paste a link'
            className='flex-1 bg-background p-1 text-sm outline-none'
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <Button
              size='icon'
              variant='outline'
              type='button'
              className='flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800'
              onClick={() => {
                editor.chain().focus().unsetLink().run()
                if (inputRef.current) inputRef.current.value = ''
                onOpenChange(false)
              }}
            >
              <EditorIcons.trash className='h-4 w-4' />
            </Button>
          ) : (
            <Button size='icon' className='h-8'>
              <EditorIcons.check className='h-4 w-4' />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  )
}
