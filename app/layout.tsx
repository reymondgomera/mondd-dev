import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { siteConfig } from '@/constant'
import { ThemeProvider } from '@/components/provider/theme-provider'
import ToastProvider from '@/components/provider/toast-provider'
import TailwindIndicatorProvider from '@/components/provider/tailwind-indicator-provider'

import './styles/index.css'
import 'photoswipe/dist/photoswipe.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.baseUrl),
  keywords: siteConfig.keywords,
  creator: siteConfig.creator
}

export default async function RootLayout({
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

          <SpeedInsights />
          <TailwindIndicatorProvider />
        </ThemeProvider>

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
