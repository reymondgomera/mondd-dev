'use client'

import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { cn, getClassName, omitClassName } from '@/lib'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage, FormItemProps, FormLabelProps } from '../ui/form'
import { FormExtendedProps, FormOption } from '@/types'
import { Checkbox, CheckboxProps } from '../ui/checkbox'

type ExtendedProps = FormExtendedProps & {
  checkboxGroupProps?: React.ComponentProps<'div'>
  checkboxGroupFormItemProps?: FormItemProps
  checkboxGroupFormLabelProps?: FormLabelProps
  checkboxGroupItemProps?: CheckboxProps
}

type CheckboxGroupFieldProps<
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

export default function CheckboxGroupField<T extends FieldValues>({
  data,
  isLoading,
  control,
  name,
  label,
  description,
  extendedProps
}: CheckboxGroupFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => {
        return (
          <FormItem className={cn('space-y-2', getClassName(extendedProps?.itemProps))} {...omitClassName(extendedProps?.itemProps)}>
            <FormLabel className={cn('space-x-1', getClassName(extendedProps?.labelProps))} {...omitClassName(extendedProps?.labelProps)}>
              {label}
            </FormLabel>

            <div
              className={cn('flex flex-col gap-y-2', getClassName(extendedProps?.checkboxGroupProps))}
              {...omitClassName(extendedProps?.checkboxGroupProps)}
            >
              {!isLoading &&
                data &&
                data.length > 0 &&
                data.map((item, i) => (
                  <FormField
                    key={`${i}-${item.value}`}
                    control={control}
                    name={name}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={`${i}-${item.value}`}
                          className={cn(
                            'flex flex-row items-start space-x-3 space-y-0',
                            getClassName(extendedProps?.checkboxGroupFormItemProps)
                          )}
                          {...omitClassName(extendedProps?.checkboxGroupFormItemProps)}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.value])
                                  : field.onChange(field.value?.filter((value: string) => value !== item.value))
                              }}
                              {...extendedProps?.checkboxGroupItemProps}
                            />
                          </FormControl>
                          <FormLabel
                            className={cn('font-normal', getClassName(extendedProps?.checkboxGroupFormLabelProps))}
                            noAsterisk
                            {...omitClassName(extendedProps?.checkboxGroupFormLabelProps)}
                          >
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}

              {isLoading ? <div className='mx-3 my-2 w-full text-center text-sm'>Loading...</div> : null}
            </div>

            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    />
  )
}
