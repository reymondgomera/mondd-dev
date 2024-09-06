'use client'

import { format } from 'date-fns'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormExtendedProps } from '@/types'
import { cn, getClassName, omitClassName } from '@/lib'
import { Calendar, CalendarProps } from '../ui/calendar'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverContentProps, PopoverTrigger } from '../ui/popover'
import { Button, ButtonProps } from '../ui/button'
import { Icons } from '../icons'

type ExtendedProps = FormExtendedProps & {
  disabledFuture?: boolean
  calendarProps?: CalendarProps
  buttonProps?: ButtonProps
  popoverContentProps?: PopoverContentProps
}

type DatePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
}

function renderValue(value: Date | Date[] | { from: Date | undefined; to: Date | undefined } | undefined) {
  if (!value) return null

  if (Array.isArray(value)) return <time className='truncate'>{value.map((date) => format(date, 'PP')).join(', ')}</time>

  if (typeof value === 'object' && 'from' in value && 'to' in value) {
    const range = value as { from: Date | undefined; to: Date }
    return <time>{`${range.from ? `${format(range.from, 'PP')} - ` : ''}${range.to ? format(range.to, 'PP') : ''}`}</time>
  }

  if (value instanceof Date) return <time className='truncate'>{format(value, 'PP')}</time>

  return null
}

export default function DatePickerField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  extendedProps
}: DatePickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn('space-y-2', getClassName(extendedProps?.itemProps))} {...omitClassName(extendedProps?.itemProps)}>
            <FormLabel className={cn('space-x-1', getClassName(extendedProps?.labelProps))} {...omitClassName(extendedProps?.labelProps)}>
              {label}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className={cn(
                      'flex w-full justify-start pl-3 text-left font-normal',
                      getClassName(extendedProps?.buttonProps),
                      !field.value && 'text-muted-foreground'
                    )}
                    {...omitClassName(extendedProps?.buttonProps)}
                  >
                    <Icons.calendar className='mr-2 size-4' />
                    {field.value ? renderValue(field.value) : <span>Pick a date</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className={cn('w-auto p-0', getClassName(extendedProps?.popoverContentProps))}
                align='start'
                {...omitClassName(extendedProps?.popoverContentProps)}
              >
                <Calendar
                  {...extendedProps?.calendarProps}
                  initialFocus
                  mode={extendedProps?.calendarProps?.mode}
                  defaultMonth={field.value}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={extendedProps?.disabledFuture ? (date: Date) => date > new Date() || date < new Date('1900-01-01') : false}
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    />
  )
}
