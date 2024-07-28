import { Icons } from '../icons'
import { Button as ShadcnButton, ButtonProps as ShadcnButtonProps } from '../ui/button'

type ButtonProps = ShadcnButtonProps & { isLoading?: boolean; loadingText?: string }

export default function Button({ isLoading, loadingText, children, ...props }: ButtonProps) {
  return (
    <ShadcnButton {...props} disabled={isLoading}>
      {isLoading && <Icons.spinner className='mr-2 size-4 animate-spin' />}
      {!isLoading && children}
      {isLoading && <span>{loadingText}...</span>}
    </ShadcnButton>
  )
}
