import { Popover } from '@radix-ui/react-popover'

import { EditorBubbleItem, useEditor } from '@/editor/components'
import { Button } from '@/components/ui/button'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { EditorIcons, Icon } from '@/components/icons'
import { cn } from '@/lib'
import ActionTooltipProvider from '@/components/provider/tooltip-provider'

export type SelectorItem = {
  name: string
  icon: Icon
  command: (editor: ReturnType<typeof useEditor>['editor']) => void
  isActive: (editor: ReturnType<typeof useEditor>['editor']) => boolean
}

const items: SelectorItem[] = [
  {
    name: 'Align Left',
    icon: EditorIcons.alignLeft,
    command: (editor) => editor?.chain().focus().setTextAlign('left').run(),
    isActive: (editor) => (editor ? editor.isActive({ textAlign: 'left' }) : false)
  },
  {
    name: 'Align Center',
    icon: EditorIcons.alignLeft,
    command: (editor) => editor?.chain().focus().setTextAlign('center').run(),
    isActive: (editor) => (editor ? editor.isActive({ textAlign: 'center' }) : false)
  },
  {
    name: 'Align Right',
    icon: EditorIcons.alignRight,
    command: (editor) => editor?.chain().focus().setTextAlign('right').run(),
    isActive: (editor) => (editor ? editor.isActive({ textAlign: 'right' }) : false)
  },
  {
    name: 'Align Justify',
    icon: EditorIcons.alignJustify,
    command: (editor) => editor?.chain().focus().setTextAlign('justify').run(),
    isActive: (editor) => (editor ? editor.isActive({ textAlign: 'justify' }) : false)
  }
]

interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const TextAlignSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
  const { editor } = useEditor()
  if (!editor) return null

  const activeItem = items.filter((item) => item.isActive(editor)).pop()

  if (!activeItem) return null

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <ActionTooltipProvider label='Align'>
        <PopoverTrigger asChild>
          <Button size='sm' variant='ghost' className='gap-2 rounded-none hover:bg-accent focus:ring-0'>
            <span className='whitespace-nowrap text-sm'>{<activeItem.icon className='h-4 w-4' />}</span>
            <EditorIcons.down className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
      </ActionTooltipProvider>
      <PopoverContent sideOffset={5} align='start' className='w-fit p-1'>
        {items.map((item) => (
          <EditorBubbleItem
            key={item.name}
            onSelect={(editor) => {
              item.command(editor)
              onOpenChange(false)
            }}
            className='flex cursor-pointer flex-col justify-center rounded-sm px-2 py-1 text-sm hover:bg-accent'
          >
            <item.icon className={cn('h-4 w-4', { 'text-blue-500': activeItem.name === item.name })} />
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  )
}
