'use client'

import { useFormContext } from 'react-hook-form'

import { ForgotPasswordForm } from '@/schema'
import InputField from '@/components/form/input-field'

export default function ForgotPasswordFormFields() {
  const form = useFormContext<ForgotPasswordForm>()

  return (
    <>
      <InputField control={form.control} name='email' label='Email' extendedProps={{ inputProps: { placeholder: 'Email Address' } }} />
    </>
  )
}
