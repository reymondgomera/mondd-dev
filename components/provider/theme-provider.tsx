'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { usePathname } from 'next/navigation'
import { lightModeRoutes } from '@/constant'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname()
  const forceThemeFromPathname = lightModeRoutes.includes(pathname) ? 'light' : undefined

  return (
    <NextThemesProvider {...props} forcedTheme={forceThemeFromPathname}>
      {children}
    </NextThemesProvider>
  )
}
