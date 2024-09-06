'use server'

import { action, resend } from '@/lib'
import { contactFormSchema } from '@/schema'
import ContactEmail from '@/components/email/contact'
import { getServerActionError, returnServerActionError, returnServerActionSuccess } from '@/lib/server-action'

const contactMe = action.schema(contactFormSchema).action(async ({ parsedInput: data }) => {
  try {
    const emailData = await resend.emails.send({
      from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
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

      if (!contactData.data) return returnServerActionError({ code: 500, message: 'Failed to create contact.', action: 'CONTACT_ME' })

      return returnServerActionSuccess({ message: 'The inquiry has been successfully submitted.' })
    }

    return returnServerActionError({ code: 500, message: 'Failed to send email.', action: 'CONTACT_ME' })
  } catch (err) {
    return getServerActionError(err, 'CONTACT_ME')
  }
})

export { contactMe }
