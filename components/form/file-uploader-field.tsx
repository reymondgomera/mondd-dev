'use client'

import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormDescription, FormControl, useFormSchema } from '../ui/form'
import { FormExtendedProps } from '@/types'
import { Icon, Icons } from '../icons'
import { FileUploader } from '../file-uploader'
import { MimeType } from '@/lib/mime-db'
import { isFieldRequired } from '@/lib'

type ExtendedProps = FormExtendedProps & {
  fileUploaderProps: {
    mainContainerClassName?: string
    inputContainerClassName?: string
    icon?: Icon
    limitSize?: number
    isLoading?: boolean
    isError?: boolean
    errorMessage?: string
    errorClassName?: string
    isMultiple?: boolean
  }
}

type FileUploaderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  type: MimeType[]
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
}

//? if className is passed among the properties of extendedProps, the specified or default className will be overridden

export default function FileUploaderField<T extends FieldValues>({
  type,
  control,
  name,
  label,
  description,
  extendedProps
}: FileUploaderFieldProps<T>) {
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
              <FileUploader
                type={type}
                label={label}
                value={field.value}
                isRequired={isRequired}
                uploaderKey={name}
                icon={Icons.cloudUpload}
                limitSize={2}
                isMultiple={false}
                onChange={(url: string | string[]) => {
                  field.onChange(url)
                  clearErrors(name)
                }}
                isError={!!error}
                errorMessage={error?.message}
                inputContainerClassName='h-full w-full'
                errorClassName='text-sm text-rose-500 mt-2'
                {...extendedProps?.fileUploaderProps}
              />
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
          </FormItem>
        )
      }}
    />
  )
}
