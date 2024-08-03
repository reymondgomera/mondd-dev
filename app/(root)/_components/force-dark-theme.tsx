'use client'

import { useTheme } from 'next-themes'

export default function ForceDarkTheme() {
  const { setTheme, theme } = useTheme()

  if (theme !== 'dark') setTheme('dark')

  return null
}
