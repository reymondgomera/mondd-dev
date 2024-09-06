import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import HeaderHeading from '../_components/header-heading'

export default function ExperiencesPage() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <HeaderHeading title='Experience' description='These are the your experiences in software development.' />

        <Button variant='primary' asChild>
          <Link href='/dashboard/experience/new'>
            <Icons.add className='nr-2 size-4' />
            Add
          </Link>
        </Button>
      </div>
    </>
  )
}
