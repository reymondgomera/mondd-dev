'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import PropagateLoader from 'react-spinners/PropagateLoader'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib'
import { useMounted } from '@/hooks'
import { useSearchParams } from 'next/navigation'
import { verifyEmail } from '@/actions'
import Alert from '@/components/custom/alert'

export default function EmailVerify() {
  const mounted = useMounted()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const { executeAsync, isExecuting } = useAction(verifyEmail)

  const handleVerfiyEmail = useCallback(
    async (token: string) => {
      try {
        const response = await executeAsync({ token })
        const result = response?.data

        if (!response || !result) {
          setError('Failed to verify email! Please try again later.')
          return
        }

        if (!result.error) {
          setSuccess(result.message)
          return
        }

        setError(result.message)
      } catch (err) {
        console.error(err)
        setError('Something went wrong! Please try again later.')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  )

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        handleVerfiyEmail(token ?? '')
      })
    }
  }, [mounted, token, handleVerfiyEmail])

  return (
    <div className='flex flex-col items-center justify-center gap-y-6 p-10'>
      {isExecuting ? (
        <div className='flex flex-col items-center justify-center gap-y-6'>
          <div className='flex flex-col items-center justify-center gap-y-2'>
            <h1 className='text-balance text-4xl font-extrabold'>Verfiying Email</h1>
            <p className='text-sm text-muted-foreground'>This may take a few seconds.</p>
          </div>
          <PropagateLoader color='#131C26' size={20} />
        </div>
      ) : (
        <>
          <div className={cn('flex size-[120px] items-center justify-center rounded-full', error ? 'bg-rose-50' : 'bg-teal-50')}>
            {error ? <Icons.mailX className='size-14 text-rose-500' /> : null}
            {success ? <Icons.mailCheck className='size-14 text-teal-300' /> : null}
          </div>
          <div className='flex flex-col items-center justify-center gap-y-4'>
            <h1 className='text-balance text-4xl font-extrabold'>{error ? 'Email Verification Failed' : 'Email Verified'}</h1>

            <Alert variant='success' message={success} />
            <Alert variant='error' message={error} />

            <Button asChild variant='base-primary'>
              <Link href='/signin'>Back to Sign In</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
