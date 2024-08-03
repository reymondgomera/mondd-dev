'use client'

import ThemeToggle from '@/components/theme-toggle'

import { useTheme } from 'next-themes'
import UserButton from './user-button'
import Link from 'next/link'
import MobileToggle from './mobile-toggle'

export default function Navbar() {
  const { theme } = useTheme()

  return (
    <header className='h-[80px] w-full'>
      <nav className='flex h-full w-full items-center justify-between py-5'>
        <Link href='/'>
          <img src={theme === 'light' ? '/images/logo-text-dark.svg' : '/images/logo-text-default.svg'} alt='logo' className='h-4 w-auto' />
        </Link>

        <div className='flex items-center gap-x-3'>
          <ThemeToggle />
          <UserButton />
          <MobileToggle />
        </div>
      </nav>
    </header>
  )
}
