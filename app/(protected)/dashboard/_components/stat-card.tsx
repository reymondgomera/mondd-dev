import { TrendData, TrendType } from '@/types'
import { cn, getClassName, omitClassName } from '@/lib'
import { Icon as CardIcon, IconProps } from '@/components/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TrendValue from './trend-value'

type ExtendedProps = {
  iconProps?: IconProps
  cardProps?: React.ComponentPropsWithoutRef<typeof Card>
  cardHeaderProps?: React.ComponentPropsWithoutRef<typeof CardHeader>
  cardTitleProps?: React.ComponentPropsWithoutRef<typeof CardTitle>
  cardDescriptionProps?: React.ComponentPropsWithoutRef<typeof CardDescription>
  cardContentProps?: React.ComponentPropsWithoutRef<typeof CardContent>
}

type StatCardProps = {
  title?: string
  description?: string
  value: string
  icon?: CardIcon
  trendType?: TrendType
  trendData?: TrendData
  extendedProps?: ExtendedProps
}

export default function StatCard({
  title,
  description,
  value,
  icon: Icon,
  trendType = 'neutral',
  trendData,
  extendedProps
}: StatCardProps) {
  return (
    <Card className={cn('h-full w-full', getClassName(extendedProps?.cardProps))} {...omitClassName(extendedProps?.cardProps)}>
      <CardHeader
        className={cn('flex flex-row items-center justify-between space-y-0 pb-2', getClassName(extendedProps?.cardHeaderProps))}
        {...omitClassName(extendedProps?.cardHeaderProps)}
      >
        <div className='flex flex-col'>
          {title ? (
            <CardTitle
              className={cn('text-sm font-medium', getClassName(extendedProps?.cardTitleProps))}
              {...omitClassName(extendedProps?.cardTitleProps)}
            >
              {title}
            </CardTitle>
          ) : null}
          {description ? <CardDescription {...extendedProps?.cardDescriptionProps}>{description}</CardDescription> : null}
        </div>

        {Icon ? (
          <Icon className={cn('h-4 w-4', getClassName(extendedProps?.iconProps))} {...omitClassName(extendedProps?.iconProps)} />
        ) : null}
      </CardHeader>
      <CardContent
        className={cn('space-y-2', getClassName(extendedProps?.cardContentProps))}
        {...omitClassName(extendedProps?.cardContentProps)}
      >
        <div className='text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>{value}</div>
        {<TrendValue type={trendType} data={trendData} />}
      </CardContent>
    </Card>
  )
}
