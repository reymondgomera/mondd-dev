'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { cn } from '@/lib'
import { FormExtendedProps } from '@/types'
import { Icons } from '../icons'
import { Button, ButtonProps } from '../ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverContentProps, PopoverTrigger } from '../ui/popover'
import { format } from 'date-fns'
import MonthPicker, { MonthPickerProps } from '../month-picker'

type ExtendedProps = FormExtendedProps & {
  monthPickerProps?: MonthPickerProps
  buttonProps?: ButtonProps
  popoverContentProps?: PopoverContentProps
}

type MonthPickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
}

//? if className is passed among the properties of extendedProps, the specified or default className will be overridden

function renderValue(value: Date | undefined) {
  if (!value) return null

  return <time className='truncate'>{format(value, 'MMM yyyy')}</time>
}

export default function MonthPickerField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  extendedProps
}: MonthPickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className='space-y-2' {...extendedProps?.itemProps}>
            <FormLabel className='space-x-1' {...extendedProps?.labelProps}>
              {label}
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className={cn('flex w-full justify-start pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    {...extendedProps?.buttonProps}
                  >
                    <Icons.calendar className='mr-2 size-4' />
                    {field.value ? renderValue(field.value) : <span>Pick a date</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start' {...extendedProps?.popoverContentProps}>
                <MonthPicker
                  {...extendedProps?.monthPickerProps}
                  captionLayout='dropdown-buttons'
                  fromYear={1800}
                  toYear={new Date().getFullYear()}
                  currentMonth={field.value}
                  onMonthChange={field.onChange}
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    ></FormField>
  )
}
