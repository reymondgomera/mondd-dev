'use client'

import { forwardRef } from 'react'
import { Icons } from '../icons'
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from '../ui/button'

type ButtonProps = ShadcnButtonProps & { isLoading?: boolean; loadingText?: string }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, loadingText, children, disabled, ...props }, ref) => (
  <ShadcnButton ref={ref} disabled={disabled || isLoading} {...props}>
    {isLoading && <Icons.spinner className='mr-2 size-4 animate-spin' />}
    {!isLoading && children}
    {isLoading && <span>{loadingText}...</span>}
  </ShadcnButton>
))

Button.displayName = 'Button'

export default Button
