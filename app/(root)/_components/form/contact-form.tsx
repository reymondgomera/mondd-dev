'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ContactForm, contactFormSchema } from '@/schema'
import { getFormDefaultValues } from '@/lib'
import { Form } from '@/components/ui/form'
import ContactFormContent from './contact-form-content'
import { Button } from '@/components/ui/button'

export default function ContactForm() {
  const form = useForm({
    mode: 'onChange',
    defaultValues: getFormDefaultValues(contactFormSchema),
    resolver: zodResolver(contactFormSchema)
  })

  const handleSubmit = (data: ContactForm) => {}

  return (
    <Form {...form}>
      <form id='contact-form' className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <ContactFormContent />

        <div className='flex justify-end'>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
