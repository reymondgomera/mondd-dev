import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='flex h-full w-full items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-y-4'>
        <div className='w-[256px] sm:w-[320px] md:w-[400px] lg:w-[560px]'>
          <Image className='!relative' src='/images/404-error.svg' alt='404-error' fill />
        </div>

        <p className='flex max-w-lg flex-col px-8 text-center text-xs leading-5 text-slate-900 sm:p-0 sm:text-sm sm:leading-6 lg:text-base lg:leading-7'>
          <span>Oops!. We couldn’t find the page that you’re looking for.</span>
          <span>Please check the address and try again.</span>
        </p>

        <Button asChild className='w-fit' variant='base-primary'>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
