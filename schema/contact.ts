import { z } from 'zod'

//* Schemas *//
export const contactFormSchema = z.object({
  fullName: z.string().min(1, { message: 'Please enter a full name.' }),
  email: z.string().min(1, { message: 'Please enter an email address.' }).email(),
  message: z.string().min(1, { message: 'Please enter a message.' })
})

//* Types *//
export type ContactForm = z.infer<typeof contactFormSchema>
