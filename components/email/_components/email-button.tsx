import { Button } from '@react-email/button'
import { HTMLAttributeAnchorTarget } from 'react'

type EmailButtonProps = {
  text: string
  href: string
  target?: HTMLAttributeAnchorTarget
}

export default function EmailButton({ text, href, target }: EmailButtonProps) {
  return (
    <Button href={href} target={target} style={button}>
      {text}
    </Button>
  )
}

const button = {
  borderRadius: '6px',
  backgroundColor: '#131C26',
  padding: '8px 16px',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#FFFFFF',
  fontWeight: '600'
} satisfies React.CSSProperties
