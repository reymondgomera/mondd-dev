import BackButton from '@/components/custom/back-button'

export default function Dashboard404() {
  return (
    <div className='flex h-[calc(100vh-(80px+6rem))] items-center justify-center'>
      <div className='flex max-w-[480px] flex-col items-center justify-center gap-y-4'>
        <h1 className='w-fit text-7xl font-extrabold text-primary dark:text-slate-200'>404</h1>
        <div className='flex flex-col items-center justify-center gap-y-2'>
          <h2 className='w-fit text-2xl font-semibold'>Page Not Found</h2>
          <p className='text-center text-base text-muted-foreground text-slate-400'>
            Oops!. We couldn’t find the page that <br />
            you’re looking for.
          </p>
        </div>

        <BackButton label='Go Back' variant='primary' />
      </div>
    </div>
  )
}
