import { Html } from '@react-email/html'
import { Preview } from '@react-email/preview'

import EmailHead from './email-head'

type EmailProps = {
  title: string
  preview: string
  children: React.ReactNode
  headChildren?: React.ReactNode
}

export default function Email({ title, preview, children, headChildren }: EmailProps) {
  return (
    <Html lang='en' dir='ltr'>
      <EmailHead title={title}>{headChildren}</EmailHead>

      <Preview>{preview}</Preview>

      {children}
    </Html>
  )
}
