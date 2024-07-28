import { Hr, Section, Tailwind, Text } from '@react-email/components'

export default function Footer() {
  return (
    <Tailwind>
      <Hr className='mb-0 mt-6 h-[10px] w-full' />

      <Section>
        <Text className='mb-1.5 mt-1 text-center text-[12px] leading-[18px] text-slate-400'>Davao City, Davao Del Sur, Philippines</Text>

        <Text className='my-0 text-center text-[12px] leading-[18px] text-slate-400'>
          &copy; {new Date().getFullYear()}&nbsp;mond.dev, All rights reserved.
        </Text>
      </Section>
    </Tailwind>
  )
}
