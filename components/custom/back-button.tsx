'use client'

import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from '../ui/button'

type BackButtonProps = Pick<ButtonProps, 'className' | 'variant'> & { label: string; href?: string }

export default function BackButton({ className, href, label, variant }: BackButtonProps) {
  const router = useRouter()

  function handleClick(href?: string) {
    if (href) {
      router.push(href)
      return
    }

    router.back()
  }

  return (
    <Button className={className} variant={variant} onClick={() => handleClick(href)}>
      {label}
    </Button>
  )
}
