import { cn, getClassName, omitClassName } from '@/lib'
import { Card as ShadcnCard, CardTitle, CardHeader, CardDescription, CardContent } from '../ui/card'

type ExtendedProps = {
  cardProps?: React.ComponentPropsWithoutRef<typeof ShadcnCard>
  cardHeaderProps?: React.ComponentPropsWithoutRef<typeof CardHeader>
  cardTitleProps?: React.ComponentPropsWithoutRef<typeof CardTitle>
  cardDescriptionProps?: React.ComponentPropsWithoutRef<typeof CardDescription>
  cardContentProps?: React.ComponentPropsWithoutRef<typeof CardContent>
}

type CardProps = {
  title?: string
  description?: string
  extendedProps?: ExtendedProps
  children: React.ReactNode
}

export default function Card({ title, description, extendedProps, children }: CardProps) {
  return (
    <ShadcnCard className={cn('h-full w-full', getClassName(extendedProps?.cardProps))} {...omitClassName(extendedProps?.cardProps)}>
      <CardHeader {...extendedProps?.cardHeaderProps}>
        {title ? (
          <CardTitle
            className={cn('text-sm font-medium', getClassName(extendedProps?.cardTitleProps))}
            {...omitClassName(extendedProps?.cardTitleProps)}
          >
            {title}
          </CardTitle>
        ) : null}

        {description ? <CardDescription {...extendedProps?.cardDescriptionProps}>{description}</CardDescription> : null}
      </CardHeader>

      <CardContent
        className={cn('space-y-2', getClassName(extendedProps?.cardContentProps))}
        {...omitClassName(extendedProps?.cardContentProps)}
      >
        {children}
      </CardContent>
    </ShadcnCard>
  )
}
