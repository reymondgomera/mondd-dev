import { useFormContext } from 'react-hook-form'

import { ContactForm } from '@/schema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import AsteriskRequired from '@/components/asterisk-required'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function ContactFormContent() {
  const form = useFormContext<ContactForm>()

  return (
    <>
      <FormField
        control={form.control}
        name='fullName'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='space-x-1'>
              <span>Full Name</span> <AsteriskRequired />
            </FormLabel>
            <FormControl>
              <Input placeholder='Full Name' {...field} />
            </FormControl>
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='space-x-1'>
              <span>Email Address</span> <AsteriskRequired />
            </FormLabel>
            <FormControl>
              <Input placeholder='Email Address' {...field} />
            </FormControl>
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='space-x-1'>
              <span>Email Address</span> <AsteriskRequired />
            </FormLabel>
            <FormControl>
              <Textarea className='h-60' placeholder='Email Address' {...field} />
            </FormControl>
            <FormMessage className='text-rose-500' />
          </FormItem>
        )}
      />
    </>
  )
}
