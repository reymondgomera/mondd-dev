import { Icons } from '@/components/icons'
import Link from 'next/link'

type AuthLeftSideProps = {
  subtitle?: string
}

export default function AuthLeftSide({ subtitle }: AuthLeftSideProps) {
  return (
    <div className='relative hidden h-full w-[50%] bg-base-primary lg:flex lg:items-center lg:justify-center'>
      <div className='relative flex flex-col items-center justify-center gap-y-1'>
        <Link href='/'>
          {/* // eslint-disable-next-line @next/next/no-img-element*/}
          <img src='/images/logo-text-default.svg' alt='logo' className='h-7 w-auto' />
        </Link>

        {subtitle ? <p className='text-center text-sm text-slate-400'>"{subtitle}"</p> : null}
        <div className='absolute -top-8 left-[calc(50%-45px)] size-28 rounded-full bg-teal-300/10 blur-xl' />
      </div>

      <div className='absolute bottom-3 left-3 flex gap-1 text-sm'>
        <span className='text-white'>© 2024, Made with</span>
        <Icons.heart className='h-5' />
        <span className='text-white'> by</span>
        <span className='font-semibold text-teal-300'>mond</span>
      </div>
    </div>
  )
}
