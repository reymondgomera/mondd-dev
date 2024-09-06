import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import HeaderHeading from '../_components/header-heading'

export default function SkillsPage() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <HeaderHeading
          title='Skill'
          description="These are all the technologies, tools, and platforms you've utilized throughout my software development career."
        />

        <Button variant='primary' asChild>
          <Link href='/dashboard/skill/new'>
            <Icons.add className='nr-2 size-4' />
            Add
          </Link>
        </Button>
      </div>
    </>
  )
}
