'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { cn, getClassName, omitClassName } from '@/lib'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage, FormItemProps, FormLabelProps } from '../ui/form'
import { FormExtendedProps, FormOption } from '@/types'
import { RadioGroup, RadioGroupItem, RadioGroupItemProps, RadioGroupProps } from '../ui/radio-group'

type ExtendedProps = FormExtendedProps & {
  radioGroupProps?: RadioGroupProps
  radioGroupItemProps?: RadioGroupItemProps
  radioGroupFormItemProps?: FormItemProps
  radioGroupFormLabelProps?: FormLabelProps
}

type RadioGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  data: FormOption[]
  isLoading?: boolean
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
}

export default function RadioGroupField<T extends FieldValues>({
  data,
  isLoading,
  control,
  name,
  label,
  description,
  extendedProps
}: RadioGroupFieldProps<T>) {
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
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn('flex flex-col space-y-1', getClassName(extendedProps?.radioGroupProps))}
                {...omitClassName(extendedProps?.radioGroupProps)}
              >
                {!isLoading &&
                  data &&
                  data.length > 0 &&
                  data.map((item, i) => (
                    <FormItem
                      key={`${i}-${item.value}`}
                      className={cn('flex items-center space-x-3 space-y-0', getClassName(extendedProps?.radioGroupFormItemProps))}
                      {...omitClassName(extendedProps?.radioGroupFormItemProps)}
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} {...extendedProps?.radioGroupItemProps} />
                      </FormControl>
                      <FormLabel
                        className={cn('font-normal', getClassName(extendedProps?.radioGroupFormLabelProps))}
                        noAsterisk
                        {...omitClassName(extendedProps?.radioGroupFormLabelProps)}
                      >
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}

                {isLoading ? <div className='mx-3 my-2 w-full text-center text-sm'>Loading...</div> : null}
              </RadioGroup>
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    />
  )
}
