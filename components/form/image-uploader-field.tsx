'use client'

import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormDescription, FormControl, useFormSchema } from '../ui/form'
import { FormExtendedProps } from '@/types'
import { cn, getClassName, isFieldRequired, omitClassName } from '@/lib'
import { Icon, Icons } from '../icons'
import ImageUploader, { UnSupportedType } from '../image-uploader'

type ExtendedProps = FormExtendedProps & {
  imageUploaderProps: {
    mainContainerClassName?: string
    inputContainerClassName?: string
    icon?: Icon
    limitSize?: number
    isLoading?: boolean
    isError?: boolean
    errorMessage?: string
    errorClassName?: string
    unsupportedMimeTypes?: UnSupportedType[]
  } & ({ display: null; isMultiple: false } | { display: 'loose' | 'compact'; isMultiple: true })
}

type ImageUploaderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  showLabel?: boolean
  description?: string
  extendedProps?: ExtendedProps
}

function ImageUploaderField<T extends FieldValues>({
  control,
  name,
  label,
  showLabel = true,
  description,
  extendedProps
}: ImageUploaderFieldProps<T>) {
  const { clearErrors } = useFormContext()
  const { schema } = useFormSchema()
  const isRequired = isFieldRequired(name, schema)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className={cn('space-y-2', getClassName(extendedProps?.itemProps))} {...omitClassName(extendedProps?.itemProps)}>
            {showLabel ? (
              <FormLabel className={cn('space-x-1', getClassName(extendedProps?.labelProps))} {...omitClassName(extendedProps?.labelProps)}>
                {label}
              </FormLabel>
            ) : null}
            <FormControl>
              <ImageUploader
                label={label}
                value={field.value}
                isRequired={isRequired}
                uploaderKey={name}
                icon={Icons.image}
                limitSize={4}
                isMultiple={false}
                display={null}
                onChange={(url: string | string[]) => {
                  field.onChange(url)
                  clearErrors(name)
                }}
                isError={!!error}
                errorMessage={error?.message}
                inputContainerClassName={cn('h-full w-full', getClassName(extendedProps?.imageUploaderProps, 'inputContainerClassName'))}
                errorClassName={cn('mt-2', getClassName(extendedProps?.imageUploaderProps, 'errorClassName'))}
                {...omitClassName(extendedProps?.imageUploaderProps, ['inputContainerClassName', 'errorClassName'])}
              />
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
          </FormItem>
        )
      }}
    />
  )
}

export default ImageUploaderField
