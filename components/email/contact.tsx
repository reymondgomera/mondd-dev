import { Tailwind, Html, Head, Preview, Section, Text } from '@react-email/components'

import { ContactForm } from '@/schema'
import EmailContentWrapper from './_components/content-wrapper'

type ContactEmailProps = {
  data: ContactForm
}

export default function ContactEmail({ data = { fullName: '', email: '', message: '' } }: ContactEmailProps) {
  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>mond.dev - Contact</title>
      </Head>

      <Preview>Contact form submission</Preview>

      <Tailwind>
        <EmailContentWrapper title='Inquiry'>
          <Section className='pt-5'>
            <Text className=''>Hello Rey Mond,</Text>

            <Text className='leading-5'>
              <span className='font-bold'>{data.fullName}</span>, has reach out to you. Below are the details of the inquiry:
            </Text>

            <ul className='my-3 list-none pl-0'>
              <li className='block text-sm'>
                <span>Full Name:</span>
                <span className='ml-2 font-semibold'>{data.fullName}</span>
              </li>

              <li className='block text-sm'>
                <span>Email:</span>
                <span className='ml-2 font-semibold'>{data.email}</span>
              </li>

              <li className='block text-sm'>
                <span>Message:</span>
                <span className='ml-2 font-semibold'>{data.message}</span>
              </li>
            </ul>
          </Section>
        </EmailContentWrapper>
      </Tailwind>
    </Html>
  )
}
