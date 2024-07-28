'use client'

import { useFormContext } from 'react-hook-form'

import { NewPasswordForm } from '@/schema'
import InputField from '@/components/form/input-field'

export default function NewPasswordFormFields() {
  const form = useFormContext<NewPasswordForm>()

  return (
    <>
      <InputField
        control={form.control}
        name='password'
        label='New Password'
        extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
      />
      <InputField
        control={form.control}
        name='confirmPassword'
        label='Confirm New Password'
        extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
      />
    </>
  )
}
