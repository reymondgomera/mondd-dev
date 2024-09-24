'use client'

import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export default function BackButton() {
  const router = useRouter()

  return (
    <Button className='text-slate-400' variant='ghost' onClick={() => router.back()}>
      <Icons.chevLeft className='mr-2 size-4' /> <span>Go Back</span>
    </Button>
  )
}
