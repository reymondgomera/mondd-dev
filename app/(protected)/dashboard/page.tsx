import { Icons } from '@/components/icons'
import AsyncWrapper from '@/components/async-wrapper'
import { ComponentErrorFallback } from '@/components/error-fallback'
import { StatCardSkeleton } from '@/components/loading-fallback'
import StatCards from './_components/stat-cards'

export default function DashboardPage() {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
      <AsyncWrapper
        errorBoundaryProps={{
          FallbackComponent: ComponentErrorFallback,
          extendedProps: {
            componentErrorFallback: {
              title: "Oops! dashboard data can't be loaded",
              description: 'Something went wrong!',
              className: 'columns-1 md:col-span-2 p-2 h-[480px]',
              icon: <Icons.circleAlert className='size-14 text-destructive' />
            }
          }
        }}
        suspenseProps={{
          fallback: (
            <>
              <StatCardSkeleton className='h-[150px] w-full' />
              <StatCardSkeleton className='h-[150px] w-full' />
              <StatCardSkeleton className='h-[150px] w-full' />
              <StatCardSkeleton className='h-[150px] w-full' />
            </>
          )
        }}
      >
        <StatCards />
      </AsyncWrapper>
    </div>
  )
}
