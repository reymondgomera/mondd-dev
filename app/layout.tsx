import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

import './globals.css'
import { siteConfig } from '@/constant'
import { ThemeProvider } from '@/components/provider/theme-provider'
import ToastProvider from '@/components/provider/toast-provider'
import TailwindIndicatorProvider from '@/components/provider/tailwind-indicator-provider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className='h-full scroll-smooth' lang='en' suppressHydrationWarning>
      <body className={`${dmSans.className} h-full`}>
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

        <ToastProvider />
      </body>
    </html>
  )
}
