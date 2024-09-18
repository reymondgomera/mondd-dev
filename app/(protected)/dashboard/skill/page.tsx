import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { SearchParams } from '@/types'
import HeaderHeading from '../_components/header-heading'
import AsyncWrapper from '@/components/async-wrapper'
import { ComponentErrorFallback } from '@/components/error-fallback'
import SkillTable from './_components/skill-table'
import { getReferences, getSkills } from '@/actions'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'

type SkillsPageProps = {
  searchParams: SearchParams
}

export default function SkillsPage({ searchParams }: SkillsPageProps) {
  const skillsPromise = getSkills(searchParams)
  const skillTypesPromise = getReferences({ entityCodes: ['skill-type'] })

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

      <AsyncWrapper
        errorBoundaryProps={{
          FallbackComponent: ComponentErrorFallback,
          extendedProps: {
            componentErrorFallback: {
              title: "Oops! project can't be loaded",
              description: 'Something went wrong!',
              className: 'p-2 h-[480px]',
              icon: <Icons.circleAlert className='size-14 text-destructive' />
            }
          }
        }}
        suspenseProps={{
          fallback: (
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['28rem', '52rem', '32rem', '36rem', '10rem']}
            />
          )
        }}
      >
        <SkillTable skillsPromise={skillsPromise} skillTypesPromise={skillTypesPromise} />
      </AsyncWrapper>
    </>
  )
}
