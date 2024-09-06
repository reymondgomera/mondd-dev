import type { Metadata } from 'next'
import { auth } from '@/auth'
import { DM_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import Script from 'next/script'

import { siteConfig } from '@/constant'
import { ThemeProvider } from '@/components/provider/theme-provider'
import ToastProvider from '@/components/provider/toast-provider'
import TailwindIndicatorProvider from '@/components/provider/tailwind-indicator-provider'

import './styles/index.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html className='h-full scroll-smooth' lang='en' suppressHydrationWarning>
      <body className={`${dmSans.className} h-full`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            forcedTheme='dark'
            enableSystem
            disableTransitionOnChange
            storageKey='mond-dev-theme'
          >
            {children}

            <TailwindIndicatorProvider />
          </ThemeProvider>
        </SessionProvider>

        <ToastProvider />
      </body>

      <Script id='rich-text-edit-script'>
        {`
          // rich-text-editor image fallback on error
          const handleError = (e) => {
            if (e) e.alt = 'Image not found'
          }
        `}
      </Script>
    </html>
  )
}
