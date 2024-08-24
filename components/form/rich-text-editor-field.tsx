'use client'

import dynamic from 'next/dynamic'
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

import { cn, getClassName, omitClassName } from '@/lib'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '../ui/form'
import { FormExtendedProps } from '@/types'
import { RichTextEditorProps } from '../rich-text-editor/editor'

const RichTextEditor = dynamic(() => import('../rich-text-editor/editor'), { ssr: false })

type ExtendedProps = FormExtendedProps & {
  richTextEditorProps: Omit<RichTextEditorProps, 'value' | 'onChange'>
}

type RichTextEditorField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>
  name: TName
  label: string
  description?: string
  extendedProps?: ExtendedProps
}

export default function RichTextEditorField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  extendedProps
}: RichTextEditorField<T>) {
  const { clearErrors } = useFormContext()

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
              <RichTextEditor
                value={field.value}
                onChange={(content) => {
                  field.onChange(content)
                  clearErrors(name)
                }}
                {...extendedProps?.richTextEditorProps}
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
