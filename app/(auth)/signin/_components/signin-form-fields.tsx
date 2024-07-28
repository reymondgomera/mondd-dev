'use client'

import { useFormContext } from 'react-hook-form'
import Link from 'next/link'

import { SigninForm } from '@/schema'
import InputField from '@/components/form/input-field'
import { Button } from '@/components/ui/button'

export default function SigninFormFields() {
  const form = useFormContext<SigninForm>()

  return (
    <>
      <InputField control={form.control} name='email' label='Email' extendedProps={{ inputProps: { placeholder: 'Email Address' } }} />
      <div>
        <InputField
          control={form.control}
          name='password'
          label='Password'
          extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
        />
        <Button asChild className='px-0 font-normal' variant='link'>
          <Link href='/forgot-password'>Forgot Password?</Link>
        </Button>
      </div>
    </>
  )
}
