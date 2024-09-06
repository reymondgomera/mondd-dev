'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Control, FieldPath, FieldValues, useFormContext } from 'react-hook-form'

import { Badge, BadgeProps } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandEmptyProps,
  CommandGroup,
  CommandGroupProps,
  CommandInputProps,
  CommandItem,
  CommandItemProps,
  CommandList,
  CommandListProps,
  CommandProps
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { FormExtendedProps, FormOption } from '@/types'
import { cn, getClassName, omitClassName } from '@/lib'
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '../ui/form'

type ExtendedProps = FormExtendedProps & {
  commandProps?: CommandProps
  commandInputProps?: CommandInputProps
  commandGroupProps?: CommandGroupProps
  commandListProps?: CommandListProps
  commandItemProps?: CommandItemProps
  commandEmptyProps?: CommandEmptyProps
  badgeGroupProps: React.ComponentProps<'div'>
  badgeGroupItemProps?: BadgeProps
  badgeGroupItemButton?: React.ComponentProps<'button'>
}

type MultiSelectFieldProps<
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

export default function MultiSelectField<T extends FieldValues>({
  data,
  isLoading,
  control,
  name,
  label,
  description,
  extendedProps
}: MultiSelectFieldProps<T>) {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = React.useState('')

  const { watch, getValues } = useFormContext()

  const handleUnselect = React.useCallback((fieldValue: string[], optionValue: string, onChange: (...event: any[]) => void) => {
    onChange(fieldValue.filter((s) => s !== optionValue))
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, fieldValue: string[], onChange: (...event: any[]) => void) => {
      const input = inputRef.current

      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const newSelected = [...fieldValue]
            newSelected.pop()
            onChange(newSelected)
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    []
  )

  const selected = React.useMemo(() => {
    return getValues(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(name)])

  const selectables = React.useMemo(() => {
    const selected = getValues(name)

    return data.filter((option) => !selected.includes(option.value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(name)])

  const getLabel = (value: string) => {
    const label = data.find((option) => option.value === value)?.label
    return label ?? ''
  }

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
              <Command
                onKeyDown={(e) => handleKeyDown(e, field.value, field.onChange)}
                className={cn('overflow-visible bg-transparent', getClassName(extendedProps?.commandProps))}
                {...omitClassName(extendedProps?.commandProps)}
              >
                <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                  <div
                    className={cn('flex flex-wrap gap-1', getClassName(extendedProps?.badgeGroupProps))}
                    {...omitClassName(extendedProps?.badgeGroupProps)}
                  >
                    {selected.map((value: string) => {
                      return (
                        <Badge key={value} variant='secondary' {...extendedProps?.badgeGroupItemProps}>
                          {getLabel(value)}
                          <button
                            className={cn(
                              'ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2',
                              getClassName(extendedProps?.badgeGroupItemButton)
                            )}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUnselect(field.value, value, field.onChange)
                              }
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                            onClick={() => handleUnselect(field.value, value, field.onChange)}
                            {...omitClassName(extendedProps?.badgeGroupItemButton)}
                          >
                            <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                          </button>
                        </Badge>
                      )
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                      ref={inputRef}
                      value={inputValue}
                      onValueChange={setInputValue}
                      onBlur={() => setOpen(false)}
                      onFocus={() => setOpen(true)}
                      placeholder={`Select ${label}...`}
                      className={cn(
                        'ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground',
                        getClassName(extendedProps?.commandInputProps)
                      )}
                      {...omitClassName(extendedProps?.commandInputProps)}
                    />
                  </div>
                </div>

                <div className='relative mt-2'>
                  <CommandList {...extendedProps?.commandListProps}>
                    {open && selectables.length > 0 ? (
                      <div className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
                        {isLoading && <CommandEmpty {...extendedProps?.commandEmptyProps}>Loading...</CommandEmpty>}

                        <CommandGroup
                          className={cn('h-full overflow-auto', getClassName(extendedProps?.commandGroupProps))}
                          {...omitClassName(extendedProps?.commandGroupProps)}
                        >
                          {!isLoading &&
                            selectables.map((option) => {
                              return (
                                <CommandItem
                                  key={option.value}
                                  onMouseDown={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                  onSelect={(value) => {
                                    setInputValue('')
                                    field.onChange([...field.value, option.value])
                                  }}
                                  className={cn('cursor-pointer', getClassName(extendedProps?.commandItemProps))}
                                  {...omitClassName(extendedProps?.commandItemProps)}
                                >
                                  {option.label}
                                </CommandItem>
                              )
                            })}
                        </CommandGroup>
                      </div>
                    ) : null}
                  </CommandList>
                </div>
              </Command>
            </FormControl>
            {description && <FormDescription {...extendedProps?.descriptionProps}>{description}</FormDescription>}
            <FormMessage {...extendedProps?.messageProps} />
          </FormItem>
        )
      }}
    />
  )
}
