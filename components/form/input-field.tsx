'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { cn, getClassName, omitClassName } from '@/lib'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '../ui/form'
import { FormExtendedProps } from '@/types'
import { Input, InputProps } from '../ui/input'

type ExtendedProps = FormExtendedProps & { inputProps?: InputProps }

type InputFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
}

export default function InputField<T extends FieldValues>({ control, name, label, description, extendedProps }: InputFieldProps<T>) {
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
            <FormControl>
              <Input
                className={cn('placeholder:capitalize', getClassName(extendedProps?.inputProps))}
                {...field}
                {...omitClassName(extendedProps?.inputProps)}
              />
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    />
  )
}
