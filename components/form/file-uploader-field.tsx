'use client'

import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

import { isFieldRequired } from '@/lib'
import { FormExtendedProps } from '@/types'
import { MimeType, cn, getClassName, omitClassName } from '@/lib'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, useFormSchema } from '../ui/form'
import { Icon, Icons } from '../icons'
import { FileUploader } from '../file-uploader'

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
          <FormItem className={cn('space-y-2', getClassName(extendedProps?.itemProps))} {...omitClassName(extendedProps?.itemProps)}>
            <FormLabel className={cn('space-x-1', getClassName(extendedProps?.labelProps))} {...omitClassName(extendedProps?.labelProps)}>
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
                inputContainerClassName={cn('h-full w-full', getClassName(extendedProps?.fileUploaderProps, 'inputContainerClassName'))}
                errorClassName={cn('mt-2', getClassName(extendedProps?.fileUploaderProps, 'errorClassName'))}
                {...omitClassName(extendedProps?.fileUploaderProps, ['inputContainerClassName', 'errorClassName'])}
              />
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
          </FormItem>
        )
      }}
    />
  )
}
