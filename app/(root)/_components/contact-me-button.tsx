'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useNavigationStore } from '@/hooks'

export default function ContactMeButton() {
  const { setHash } = useNavigationStore(['setHash'])

  return (
    <Link href='/#contact' onClick={() => setHash('/#contact')}>
      <Button className='w-fit' variant='primary'>
        Contact Me
      </Button>
    </Link>
  )
}
