'use client'

import { forwardRef } from 'react'
import { Icons } from '../icons'
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from '../ui/button'

type ButtonProps = ShadcnButtonProps & { isLoading?: boolean; loadingText?: string }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, loadingText, children, ...props }, ref) => (
  <ShadcnButton ref={ref} disabled={isLoading} {...props}>
    {isLoading && <Icons.spinner className='mr-2 size-4 animate-spin' />}
    {!isLoading && children}
    {isLoading && <span>{loadingText}...</span>}
  </ShadcnButton>
))

export default Button
