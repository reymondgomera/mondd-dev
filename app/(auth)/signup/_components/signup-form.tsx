'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

import { signupFormSchema } from '@/schema'
import type { SignupForm } from '@/schema'
import { getFormDefaultValues } from '@/lib'
import { Form } from '@/components/ui/form'
import { default as CustomButton } from '@/components/custom/button'
import { Button } from '@/components/ui/button'
import { signupUser } from '@/actions'
import Alert from '@/components/custom/alert'
import SignupFormFields from './signup-form-fields'
import { DEFAULT_LOGIN_REDIRECT } from '@/constant'

export default function SignupForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isGoogleSigninLoading, setIsGoogleSigninLoading] = useState<boolean>(false)

  const { executeAsync, isExecuting } = useAction(signupUser)

  const form = useForm<SignupForm>({
    mode: 'onChange',
    defaultValues: getFormDefaultValues(signupFormSchema),
    resolver: zodResolver(signupFormSchema)
  })

  const handleSubmit = async (data: SignupForm) => {
    setSuccess('')
    setError('')

    try {
      const response = await executeAsync(data)

      if (!response || !response.data) {
        setError('Failed to create user! Please try again later.')
        return
      }

      if (response.data.statusCode === 200) {
        setSuccess(response.data.message)
        form.reset()
        return
      }

      setError('Something went wrong! Please try again later.')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <Form {...form} schema={signupFormSchema}>
      <form id='signin-form' className='w-full space-y-3 sm:w-[400px]' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='mb-11 flex flex-col items-center justify-center gap-y-1'>
          <h1 className='text-4xl font-extrabold'>Sign Up</h1>
          <p className='text-center text-sm text-slate-400'>
            Enter your credentials below to sign up <br />
            for an account.
          </p>
        </div>

        <Alert variant='success' message={success} />
        <Alert variant='error' message={error} />

        <SignupFormFields />

        <div className='flex flex-col gap-y-5'>
          <CustomButton className='w-full' type='submit' variant='base-primary' isLoading={isExecuting} loadingText='Submitting'>
            Sign Up
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
              signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT })
            }}
          >
            <FcGoogle className='mr-2 h-4 w-4' />
            Sign up with Google
          </CustomButton>

          <span className='text-center text-sm text-slate-400'>
            <span className='mr-1'>Already have an account?</span>
            <Button asChild className='h-auto p-0 font-normal text-slate-400 hover:text-primary' variant='link'>
              <Link href='/signin'>Sign In</Link>
            </Button>
          </span>
        </div>
      </form>
    </Form>
  )
}
