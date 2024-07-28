import { Body, Container, Heading, Img, Section } from '@react-email/components'
import Footer from './footer'

type EmailContentWrapperProps = {
  title: string
  children: React.ReactNode
}

export default function EmailContentWrapper({ children, title }: EmailContentWrapperProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

  return (
    <Body className='bg-white font-sans text-slate-800'>
      <Container className='mx-auto my-[40px] max-w-[560px] rounded border border-solid border-slate-200 px-10 py-5'>
        <Section className='mt-8'>
          <Img className='mx-auto my-0 block h-14 w-14' src={`${BASE_URL}/images/logo.svg`} title='Logo' alt='Logo' />
          <Heading className='mx-0 mb-[16px] mt-[30px] p-0 text-center text-2xl font-bold'>{title}</Heading>
        </Section>

        {children}

        <Footer />
      </Container>
    </Body>
  )
}
