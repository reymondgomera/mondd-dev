'use client'

import { useMemo } from 'react'
import { toast } from 'sonner'
import { FieldValues, useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHotkeys } from 'react-hotkeys-hook'

import { PostType } from '@/types'
import { BlogForm, ProjectForm, blogFormSchema, projectFormSchema } from '@/schema'
import HeaderHeading from '@/app/(protected)/dashboard/_components/header-heading'
import { capitalize, cn, getFileFromBlobUrl, getFormDefaultValues } from '@/lib'
import { Form } from '@/components/ui/form'
import PostFormFields from './post-form-fields'
import { Post } from '@prisma/client'
import { togglePostFeature, togglePostPublish, updateBlog, updateProject } from '@/actions'
import { useAction } from 'next-safe-action/hooks'
import Button from '@/components/custom/button'
import { useHeaderSticky } from '@/hooks'

type PostFormProps = {
  post: Post
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const { type } = useParams() as { type: PostType; slug: string }

  const { isHeaderSticky, headerContainerRef } = useHeaderSticky()

  useHotkeys('ctrl+s, meta+s', (e) => {
    e.preventDefault()
    form.handleSubmit(handleSubmit)()
  })

  const schema = useMemo(() => {
    switch (type) {
      case 'project':
        return projectFormSchema
      case 'blog':
        return blogFormSchema
      default:
        return blogFormSchema
    }
  }, [type])

  const { executeAsync: updateProjectExecuteAsync, isExecuting: updateProjectIsExecuting } = useAction(updateProject)
  const { executeAsync: updateBlogExecuteAsync, isExecuting: updateBlogIsExecuting } = useAction(updateBlog)
  const { executeAsync: togglePostFeatureExecuteAsync, isExecuting: togglePostFeatureIsExecuting } = useAction(togglePostFeature)
  const { executeAsync: togglePostPublishExecuteAsync, isExecuting: togglePostPublishIsExecuting } = useAction(togglePostPublish)

  const isDisabled = useMemo(() => {
    return updateProjectIsExecuting || updateBlogIsExecuting || togglePostFeatureIsExecuting || togglePostPublishIsExecuting
  }, [updateProjectIsExecuting, updateBlogIsExecuting, togglePostFeatureIsExecuting, togglePostPublishIsExecuting])

  const form = useForm({
    mode: 'onChange',
    defaultValues: { ...getFormDefaultValues(schema), ...post },
    resolver: zodResolver(schema)
  })

  async function handleSubmit(formValues: FieldValues) {
    async function getResponse(data: FieldValues) {
      switch (data.typeCode) {
        case 'project': {
          const data = formValues as ProjectForm
          const formData = new FormData()

          //* file promises
          const thumbnail = data.thumbnail ? getFileFromBlobUrl(data.thumbnail) : null
          const screenshots = data.metadata.screenshots.length > 0 ? data.metadata.screenshots.map((url) => getFileFromBlobUrl(url)) : []

          //* resolve file promises
          const [thumbnailFile, ...screenshotFiles] = await Promise.all([thumbnail, ...screenshots])

          //* add files to formData
          thumbnailFile && formData.append('thumbnail', thumbnailFile)
          screenshotFiles.length > 0 && screenshotFiles.forEach((file) => formData.append('screenshots', file))

          //* invoke update
          return updateProjectExecuteAsync({ ...(data as ProjectForm), formData })
        }

        default: {
          const data = formValues as BlogForm
          const formData = new FormData()

          //* file promises
          const thumbnailFile = data.thumbnail ? await getFileFromBlobUrl(data.thumbnail) : null

          //* add files to formData
          thumbnailFile && formData.append('thumbnail', thumbnailFile)

          //* invoke update
          return updateBlogExecuteAsync({ ...(data as BlogForm), formData })
        }
      }
    }

    try {
      const response = await getResponse(formValues)
      const result = response?.data

      if (response && result && result.code === 409) {
        form.setError('slug', { type: 'custom', message: result.message })
        return
      }

      if (response && result && result.error) {
        toast.error(result.message)
        return
      }

      toast.success(`${capitalize(post.typeCode)} updated successfully!`)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  async function handleTogglePostFeature() {
    try {
      const response = await togglePostFeatureExecuteAsync({ id: post.id, isFeatured: !post.isFeatured })
      const result = response?.data

      if (!response || !result) {
        toast.error(`Failed to ${post.isFeatured ? 'unfeatured' : 'featured'} ${post.typeCode}}!`)
        return
      }

      if (!result.error) {
        toast.success(result.message)
        router.refresh()
        return
      }

      toast.error(result.message)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  const handleTogglePostPublish = async () => {
    try {
      const response = await togglePostPublishExecuteAsync({ id: post.id, isPublished: !post.isPublished })
      const result = response?.data

      if (!response || !result) {
        toast.error(`Failed to ${post.isPublished ? 'unpublished' : 'published'} ${post.typeCode}!`)
        return
      }

      if (!result.error) {
        toast.success(result.message)
        router.refresh()
        return
      }

      toast.error(result.message)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  return (
    <form className='relative flex flex-col gap-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form} schema={schema}>
        <div
          ref={headerContainerRef}
          className={cn(
            'sticky top-20 z-50 flex flex-col justify-center gap-y-4 bg-white transition-all dark:bg-base-primary md:flex-row md:items-center md:justify-between md:gap-0',
            isHeaderSticky && 'py-5'
          )}
        >
          <HeaderHeading title='Project' description='Form for creating a project.' />

          <div className='w-full space-x-0 space-y-[10px] md:flex md:w-fit md:items-center md:space-x-[10px] md:space-y-0 md:self-center'>
            <Button
              className='md:fit w-full'
              type='button'
              variant='outline'
              isLoading={togglePostFeatureIsExecuting}
              loadingText='Updating'
              disabled={isDisabled}
              onClick={handleTogglePostFeature}
            >
              {post.isFeatured ? 'Unfeatured' : 'Featured'}
            </Button>
            <Button
              className='md:fit w-full'
              type='button'
              variant='outline'
              isLoading={togglePostPublishIsExecuting}
              loadingText='Updating'
              disabled={isDisabled}
              onClick={handleTogglePostPublish}
            >
              {post.isPublished ? 'Unpublished' : 'Published'}
            </Button>
            <Button
              className='md:fit w-full'
              isLoading={updateProjectIsExecuting || updateBlogIsExecuting}
              disabled={isDisabled}
              loadingText='Saving'
              type='submit'
              variant='primary'
            >
              Save
            </Button>
          </div>
        </div>

        <PostFormFields isDisabled={isDisabled} />
      </Form>
    </form>
  )
}
