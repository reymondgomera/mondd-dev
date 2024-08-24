import { useState } from 'react'

import { cn } from '@/lib'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { EditorIcons } from '../icons'
import { ScrollArea } from '../ui/scroll-area'

type TiptapCommand = { text: string; shortcut: string[] }

type TiptapKeyboardShortcut = {
  title: string
  command: TiptapCommand[]
}

const shortcuts: TiptapKeyboardShortcut[] = [
  {
    title: 'Essentials',
    command: [
      { text: 'Copy', shortcut: ['Ctrl+C'] },
      { text: 'Cut', shortcut: ['Ctrl+X'] },
      { text: 'Paste', shortcut: ['Ctrl+V'] },
      { text: 'Paste without formatting', shortcut: ['Ctrl+Shift+V'] },
      { text: 'Undo', shortcut: ['Ctrl+Z'] },
      { text: 'Redo', shortcut: ['Ctrl+Shift+Z'] },
      { text: 'Add a line break', shortcut: ['Shift+Enter', 'Ctrl+Enter'] }
    ]
  },
  {
    title: 'Text Formatting',
    command: [
      { text: 'Bold', shortcut: ['Ctrl+B'] },
      { text: 'Italicize', shortcut: ['Ctrl+I'] },
      { text: 'Underline', shortcut: ['Ctrl+U'] },
      { text: 'Strikethrough', shortcut: ['Ctrl+Shift+S'] },
      { text: 'Highlight', shortcut: ['Ctrl+Shift+H'] },
      { text: 'Code', shortcut: ['Ctrl+E'] }
    ]
  },
  {
    title: 'Paragraph Formatting',
    command: [
      { text: 'Apply normal text style', shortcut: ['Ctrl+alt+0'] },
      { text: 'Apply heading 1', shortcut: ['Ctrl+alt+1'] },
      { text: 'Apply heading 2', shortcut: ['Ctrl+alt+2'] },
      { text: 'Apply heading 3', shortcut: ['Ctrl+alt+3'] },
      { text: 'Apply heading 4', shortcut: ['Ctrl+alt+4'] },
      { text: 'Ordered list', shortcut: ['Ctrl+Shift+7'] },
      { text: 'Bullet list', shortcut: ['Ctrl+Shift+8'] },
      { text: 'Todo list', shortcut: ['Ctrl+Shift+9'] },
      { text: 'Blockquote', shortcut: ['Ctrl+Shift+B'] },
      { text: 'Left align', shortcut: ['Ctrl+Shift+L'] },
      { text: 'Center align', shortcut: ['Ctrl+Shift+E'] },
      { text: 'Right align', shortcut: ['Ctrl+Shift+R'] },
      { text: 'Justify', shortcut: ['Ctrl+Shift+J'] },
      { text: 'Code block', shortcut: ['Ctrl+Alt+C'] },
      { text: 'Subscript', shortcut: ['Ctrl+,'] },
      { text: 'Superscript	', shortcut: ['Ctrl+.'] }
    ]
  },
  {
    title: 'Text Selection',
    command: [
      { text: 'Select all', shortcut: ['Ctrl+A'] },
      { text: 'Extend selection one character to left', shortcut: ['Shift+←'] },
      { text: 'Extend selection one character to right', shortcut: ['Shift+→'] },
      { text: 'Extend selection one line up', shortcut: ['Shift+↑'] },
      { text: 'Extend selection one line down', shortcut: ['Shift+↓'] }
    ]
  }
]

export function KeyboardShortcut({ children, className }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn('rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium tracking-widest opacity-60', className)}>
      {children}
    </span>
  )
}

function KeyboardShortcutItem({ title, command }: TiptapKeyboardShortcut) {
  return (
    <div className='flex flex-col gap-y-1.5 py-2'>
      <h1 className='text-sm font-bold'>{title}</h1>
      <div className='flex flex-col justify-center gap-y-0.5 divide-y-[1px]'>
        {command.map((command, index) => (
          <div key={`${command.text}-${index}`} className='flex items-center py-1'>
            <span className='max-w-[170px] text-xs'>{command.text}</span>
            <div className='ml-auto flex flex-col items-end justify-center gap-y-1.5'>
              {command.shortcut.map((shortcut, index) => (
                <KeyboardShortcut key={`${shortcut}-${index}`}>{shortcut}</KeyboardShortcut>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function EditorKeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className='flex cursor-pointer items-center gap-1.5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'>
          <EditorIcons.keyboard className='size-4' />
          Shortcuts
        </div>
      </PopoverTrigger>
      <PopoverContent className='max-w-screen-sm p-0'>
        <ScrollArea className='flex h-[400px] flex-col px-4 py-1'>
          {shortcuts.map((shortcut, index) => (
            <KeyboardShortcutItem key={`${shortcut.title}-${index}`} title={shortcut.title} command={shortcut.command} />
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
