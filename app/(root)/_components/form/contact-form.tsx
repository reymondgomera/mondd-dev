'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'

import { contactFormSchema } from '@/schema'
import type { ContactForm } from '@/schema'
import { getFormDefaultValues } from '@/lib'
import { Form } from '@/components/ui/form'
import { contactMe } from '@/actions'
import ContactFormFields from './contact-form-fields'
import Button from '@/components/custom/button'

export default function ContactForm() {
  const { executeAsync, isExecuting } = useAction(contactMe)

  const form = useForm<ContactForm>({
    mode: 'onChange',
    defaultValues: getFormDefaultValues(contactFormSchema),
    resolver: zodResolver(contactFormSchema)
  })

  const handleSubmit = async (data: ContactForm) => {
    try {
      const response = await executeAsync(data)

      if (!response || !response.data) {
        toast.error('Failed to submit the inquiry. Please try again later.')
        return
      }

      if (response.data.statusCode === 200) {
        toast.success('The inquiry has been successfully submitted.')
        form.reset()
        return
      }

      toast.error('Something went wrong! Please try again later.')
    } catch (err: any) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <Form {...form} schema={contactFormSchema}>
      <form id='contact-form' className='space-y-3' onSubmit={form.handleSubmit(handleSubmit)}>
        <ContactFormFields />

        <div className='flex justify-end'>
          <Button type='submit' variant='primary' isLoading={isExecuting} loadingText='Submitting'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
