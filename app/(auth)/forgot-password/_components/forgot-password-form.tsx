'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'

import { getFormDefaultValues } from '@/lib'
import { type ForgotPasswordForm, forgotPasswordFormSchema } from '@/schema'
import { Form } from '@/components/ui/form'
import { default as CustomButton } from '@/components/custom/button'
import { forgotPassword } from '@/actions'
import { Button } from '@/components/ui/button'
import ForgotPasswordFormFields from './forgot-password-form-fields'
import Alert from '@/components/custom/alert'

export default function ForgotPasswordForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const { executeAsync, isExecuting } = useAction(forgotPassword)

  const form = useForm<ForgotPasswordForm>({
    mode: 'onChange',
    defaultValues: getFormDefaultValues(forgotPasswordFormSchema),
    resolver: zodResolver(forgotPasswordFormSchema)
  })

  async function handleSubmit(formValues: ForgotPasswordForm) {
    setError('')
    setSuccess('')

    try {
      const response = await executeAsync(formValues)
      const result = response?.data

      if (!response || !result) {
        setError('Failed to send reset password email! Please try again later.')
        return
      }

      if (!result.error) {
        setSuccess(result.message)
        form.reset()
        return
      }

      setError(result.message)
    } catch (err) {
      console.error(error)
      setError('Something went wrong! Please try again later.')
    }
  }

  return (
    <Form {...form} schema={forgotPasswordFormSchema}>
      <form id='signin-form' className='w-full space-y-3 sm:w-[400px]' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='mb-11 flex flex-col items-center justify-center gap-y-1'>
          <h1 className='text-4xl font-extrabold'>Forgot Password</h1>
          <p className='text-center text-sm text-slate-400'>Enter your email below to received a password reset link.</p>
        </div>

        <Alert variant='success' message={success} />
        <Alert variant='error' message={error} />

        <ForgotPasswordFormFields />

        <div className='flex flex-col gap-y-5'>
          <CustomButton className='w-full' type='submit' variant='base-primary' isLoading={isExecuting} loadingText='Sending'>
            Send
          </CustomButton>

          <span className='text-center text-sm text-slate-400'>
            <span className='mr-1'>Back to </span>
            <Button asChild className='h-auto p-0 font-normal text-slate-400 hover:text-primary' variant='link'>
              <Link href='/signin'>Sign in</Link>
            </Button>
          </span>
        </div>
      </form>
    </Form>
  )
}
