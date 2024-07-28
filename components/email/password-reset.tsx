import { formatRelative } from 'date-fns'

import { Tailwind, Html, Head, Preview, Section, Text, Button, Link } from '@react-email/components'
import EmailContentWrapper from './_components/content-wrapper'

type PasswordResetEmailProps = {
  token: string
  expires: Date
}

export default function PasswordResetEmail({ token = '', expires = new Date() }: PasswordResetEmailProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const resetLink = `${BASE_URL}/new-password?token=${token}`

  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>mond.dev - Forgot Password</title>
      </Head>

      <Preview>Set a new Password</Preview>

      <Tailwind>
        <EmailContentWrapper title='Reset your password'>
          <Text className='mx-auto block w-[380px] text-center text-sm'>
            If you've lost your password or wish to reset it, please use the link below to get started.
          </Text>

          <Section className='py-5 text-center'>
            <Button href={resetLink} target='_blank' className='rounded-md bg-[#131C26] px-4 py-2 text-sm font-semibold text-white'>
              Reset Password
            </Button>
          </Section>

          <Section className='flex items-center justify-center text-sm'>
            <Text className='mb-1 block w-full text-center'>or copy and paste this URL into your browser:</Text>
            <Link className='block w-full text-center' target='_blank' href={resetLink}>
              {resetLink}
            </Link>
            <Text className='mb-0 mt-2 block w-full text-center text-sm text-slate-500'>
              For security reasons, the link will expire {formatRelative(expires, new Date())}
            </Text>
          </Section>

          <Text className='mx-auto w-[400px] text-center text-sm text-slate-500'>
            If you did not request a password reset, please ignore this email and your password will remain unchanged.
          </Text>
        </EmailContentWrapper>
      </Tailwind>
    </Html>
  )
}
