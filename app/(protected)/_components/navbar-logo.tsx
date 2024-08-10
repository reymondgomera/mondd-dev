'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function NavbarLogo() {
  const { theme } = useTheme()

  return (
    <Link href='/'>
      <img src={theme === 'light' ? '/images/logo-text-dark.svg' : '/images/logo-text-default.svg'} alt='logo' className='h-4 w-auto' />
    </Link>
  )
}
