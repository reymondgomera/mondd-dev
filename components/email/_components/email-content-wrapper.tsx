import { Body } from '@react-email/body'
import { Container } from '@react-email/container'
import { Section } from '@react-email/section'
import { Img } from '@react-email/img'
import { Heading } from '@react-email/heading'

import Footer from './footer'
import { siteConfig } from '@/constant'

type EmailContentWrapperProps = {
  title: string
  children: React.ReactNode
}

export default function EmailContentWrapper({ children, title }: EmailContentWrapperProps) {
  return (
    <Body style={body}>
      <Container style={container}>
        <Section style={section}>
          <Img style={img} src={`${siteConfig.baseUrl}/images/logo.png`} title='Logo' alt='Logo' />
          <Heading style={heading}>{title}</Heading>
        </Section>

        {children}

        <Footer />
      </Container>
    </Body>
  )
}

const body = {
  backgroundColor: '#FFFFFF',
  color: '#1E293B',
  fontFamily: 'DM Sans, sans-serif'
} satisfies React.CSSProperties

const container = {
  margin: '40px auto',
  padding: '20px 40px',
  maxWidth: '500px',
  border: '1px solid #E2E8F0',
  borderRadius: '4px'
} satisfies React.CSSProperties

const section = {
  marginTop: '32px'
} satisfies React.CSSProperties

const img = {
  margin: '0 auto',
  display: 'block',
  height: '56px',
  width: '56px'
} satisfies React.CSSProperties

const heading = {
  margin: '30px 0 16px 0',
  padding: '0',
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '700'
} satisfies React.CSSProperties
