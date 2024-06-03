import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'mond.dev',
  description: 'A professional portfolio website of Rey Mond Gomera, a Filipino Full Stack Developer'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${dmSans.className} h-screen`}>{children}</body>
    </html>
  )
}
