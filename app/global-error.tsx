'use client'

import { DM_Sans } from 'next/font/google'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html className='h-full scroll-smooth' lang='en' suppressHydrationWarning>
      <body className={`${dmSans.className} h-full bg-white`}>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='flex flex-col items-center gap-y-4'>
            <div className='w-[256px] sm:w-[320px] md:w-[400px] lg:w-[560px]'>
              <Image className='!relative' src='/images/something-went-wrong.svg' alt='something-went-wrong' fill />
            </div>

            <h1 className='text-dark text-balance text-center text-3xl font-extrabold text-slate-900'>Something went wrong!</h1>
            <p className='flex max-w-lg flex-col px-8 text-center text-xs leading-5 text-slate-900 sm:p-0 sm:text-sm sm:leading-6 lg:text-base lg:leading-7'>
              The server encountered an error and couldn't complete your request
            </p>

            <Button className='w-fit' variant='base-primary' onClick={() => reset()}>
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
