'use client'

import { v4 as uuidv4 } from 'uuid'
import { KeyboardEvent, useEffect, useMemo } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ExperienceForm, TagForm, tagFormSchema } from '@/schema'
import { IconBadge } from '@/components/icon-bardge'
import InputField from '@/components/form/input-field'
import { Icons } from '@/components/icons'
import AutoResizeTextAreaField from '@/components/form/auto-resize-textarea-field'
import { Form } from '@/components/ui/form'
import { Badge } from '@/components/ui/badge'
import MonthPickerField from '@/components/form/month-picker-field'
import DraggableTags from '@/components/draggable-tags'

export default function ExperienceFormFields() {
  const form = useFormContext<ExperienceForm>()

  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='flex flex-1 flex-col gap-y-5'>
        <div className='flex items-center gap-x-2'>
          <IconBadge icon={Icons.list} />
          <h2 className='text-2xl'>Details</h2>
        </div>

        <div className='flex flex-col gap-y-4'>
          <InputField control={form.control} name='title' label='Title' extendedProps={{ inputProps: { placeholder: 'Title' } }} />

          <AutoResizeTextAreaField
            control={form.control}
            name='description'
            label='Description'
            extendedProps={{ autoResizeTextAreaProps: { minHeight: 140, maxHeight: 200 } }}
          />

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <MonthPickerField control={form.control} name='start' label='Start Date' />
            <MonthPickerField control={form.control} name='end' label='End Date' />
          </div>

          <div className='block lg:hidden'>
            <TagsFormField />
          </div>
        </div>
      </div>

      <div className='hidden lg:block'>
        <TagsFormField />
      </div>
    </div>
  )
}

function TagsFormField() {
  const form = useFormContext<ExperienceForm>()

  const tags = useMemo(() => {
    return form.getValues('tags').map((tag) => ({ id: uuidv4(), title: tag }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('tags')])

  const tagForm = useForm<TagForm>({
    mode: 'onChange',
    defaultValues: { tag: '' },
    resolver: zodResolver(tagFormSchema)
  })

  const handleSubmitTag = (data: TagForm) => {
    const prevTags = tags.map((tag) => tag.title)
    form.setValue('tags', [...prevTags, data.tag])
    tagForm.reset()
  }

  const handleRemoveTag = (id: string) => {
    const updatedTags = tags.filter((tag) => tag.id !== id).map((tag) => tag.title)
    form.setValue('tags', updatedTags)
  }

  const handleInputTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      tagForm.handleSubmit(handleSubmitTag)()
    }
  }

  const handleOnChangeTags = (tags: { id: string; title: string }[]) => {
    form.setValue(
      'tags',
      tags.map((tag) => tag.title)
    )
  }

  useEffect(() => {
    if (tags.length > 0) form.clearErrors('tags')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  return (
    <div className='mb-4 w-full space-y-4 lg:mb-0 lg:w-80'>
      <Form {...tagForm} schema={tagFormSchema}>
        <div className='space-y-4'>
          <InputField
            control={tagForm.control}
            name='tag'
            label='Tags'
            extendedProps={{ inputProps: { placeholder: 'Tag', onKeyDown: handleInputTagKeyDown } }}
          />

          <div className='[&>div]:flex [&>div]:flex-wrap [&>div]:gap-3'>
            <DraggableTags
              tags={tags}
              render={({ index, tag }) => (
                <div className='relative w-fit cursor-grab transition-all active:cursor-grabbing'>
                  <Badge draggable={false} variant='primary'>
                    {tag.title}
                  </Badge>

                  <span
                    className='absolute -right-1.5 -top-[5px] flex size-4 cursor-pointer items-center justify-center rounded-full bg-rose-500'
                    onClick={() => handleRemoveTag(tag.id)}
                  >
                    <Icons.close className='size-3 text-white' />
                  </span>
                </div>
              )}
              onChange={handleOnChangeTags}
            />
          </div>

          {form.formState.errors.tags && form.formState.errors.tags.message ? (
            <p className='!mt-2 text-sm text-rose-500'>{form.formState.errors.tags.message}</p>
          ) : null}
        </div>
      </Form>
    </div>
  )
}
