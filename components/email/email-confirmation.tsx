import { formatRelative } from 'date-fns'

import { Tailwind, Html, Head, Body, Preview, Container, Section, Img, Heading, Text, Button, Link } from '@react-email/components'
import Footer from './_components/footer'
import EmailContentWrapper from './_components/content-wrapper'

type EmailConfirmationEmailProps = {
  token: string
  expires: Date
}

export default function EmailConfirmationEmail({ token = '', expires = new Date() }: EmailConfirmationEmailProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const confirmationLink = `${BASE_URL}/email-verification?token=${token}`

  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>mond.dev - Email Confirmation</title>
      </Head>

      <Preview>Confirm your email address</Preview>

      <Tailwind>
        <EmailContentWrapper title='Confirm your email'>
          <Section className='py-5 text-center'>
            <Button href={confirmationLink} target='_blank' className='rounded-md bg-[#131C26] px-4 py-2 text-sm font-semibold text-white'>
              Confirm Email Address
            </Button>
          </Section>

          <Section className='flex items-center justify-center text-sm'>
            <Text className='mb-1 block w-full text-center'>or copy and paste this URL into your browser:</Text>
            <Link className='block w-full text-center' target='_blank' href={confirmationLink}>
              {confirmationLink}
            </Link>
            <Text className='mb-0 mt-2 block w-full text-center text-sm text-slate-500'>
              For security reasons, the link will expire {formatRelative(expires, new Date())}
            </Text>
          </Section>
        </EmailContentWrapper>
      </Tailwind>
    </Html>
  )
}
