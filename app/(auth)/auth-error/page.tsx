import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

type AuthErrorKey = 'Configuration' | 'AccessDenied' | 'Verification' | 'Default'

type ErrorMap = Record<AuthErrorKey, { title: string; message: string }>

const errorMap: ErrorMap = {
  Configuration: {
    title: 'Configuration Error',
    message: 'There is a problem with the server configuration. Check the server logs for more information.'
  },
  AccessDenied: {
    title: 'Access Denied',
    message: 'You do not have permission to sign in.'
  },
  Verification: {
    title: 'Verification Error',
    message: 'The sign in link is no longer valid. It may have been used already or it may have expired.'
  },
  Default: {
    title: 'Authentication Server Error',
    message: 'An error occurred on the server. Try again later.'
  }
}

export default function AuthErrorPage({ searchParams }: { searchParams: { error: AuthErrorKey } }) {
  const error = errorMap[searchParams.error ?? 'Default']

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-y-4'>
        <div className='w-[256px] sm:w-[320px] md:w-[400px] lg:w-[560px]'>
          <Image className='!relative' src='/images/500-auth-error.svg' alt='500-auth-error' fill />
        </div>

        <h1 className='text-dark text-balance text-center text-3xl font-extrabold'>{error.title}</h1>
        <p className='flex max-w-lg flex-col px-8 text-center text-xs leading-5 sm:p-0 sm:text-sm sm:leading-6 lg:text-base lg:leading-7'>
          {error.message}
        </p>

        <Button asChild className='w-fit' variant='base-primary'>
          <Link href='/signin'>Back to Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
