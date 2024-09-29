import { Hr } from '@react-email/hr'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

export default function Footer() {
  return (
    <footer>
      <Hr style={hr} />

      <Section>
        <Text style={addressText}>Davao City, Davao Del Sur, Philippines</Text>
        <Text style={copyrightText}>&copy; {new Date().getFullYear()}&nbsp;mondd.dev, All rights reserved.</Text>
      </Section>
    </footer>
  )
}

const hr = {
  margin: '24px 0 0 0',
  height: '10px',
  width: '100%'
} satisfies React.CSSProperties

const text = {
  textAlign: 'center',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#94A3B8'
} satisfies React.CSSProperties

const addressText = {
  ...text,
  margin: '4 0 6px 0'
} satisfies React.CSSProperties

const copyrightText = {
  ...text,
  margin: '0'
} satisfies React.CSSProperties
