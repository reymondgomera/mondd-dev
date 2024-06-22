'use client'

import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormDescription, FormControl, useFormSchema } from '../ui/form'
import { FormExtendedProps } from '@/types'
import { isFieldRequired } from '@/lib'
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
  description?: string
  extendedProps?: ExtendedProps
}

//? if className is passed among the properties of extendedProps, the specified or default className will be overridden

function ImageUploaderField<T extends FieldValues>({ control, name, label, description, extendedProps }: ImageUploaderFieldProps<T>) {
  const { clearErrors } = useFormContext()
  const { schema } = useFormSchema()
  const isRequired = isFieldRequired(name, schema)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem className='space-y-2' {...extendedProps?.itemProps}>
            <FormLabel className='space-x-1' {...extendedProps?.labelProps}>
              {label}
            </FormLabel>
            <FormControl>
              <ImageUploader
                label={label}
                value={field.value}
                isRequired={isRequired}
                uploaderKey={name}
                icon={Icons.image}
                limitSize={2}
                isMultiple={false}
                display={null}
                onChange={(url: string | string[]) => {
                  field.onChange(url)
                  clearErrors(name)
                }}
                isError={!!error}
                errorMessage={error?.message}
                inputContainerClassName='h-full w-full'
                errorClassName='text-sm text-rose-500 mt-2'
                {...extendedProps?.imageUploaderProps}
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
