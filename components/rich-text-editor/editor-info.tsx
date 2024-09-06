'use client'

import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { EditorIcons } from '../icons'
import { formatNumber } from '@/lib'

type EditorInfoProps = {
  wordsCount?: number
  charsCount?: number
}

export default function EditorInfo({ wordsCount, charsCount }: EditorInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className='flex cursor-pointer items-center gap-1.5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'>
          <EditorIcons.info className='size-4' />
          Info
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-fit px-4 py-1'>
        <div className='flex flex-col divide-y-[1px]'>
          <div className='flex items-center gap-2 py-2'>
            <EditorIcons.word className='size-4' />
            <InfoValue value={formatNumber(wordsCount ?? 0)} />
          </div>
          <div className='flex items-center gap-2 py-2'>
            <EditorIcons.char className='size-4' />
            <InfoValue value={formatNumber(charsCount ?? 0)} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function InfoValue({ value }: { value: string | number }) {
  return <span className='rounded-md bg-muted px-1.5 py-0.5 text-sm font-semibold'>{value}</span>
}
