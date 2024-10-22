'use client'

import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useForm, useFormContext } from 'react-hook-form'
import { KeyboardEvent, useCallback, useEffect, useMemo } from 'react'
import DraggableTags from '@/components/draggable-tags'

import { Icons } from '@/components/icons'
import { BlogForm, ProjectForm, TagForm, tagFormSchema } from '@/schema'
import InputField from '@/components/form/input-field'
import { IconBadge } from '@/components/icon-bardge'
import MonthPickerField from '@/components/form/month-picker-field'
import ImageUploaderField from '@/components/form/image-uploader-field'
import { zodResolver } from '@hookform/resolvers/zod'
import RichTextEditorField from '@/components/form/rich-text-editor-field'
import { Form } from '@/components/ui/form'
import AutoResizeTextAreaField from '@/components/form/auto-resize-textarea-field'
import { useAction } from 'next-safe-action/hooks'
import { updatePostBody } from '@/actions'
import { Badge } from '@/components/ui/badge'

type PostFormFieldsProps = {
  isDisabled?: boolean
}

export default function PostFormFields({ isDisabled }: PostFormFieldsProps) {
  const form = useFormContext<ProjectForm | BlogForm>()
  const router = useRouter()
  const { executeAsync, isExecuting } = useAction(updatePostBody)

  const handleOnUpdate = useCallback(
    async (id: string, body: string) => {
      if (isDisabled) return

      try {
        const response = await executeAsync({ id, body })
        const result = response?.data

        if (result && result.error) toast.error(result.message)

        router.refresh()
      } catch (err) {
        console.error(err)
        toast.error('Something went wrong! Please try again later.')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDisabled]
  )

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
            extendedProps={{ autoResizeTextAreaProps: { maxHeight: 120 } }}
          />

          <InputField control={form.control} name='slug' label='Slug' extendedProps={{ inputProps: { placeholder: 'Slug' } }} />
          <RichTextEditorField
            control={form.control}
            name='body'
            label='Body'
            extendedProps={{
              richTextEditorProps: {
                debounceMs: 1000,
                isLoading: isExecuting,
                onUpdate: (content) => handleOnUpdate(form.getValues().id, content)
              }
            }}
          />
        </div>

        <div className='block lg:hidden'>
          <ThumbnailTagsFormFields />
        </div>

        <MetadataFormFields type={form.getValues().typeCode} />
      </div>

      <div className='hidden lg:block'>
        <ThumbnailTagsFormFields />
      </div>
    </div>
  )
}

function MetadataFormFields({ type }: { type: string }) {
  const form = useFormContext<ProjectForm | BlogForm>()

  switch (type) {
    case 'project':
      return (
        <>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={Icons.info} />
            <h2 className='text-2xl'>Metadata</h2>
          </div>

          <div className='flex flex-col gap-y-4'>
            <InputField control={form.control} name='metadata.url' label='Url' extendedProps={{ inputProps: { placeholder: 'Url' } }} />
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <MonthPickerField control={form.control} name='metadata.createdAt' label='Date Created' />

              <InputField
                control={form.control}
                name='metadata.madeAt'
                label='Made At'
                extendedProps={{ inputProps: { placeholder: 'Made At' } }}
              />
            </div>

            <ImageUploaderField
              control={form.control}
              name='metadata.screenshots'
              label='Screenshots'
              showLabel={false}
              extendedProps={{
                imageUploaderProps: {
                  isMultiple: true,
                  display: 'compact',
                  inputContainerClassName: 'h-[320px]'
                }
              }}
            />
          </div>
        </>
      )
    default:
      return null
  }
}

function ThumbnailTagsFormFields() {
  const form = useFormContext<ProjectForm | BlogForm>()

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
      <ImageUploaderField
        control={form.control}
        name='thumbnail'
        label='Thumbnail'
        showLabel={false}
        extendedProps={{
          imageUploaderProps: {
            isMultiple: false,
            display: null,
            inputContainerClassName: 'h-[320px]'
          }
        }}
      />

      <Form {...tagForm} schema={tagFormSchema}>
        <div className='space-y-4'>
          <InputField
            control={tagForm.control}
            name='tag'
            label='Tags'
            extendedProps={{ inputProps: { placeholder: 'Tag', onKeyDown: handleInputTagKeyDown } }}
          />

          {tags.length > 0 ? (
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
          ) : null}

          {form.formState.errors.tags && form.formState.errors.tags.message ? (
            <p className='!mt-2 text-sm text-rose-500'>{form.formState.errors.tags.message}</p>
          ) : null}
        </div>
      </Form>
    </div>
  )
}
