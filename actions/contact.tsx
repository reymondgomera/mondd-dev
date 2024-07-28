'use server'

import createError from 'http-errors'

import { action, resend } from '@/lib'
import { contactFormSchema } from '@/schema'
import { HttpSuccess } from '@/types'
import ContactEmail from '@/components/email/contact'
import { resolveAppError } from '@/lib/error'

const contactMe = action.schema(contactFormSchema).action(async ({ parsedInput: data }) => {
  try {
    const emailData = await resend.emails.send({
      from: 'mond.dev <onboarding@resend.dev>',
      to: process.env.RESEND_EMAIL_RECEIVER as string,
      subject: "Let's Talk About Opportunity",
      react: <ContactEmail data={data} />,
      reply_to: process.env.RESEND_EMAIL_RECEIVER
    })

    if (emailData.data) {
      const contactData = await resend.contacts.create({
        email: data.email,
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
        unsubscribed: false
      })

      if (!contactData.data) throw createError(500, 'Failed to create contact.', { action: 'CONTACT_ME' })

      return { statusCode: 200 } as HttpSuccess
    }

    throw createError(500, 'Failed to send email.', { action: 'CONTACT_ME' })
  } catch (err) {
    throw resolveAppError(err, 'CONTACT_ME')
  }
})

export { contactMe }
