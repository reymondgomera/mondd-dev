'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { cn, getClassName, omitClassName } from '@/lib'
import { FormExtendedProps } from '@/types'
import { FormField, FormItem, FormLabel, FormDescription, FormControl } from '../ui/form'
import { Switch, SwitchProps } from '../ui/switch'

type ExtendedProps = FormExtendedProps & { switchProps?: SwitchProps }

export type SwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
  layout?: 'default' | 'wide' | 'centered'
}

export default function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  layout = 'default',
  extendedProps
}: SwitchFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        switch (layout) {
          case 'wide':
            return (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel noAsterisk {...extendedProps?.labelProps}>
                    {label}
                  </FormLabel>
                  {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} {...extendedProps?.switchProps} />
                </FormControl>
              </FormItem>
            )

          case 'centered':
            return (
              <FormItem className='flex flex-col items-center justify-center rounded-lg border p-4'>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} {...extendedProps?.switchProps} />
                </FormControl>
                <div className='space-y-0.5'>
                  <FormLabel
                    className={cn('inline-block w-full text-center', getClassName(extendedProps?.labelProps))}
                    noAsterisk
                    {...omitClassName(extendedProps?.labelProps)}
                  >
                    {label}
                  </FormLabel>
                  {description && (
                    <FormDescription
                      className={cn('text-center', getClassName(extendedProps?.descriptionProps))}
                      {...omitClassName(extendedProps?.descriptionProps)}
                    >
                      {description}
                    </FormDescription>
                  )}
                </div>
              </FormItem>
            )

          default:
            return (
              <FormItem className={cn('space-x-2', getClassName(extendedProps?.itemProps))} {...omitClassName(extendedProps?.itemProps)}>
                <div className='flex items-center gap-2'>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} {...extendedProps?.switchProps} />
                  </FormControl>
                  <FormLabel noAsterisk {...extendedProps?.labelProps}>
                    {label}
                  </FormLabel>
                </div>
                {description && (
                  <FormDescription
                    className={cn('!ml-0', getClassName(extendedProps?.descriptionProps))}
                    {...omitClassName(extendedProps?.descriptionProps)}
                  >
                    {description}
                  </FormDescription>
                )}
              </FormItem>
            )
        }
      }}
    />
  )
}
