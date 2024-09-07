import { formatRelative } from 'date-fns'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Link } from '@react-email/link'

import EmailContentWrapper from './_components/email-content-wrapper'
import Email from './_components/email'
import EmailButton from './_components/email-button'

type EmailConfirmationEmailProps = {
  token: string
  expires: Date
}

export default function EmailConfirmationEmail({ token = '', expires = new Date() }: EmailConfirmationEmailProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const confirmationLink = `${BASE_URL}/email-verification?token=${token}`

  return (
    <Email title='mond.dev - Email Confirmation' preview='Confirm your email address'>
      <EmailContentWrapper title='Confirm your email'>
        <Section style={confirmButtonContainer}>
          <EmailButton text='Confirm Email Address' href={confirmationLink} target='_blank' />
        </Section>

        <Section style={confirmLinkContainer}>
          <Text style={description}>or copy and paste this URL into your browser:</Text>
          <Link style={text} target='_blank' href={confirmationLink}>
            {confirmationLink}
          </Link>
          <Text style={expire}>For security reasons, the link will expire {formatRelative(expires, new Date())}</Text>
        </Section>
      </EmailContentWrapper>
    </Email>
  )
}

const confirmButtonContainer = {
  padding: '20px 0',
  textAlign: 'center'
} satisfies React.CSSProperties

const confirmLinkContainer = {
  fontSize: '14px',
  lineHeight: '20px'
} satisfies React.CSSProperties

const text = {
  display: 'inline-block',
  width: '100%',
  textAlign: 'center'
} satisfies React.CSSProperties

const description = {
  ...text,
  marginBottom: '4px'
} satisfies React.CSSProperties

const expire = {
  ...text,
  margin: '4px 0 0 0',
  color: '#64748B'
} satisfies React.CSSProperties
