'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { signinFormSchema } from '@/schema'
import type { SigninForm } from '@/schema'
import { getFormDefaultValues } from '@/lib'
import { Form } from '@/components/ui/form'
import { default as CustomButton } from '@/components/custom/button'
import { Button } from '@/components/ui/button'
import Alert from '@/components/custom/alert'
import { signinUser } from '@/actions'
import { DEFAULT_LOGIN_REDIRECT } from '@/constant'
import SigninFormFields from './signin-form-fields'

export default function SigninForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const { executeAsync, isExecuting } = useAction(signinUser)

  const form = useForm<SigninForm>({
    mode: 'onChange',
    defaultValues: { ...getFormDefaultValues(signinFormSchema), callbackUrl },
    resolver: zodResolver(signinFormSchema)
  })

  const handleSubmit = async (data: SigninForm) => {
    setError('')
    setSuccess('')

    try {
      const response = await executeAsync(data)

      if (response && response.data && response.data.statusCode === 200) {
        setSuccess(response.data.message)
        form.reset()

        if (response.data.data && response.data.data.twoFactor) {
          setTimeout(() => {
            //** did this to do hard navigation to reflect user
            const location = window.location
            window.location.replace(`${location.origin}/two-factor`)
            return
          }, 2000)
        }

        return
      }

      if (response && response.data && (response.data.statusCode === 401 || response.data.statusCode === 500)) {
        setError(response.data.message)
        return
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  useEffect(() => {
    if (searchParams.get('error') === 'OAuthAccountNotLinked') {
      setError('Email address is already linked with another account provider. Please use another account with different email address.')
      return
    }

    if (searchParams.get('error')) {
      setError('Failed to sign in. Please try again later.')
    }
  }, [searchParams])

  return (
    <Form {...form} schema={signinFormSchema}>
      <form id='signin-form' className='w-full space-y-3 sm:w-[400px]' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='mb-11 flex flex-col items-center justify-center gap-y-1'>
          <h1 className='text-4xl font-extrabold'>Sign In</h1>
          <p className='text-center text-sm text-slate-400'>
            Enter your credentials below to sign <br /> in to your account.
          </p>
        </div>

        <Alert variant='success' message={success} />
        <Alert variant='error' message={error} />

        <SigninFormFields />

        <div className='flex flex-col gap-y-5'>
          <CustomButton className='w-full' type='submit' variant='base-primary' isLoading={isExecuting} loadingText='Submitting'>
            Sign In
          </CustomButton>

          <div className='flex items-center justify-items-center'>
            <div className='h-[0.5px] w-full bg-slate-300' />
            <div className='w-full px-1 text-center text-xs text-slate-400'>OR CONTINUE WITH</div>
            <div className='h-[0.5px] w-full bg-slate-300' />
          </div>

          <CustomButton
            type='button'
            variant='outline'
            loadingText='Submitting'
            isLoading={isGoogleSigninLoading}
            onClick={() => {
              setIsGoogleSigninLoading(true)
              signIn('google', { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
            }}
          >
            <FcGoogle className='mr-2 h-4 w-4' />
            Sign in with Google
          </CustomButton>

          <span className='text-center text-sm text-slate-400'>
            <span className='mr-1'>Don’t have an account yet?</span>
            <Button asChild className='h-auto p-0 font-normal text-slate-400 hover:text-primary' variant='link'>
              <Link href='/signup'>Sign Up</Link>
            </Button>
          </span>
        </div>
      </form>
    </Form>
  )
}
