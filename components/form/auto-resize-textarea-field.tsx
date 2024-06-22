'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '../ui/form'
import { FormExtendedProps } from '@/types'
import AutoResizeTextarea, { AutoResizeTextareaProps } from '../custom/auto-resize-textarea'

type ExtendedProps = FormExtendedProps & { autoResizeTextAreaProps?: AutoResizeTextareaProps }

type AutoResizeTextAreaFieldProps<
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

export default function AutoResizeTextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  extendedProps
}: AutoResizeTextAreaFieldProps<T>) {
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
            <FormControl>
              <AutoResizeTextarea className='placeholder:capitalize' {...field} {...extendedProps?.autoResizeTextAreaProps} />
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    />
  )
}
