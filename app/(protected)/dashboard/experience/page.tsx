import Link from 'next/link'

import { SearchParams } from '@/types'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import AsyncWrapper from '@/components/async-wrapper'
import { ComponentErrorFallback } from '@/components/error-fallback'
import ExperienceTable from './_components/experience-table'
import HeaderHeading from '../_components/header-heading'
import { getExperiences } from '@/actions'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'

type ExperiencesPageProps = {
  searchParams: SearchParams
}

export default function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
  const experiencesPromise = getExperiences(searchParams)

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
              columnCount={4}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={['28rem', '36rem', '36rem', '10rem']}
            />
          )
        }}
      >
        <ExperienceTable experiencesPromise={experiencesPromise} />
      </AsyncWrapper>
    </>
  )
}
