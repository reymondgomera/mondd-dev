import { formatRelative } from 'date-fns'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

import EmailContentWrapper from './_components/email-content-wrapper'
import Email from './_components/email'

type TwoFactorAuthEmailProps = {
  token: string
  expires: Date
}

export default function TwoFactorAuthEmail({ token = '', expires = new Date() }: TwoFactorAuthEmailProps) {
  return (
    <Email title='mondd.dev - 2 Factor Authentication' preview='Here is your 2-factor authentication code'>
      <EmailContentWrapper title='2 factor authentication code'>
        <Text style={instructions}>Use the code below to complete your authentication.</Text>

        <Section style={codeContainer}>
          <Text style={code}>{token}</Text>
        </Section>

        <Text style={expire}>For security reasons, the link will expire {formatRelative(expires, new Date())}</Text>

        <Text style={remind}>If you believe you have received this email in error, please contact at reymondgomera24@gmail.com</Text>
      </EmailContentWrapper>
    </Email>
  )
}

const instructions = {
  width: '380px',
  textAlign: 'center',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px auto'
} satisfies React.CSSProperties

const codeContainer = {
  padding: '20px 0',
  textAlign: 'center'
} satisfies React.CSSProperties

const code = {
  margin: '0 auto',
  padding: '8px 16px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '600',
  width: 'fit-content',
  borderRadius: '6px',
  letterSpacing: '0.1em',
  backgroundColor: '#E2E8F0'
} satisfies React.CSSProperties

const text = {
  display: 'inline-block',
  width: '100%',
  textAlign: 'center'
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
