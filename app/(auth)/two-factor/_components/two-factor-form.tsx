'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'

import { verifyTwoFactorCodeFormSchema } from '@/schema'
import type { VerifyTwoFactorCodeForm } from '@/schema'
import { getFormDefaultValues, useCurrentUser } from '@/lib'
import { Form } from '@/components/ui/form'
import { default as CustomButton } from '@/components/custom/button'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/constant'
import { useRouter } from 'next/navigation'
import { resendCode, verifyTwoFactorCode } from '@/actions'
import Alert from '@/components/custom/alert'
import TwoFactorFormFields from './two-factor-form-fields'
import { useMounted } from '@/hooks'
import CountDown from '@/components/countdown'
import { Icons } from '@/components/icons'

export default function TwoFactorForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const [showResendCode, setShowResendCode] = useState<boolean>(true)

  const mounted = useMounted()

  const router = useRouter()
  const user = useCurrentUser()

  const { executeAsync: verifyTwoFactorCodeExecuteAsync, isExecuting: verifyTwoFactorCodeIsExecuting } = useAction(verifyTwoFactorCode)
  const { executeAsync: resendCodeExecuteAsync, isExecuting: resendCodeIsExecuting } = useAction(resendCode)

  if (!user && mounted) {
    setTimeout(() => {
      router.push('/signin')
    })
  }

  const form = useForm<VerifyTwoFactorCodeForm>({
    mode: 'onChange',
    defaultValues: { ...getFormDefaultValues(verifyTwoFactorCodeFormSchema), email: user ? user.email : '' },
    resolver: zodResolver(verifyTwoFactorCodeFormSchema)
  })

  const handleSubmit = async (data: VerifyTwoFactorCodeForm) => {
    setError('')
    setSuccess('')

    try {
      const response = await verifyTwoFactorCodeExecuteAsync(data)

      if (!response || !response.data) {
        setError('Failed to verify two factor code! Please try again later.')
        return
      }

      if (response.data.statusCode === 200) {
        router.replace(DEFAULT_LOGIN_REDIRECT)
        return
      }

      setError('Something went wrong! Please try again later.')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  const handleResendCode = async () => {
    setError('')
    setSuccess('')
    setShowResendCode(false)

    try {
      const response = await resendCodeExecuteAsync({ email: user?.email })

      if (!response || !response.data) {
        setError('Failed to resend code! Please try again later.')
        return
      }

      if (response.data.statusCode === 200) {
        setSuccess(response.data.message)
        return
      }

      if (response && response.data && (response.data.statusCode === 401 || response.data.statusCode === 500)) {
        setError(response.data.message)
        return
      }

      setError('Something went wrong! Please try again later.')
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <Form {...form} schema={verifyTwoFactorCodeFormSchema}>
      <form id='signin-form' className='w-full space-y-3 sm:w-[400px]' onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='mb-11 flex flex-col items-center justify-center gap-y-1'>
          <h1 className='text-center text-4xl font-extrabold'>
            Two-Factor <br /> Authentication
          </h1>
          <p className='text-center text-sm text-slate-400'>Enter the 6 digit code to verify your sign in.</p>
        </div>

        <Alert variant='error' message={error} />
        <Alert variant='success' message={success} />

        <TwoFactorFormFields />

        <div className='flex flex-col gap-y-5'>
          <CustomButton
            className='w-full'
            type='submit'
            variant='base-primary'
            isLoading={verifyTwoFactorCodeIsExecuting}
            loadingText='Verifying'
          >
            Verify
          </CustomButton>

          <span className='text-center text-sm text-slate-400'>
            {showResendCode ? (
              <>
                <span className='mr-1'>Haven’t received it? </span>
                <Button
                  className='h-auto p-0 font-normal text-slate-400 hover:text-primary'
                  variant='link'
                  onClick={() => handleResendCode()}
                >
                  Resend a new code
                </Button>
              </>
            ) : null}

            {!showResendCode ? (
              <>
                {resendCodeIsExecuting ? (
                  <div className='flex items-center justify-center'>
                    <Icons.spinner className='mr-1 h-4 w-4 animate-spin' />
                    <span>Resending...</span>
                  </div>
                ) : (
                  <>
                    <span className='mr-1'> You can resend a code again in</span>
                    <CountDown className='font-semibold text-teal-300' seconds={120} callback={() => setShowResendCode(true)} />
                  </>
                )}
              </>
            ) : null}
          </span>
        </div>
      </form>
    </Form>
  )
}
