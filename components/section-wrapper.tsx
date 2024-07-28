'use client'

import { useEffect } from 'react'

import { cn } from '@/lib'
import { useNavigationStore } from '@/hooks'

type SectionWrapperProps = {
  id?: string
  className?: string
  children: React.ReactNode
  enableSyncNav?: boolean
}

export default function SectionWrapper({ children, id, className, enableSyncNav }: SectionWrapperProps) {
  const { setHash } = useNavigationStore(['setHash'])

  const handleScroll = () => {
    const landingPageSections = Array.from(document.querySelectorAll('.landing-page-section')) as HTMLElement[]

    landingPageSections.forEach((section) => {
      if (window.scrollY + 72 >= section.offsetTop) {
        setHash(`#${section.id}`)
      }
    })
  }

  useEffect(() => {
    if (enableSyncNav) {
      window.addEventListener('scroll', handleScroll)

      const location = window.location
      if (location.hash) {
        setHash(location.hash)
      }
    }

    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id={id} className={cn('container flex flex-col gap-y-11 py-[72px]', className)}>
      {children}
    </section>
  )
}
