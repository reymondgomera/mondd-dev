import { useFormContext } from 'react-hook-form'

import { VerifyTwoFactorCodeForm } from '@/schema'
import InputField from '@/components/form/input-field'

export default function TwoFactorFormFields() {
  const form = useFormContext<VerifyTwoFactorCodeForm>()

  return (
    <>
      <InputField
        control={form.control}
        name='code'
        label='Code'
        extendedProps={{ inputProps: { type: 'number', placeholder: '6-Digit Code' } }}
      />
    </>
  )
}
