import { formatRelative } from 'date-fns'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import { Link } from '@react-email/link'

import EmailContentWrapper from './_components/email-content-wrapper'
import Email from './_components/email'
import EmailButton from './_components/email-button'

type PasswordResetEmailProps = {
  token: string
  expires: Date
}

export default function PasswordResetEmail({ token = '', expires = new Date() }: PasswordResetEmailProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const resetLink = `${BASE_URL}/new-password?token=${token}`

  return (
    <Email title='mond.dev - Forgot Password' preview='Set a new Password'>
      <EmailContentWrapper title='Reset your password'>
        <Text style={instructions}>If you've lost your password or wish to reset it, please use the link below to get started.</Text>

        <Section style={resetButtonContainer}>
          <EmailButton text='Reset Password' href={resetLink} target='_blank' />
        </Section>

        <Section style={resetLinkContainer}>
          <Text style={description}>or copy and paste this URL into your browser:</Text>
          <Link style={text} target='_blank' href={resetLink}>
            {resetLink}
          </Link>
          <Text style={expire}>For security reasons, the link will expire {formatRelative(expires, new Date())}</Text>
        </Section>

        <Text style={remind}>
          If you did not request a password reset, please ignore this email and your password will remain unchanged.
        </Text>
      </EmailContentWrapper>
    </Email>
  )
}

const resetButtonContainer = {
  padding: '20px 0',
  textAlign: 'center'
} satisfies React.CSSProperties

const instructions = {
  width: '380px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px auto'
} satisfies React.CSSProperties

const resetLinkContainer = {
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

const remind = {
  ...text,
  width: '400px',
  margin: '16px auto 0 auto',
  color: '#64748B'
} satisfies React.CSSProperties
