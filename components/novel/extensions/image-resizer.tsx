import { EditorIcons } from '@/components/icons'
import ActionTooltipProvider from '@/components/provider/tooltip-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib'
import { useCurrentEditor } from '@tiptap/react'
import { useEffect, type FC, useState } from 'react'
import Moveable from 'react-moveable'

export const ImageResizer: FC = () => {
  const { editor } = useCurrentEditor()
  const imageInfo = document.querySelector('.ProseMirror-selectednode') as HTMLImageElement
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  useEffect(() => {
    if (imageInfo && editor) {
      const selection = editor.state.selection
      editor.commands.setNodeSelection(selection.from)

      //* the the offsetTop and offsetLeft of the image node
      setPosition({ top: imageInfo.offsetTop, left: imageInfo.offsetLeft })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageInfo])

  if (!editor?.isActive('image')) return null

  const updateMediaSize = () => {
    if (!imageInfo) return

    const selection = editor.state.selection
    const setImage = editor.commands.setImage as (options: { src: string; width: number; height: number }) => boolean
    const align = imageInfo.classList.contains('ml-auto') ? 'right' : imageInfo.classList.contains('mr-auto') ? 'left' : 'center'

    setImage({
      src: imageInfo.src,
      width: Number(imageInfo.style.width.replace('px', '')),
      height: Number(imageInfo.style.height.replace('px', ''))
    })

    editor.commands.setAlignedImage({
      align,
      src: imageInfo.src,
      width: Number(imageInfo.style.width.replace('px', '')),
      height: Number(imageInfo.style.height.replace('px', ''))
    })

    editor.commands.setNodeSelection(selection.from)
  }

  const alignImage = (align: 'left' | 'center' | 'right' | 'none') => {
    if (!imageInfo) return

    editor.commands.setAlignedImage({
      align,
      src: imageInfo.src,
      width: imageInfo.width,
      height: imageInfo.height
    })
  }

  const isActive = (align: 'left' | 'center' | 'right' | 'none') => {
    if (!imageInfo) return

    const alignClass = align === 'left' ? 'mr-auto' : align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''

    const imageClassName = imageInfo.classList
    return imageClassName.contains(alignClass)
  }

  return (
    <>
      <div
        className='absolute flex w-fit max-w-[90vw] divide-x-[1px] overflow-hidden rounded border border-muted bg-background shadow-xl'
        style={{
          top: !position ? undefined : `${position.top - 45}px`,
          left: !position ? undefined : `${position.left}px`
        }}
      >
        <ActionTooltipProvider label='Align Left'>
          <Button
            size='sm'
            variant='ghost'
            className={cn('gap-2 rounded-none hover:bg-accent focus:ring-0', isActive('left') && 'text-blue-500')}
            onClick={() => alignImage('left')}
          >
            <EditorIcons.alignLeft className='h-4 w-4' />
          </Button>
        </ActionTooltipProvider>

        <ActionTooltipProvider label='Align Center'>
          <Button
            size='sm'
            variant='ghost'
            className={cn('gap-2 rounded-none hover:bg-accent focus:ring-0', isActive('center') && 'text-blue-500')}
            onClick={() => alignImage('center')}
          >
            <EditorIcons.alignCenter className='h-4 w-4' />
          </Button>
        </ActionTooltipProvider>

        <ActionTooltipProvider label='Align Right'>
          <Button
            size='sm'
            variant='ghost'
            className={cn('gap-2 rounded-none hover:bg-accent focus:ring-0', isActive('right') && 'text-blue-500')}
            onClick={() => alignImage('right')}
          >
            <EditorIcons.alignRight className='h-4 w-4' />
          </Button>
        </ActionTooltipProvider>
      </div>

      <Moveable
        className='!z-40'
        target={document.querySelector('.ProseMirror-selectednode') as HTMLDivElement}
        container={null}
        origin={false}
        /* Resize event edges */
        edge={false}
        throttleDrag={0}
        /* When resize or scale, keeps a ratio of the width, height. */
        keepRatio={true}
        /* resizable*/
        /* Only one of resizable, scalable, warpable can be used. */
        resizable={true}
        throttleResize={0}
        onResize={({
          target,
          width,
          height,
          // dist,
          delta
        }) => {
          if (delta[0]) target.style.width = `${width}px`
          if (delta[1]) target.style.height = `${height}px`
        }}
        // { target, isDrag, clientX, clientY }: any
        onResizeEnd={() => {
          updateMediaSize()
        }}
        /* scalable */
        /* Only one of resizable, scalable, warpable can be used. */
        scalable={true}
        throttleScale={0}
        /* Set the direction of resizable */
        renderDirections={['w', 'e']}
        onScale={({
          target,
          // scale,
          // dist,
          // delta,
          transform
        }) => {
          target.style.transform = transform
        }}
      />
    </>
  )
}
