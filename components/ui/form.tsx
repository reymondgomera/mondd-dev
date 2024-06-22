import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, FormProviderProps, useFormContext } from 'react-hook-form'

import { cn, isFieldRequired } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import AsteriskRequired from '../asterisk-required'
import { ZodTypeAny } from 'zod'

type FormSchemaContextValue<T extends ZodTypeAny = ZodTypeAny> = { schema: T }

const FormSchemaContext = React.createContext<FormSchemaContextValue>({} as FormSchemaContextValue)

function Form<T extends ZodTypeAny, U extends FieldValues>({ children, schema, ...props }: FormProviderProps<U> & { schema: T }) {
  return (
    <FormSchemaContext.Provider value={{ schema }}>
      <FormProvider {...props}>{children}</FormProvider>
    </FormSchemaContext.Provider>
  )
}

export const useFormSchema = () => {
  const schemaContext = React.useContext(FormSchemaContext)

  if (!schemaContext) {
    throw new Error('useFormSchema should be used within <Form>')
  }

  return { schema: schemaContext.schema }
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  isRequired?: boolean
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  const name = props.name
  const { schema } = React.useContext(FormSchemaContext)
  const isRequired = isFieldRequired(name, schema)

  return (
    <FormFieldContext.Provider value={{ name: props.name, isRequired }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    isRequired: fieldContext.isRequired,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

export type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { noAsterisk?: boolean }

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
  ({ className, noAsterisk, ...props }, ref) => {
    const { error, formItemId, isRequired } = useFormField()

    if (typeof props.children === 'string' && !noAsterisk && isRequired) {
      props.children = (
        <>
          <span>{props.children}</span> <AsteriskRequired />
        </>
      )
    }

    return <Label ref={ref} className={cn(error && 'text-rose-500', className)} htmlFor={formItemId} {...props} />
  }
)
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return <p ref={ref} id={formDescriptionId} className={cn('text-xs text-muted-foreground', className)} {...props} />
})
FormDescription.displayName = 'FormDescription'

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} id={formMessageId} className={cn('text-sm text-rose-500', className)} {...props}>
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
