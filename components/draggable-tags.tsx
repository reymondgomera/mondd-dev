'use client'

import dynamic from 'next/dynamic'
import { DraggableProps } from 'react-draggable-tags'

const DraggableArea = dynamic<DraggableProps<any>>(() => import('react-draggable-tags').then((module) => module.DraggableArea), {
  ssr: false
})

type DraggableTagsProps<T> = DraggableProps<T>

//* made this component dynamic to avoid SSR issues
export default function DraggableTags<T>(props: DraggableTagsProps<T>) {
  return <DraggableArea {...props} />
}
