import { formatRelative } from 'date-fns'

import { Tailwind, Html, Head, Preview, Section, Text } from '@react-email/components'
import EmailContentWrapper from './_components/content-wrapper'

type TwoFactorAuthEmailProps = {
  token: string
  expires: Date
}

export default function TwoFactorAuthEmail({ token = '', expires = new Date() }: TwoFactorAuthEmailProps) {
  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>mond.dev - 2 Factor Authentication</title>
      </Head>

      <Preview>Here is your 2-factor authentication code</Preview>

      <Tailwind>
        <EmailContentWrapper title='2 factor authentication code'>
          <Text className='mx-auto block w-[380px] text-center text-sm'>Use the code below to complete your authentication.</Text>

          <Section className='py-5 text-center'>
            <Text className='m-0 mx-auto w-fit rounded-md bg-slate-200 px-4 py-2 text-sm font-semibold tracking-widest'>{token}</Text>
          </Section>

          <Text className='mb-0 block w-full text-center text-sm text-slate-500'>
            For security reasons, the link will expire {formatRelative(expires, new Date())}
          </Text>

          <Text className='mx-auto w-[400px] text-center text-sm text-slate-500'>
            If you believe you have received this email in error, please contact at reymondgomera24@gmail.com
          </Text>
        </EmailContentWrapper>
      </Tailwind>
    </Html>
  )
}
