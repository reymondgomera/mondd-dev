'use client'

import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Icons } from './icons'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Icons.sun className='size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' aria-hidden='true' />
      <Icons.moon className='absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' aria-hidden='true' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
