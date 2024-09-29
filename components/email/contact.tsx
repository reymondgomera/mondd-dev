import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

import { ContactForm } from '@/schema'
import EmailContentWrapper from './_components/email-content-wrapper'
import Email from './_components/email'

type ContactEmailProps = {
  data: ContactForm
}

export default function ContactEmail({ data = { fullName: '', email: '', message: '' } }: ContactEmailProps) {
  return (
    <Email title='mondd.dev - Contact' preview='Contact form submission'>
      <EmailContentWrapper title='Inquiry'>
        <Section style={section}>
          <Text>Hello Rey Mond,</Text>

          <Text style={text}>
            <span style={fullName}>{data.fullName}</span>, has reach out to you. Below are the details of the inquiry:
          </Text>

          <ul style={info}>
            <li style={detail}>
              <span>Full Name:</span>
              <span style={detailValue}>{data.fullName}</span>
            </li>

            <li style={detail}>
              <span>Email:</span>
              <span style={detailValue}>{data.email}</span>
            </li>

            <li style={detail}>
              <span>Message:</span>
              <span style={detailValue}>{data.message}</span>
            </li>
          </ul>
        </Section>
      </EmailContentWrapper>
    </Email>
  )
}

const section = {
  paddingTop: '20px'
} satisfies React.CSSProperties

const text = {
  lineHeight: '20px'
} satisfies React.CSSProperties

const fullName = { fontWeight: 700 } satisfies React.CSSProperties

const info = {
  margin: '12px 0',
  listStyleType: 'none',
  paddingLeft: '0'
} satisfies React.CSSProperties

const detail = {
  display: 'block',
  fontSize: '14px',
  lineHeight: '20px'
} satisfies React.CSSProperties

const detailValue = {
  marginLeft: '8px',
  fontWeight: '600'
} satisfies React.CSSProperties
