import { useFormContext } from 'react-hook-form'

import { ContactForm } from '@/schema'
import InputField from '@/components/form/input-field'
import TextAreaField from '@/components/form/textarea-field'

export default function ContactFormFields() {
  const form = useFormContext<ContactForm>()

  return (
    <>
      <InputField control={form.control} name='fullName' label='Full Name' extendedProps={{ inputProps: { placeholder: 'Full Name' } }} />
      <InputField control={form.control} name='email' label='Email' extendedProps={{ inputProps: { placeholder: 'Email Address' } }} />
      <TextAreaField
        control={form.control}
        name='message'
        label='Message'
        extendedProps={{ textAreaProps: { placeholder: 'Message', rows: 12 } }}
      />
    </>
  )
}
