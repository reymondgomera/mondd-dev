import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEditor } from '@/editor/components'
import { EditorIcons } from '@/components/icons'
import ActionTooltipProvider from '@/components/provider/tooltip-provider'

export const MathSelector = () => {
  const { editor } = useEditor()

  if (!editor) return null

  return (
    <ActionTooltipProvider label='Mathethematics'>
      <Button
        variant='ghost'
        size='sm'
        className='w-12 rounded-none'
        onClick={(evt) => {
          if (editor.isActive('math')) {
            editor.chain().focus().unsetLatex().run()
          } else {
            const { from, to } = editor.state.selection
            const latex = editor.state.doc.textBetween(from, to)

            if (!latex) return

            editor.chain().focus().setLatex({ latex }).run()
          }
        }}
      >
        <EditorIcons.sigma className={cn('size-4', { 'text-blue-500': editor.isActive('math') })} strokeWidth={2.3} />
      </Button>
    </ActionTooltipProvider>
  )
}
