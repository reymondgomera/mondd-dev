'use client'

import { useFormContext } from 'react-hook-form'

import { SignupForm } from '@/schema'
import InputField from '@/components/form/input-field'

export default function SignupFormFields() {
  const form = useFormContext<SignupForm>()

  return (
    <>
      <InputField control={form.control} name='name' label='Name' extendedProps={{ inputProps: { placeholder: 'Full Name' } }} />
      <InputField control={form.control} name='email' label='Email' extendedProps={{ inputProps: { placeholder: 'Email Address' } }} />
      <InputField
        control={form.control}
        name='password'
        label='Password'
        extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
      />
      <InputField
        control={form.control}
        name='confirmPassword'
        label='Confirm Password'
        extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
      />
    </>
  )
}
