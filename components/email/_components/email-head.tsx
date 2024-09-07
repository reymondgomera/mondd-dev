import { Head } from '@react-email/head'

type EmailHeadProps = {
  title: string
  children?: React.ReactNode
}

export default function EmailHead({ title, children }: EmailHeadProps) {
  return (
    <Head>
      <title>{title}</title>

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'
        rel='stylesheet'
      />

      {children}
    </Head>
  )
}
