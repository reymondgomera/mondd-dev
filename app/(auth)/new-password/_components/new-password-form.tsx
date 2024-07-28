'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'

import { newPasswordFormSchema } from '@/schema'
import type { NewPasswordForm } from '@/schema'
import { getFormDefaultValues } from '@/lib'
import { Form } from '@/components/ui/form'
import { default as CustomButton } from '@/components/custom/button'
import { Button } from '@/components/ui/button'
import NewPasswordFormFields from './new-password-form-fields'
import { resetPassword } from '@/actions'
import { useSearchParams } from 'next/navigation'
import Alert from '@/components/custom/alert'

export default function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { executeAsync, isExecuting } = useAction(resetPassword)

  const form = useForm<NewPasswordForm>({
    mode: 'onChange',
    defaultValues: getFormDefaultValues(newPasswordFormSchema),
    resolver: zodResolver(newPasswordFormSchema)
  })

  const handleSubmit = async (data: NewPasswordForm) => {
    setError('')
    setSuccess('')

    try {
      const response = await executeAsync({ token: token ?? '', password: data.password })

      if (!response || !response.data) {
        setError('Failed to reset password! Please try again later.')
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
    <Form {...form} schema={newPasswordFormSchema}>
      <form id='signin-form' className='w-full space-y-3 sm:w-[400px]' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='mb-11 flex flex-col items-center justify-center gap-y-1'>
          <h1 className='text-4xl font-extrabold'>Reset Password</h1>
          <p className='text-center text-sm text-slate-400'>Enter your new password to reset your old password.</p>
        </div>

        <Alert variant='success' message={success} />
        <Alert variant='error' message={error} />

        <NewPasswordFormFields />

        <div className='flex flex-col gap-y-5'>
          <CustomButton className='w-full' type='submit' variant='base-primary' isLoading={isExecuting} loadingText='Resetting'>
            Reset Password
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
