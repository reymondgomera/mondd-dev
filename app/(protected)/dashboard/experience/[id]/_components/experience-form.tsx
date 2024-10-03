'use client'

import { toast } from 'sonner'
import { useMemo } from 'react'
import { Experience } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHotkeys } from 'react-hotkeys-hook'

import { useHeaderSticky } from '@/hooks'
import { cn, getFormDefaultValues } from '@/lib'
import { type ExperienceForm, experienceFormSchema } from '@/schema'
import { useAction } from 'next-safe-action/hooks'
import { createOrUpdateExperience } from '@/actions'
import HeaderHeading from '../../../_components/header-heading'
import Button from '@/components/custom/button'
import { Form } from '@/components/ui/form'
import ExperienceFormFields from './experience-form-fields'

type ExperienceFormProps = {
  experience: Experience | null
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter()

  const params = useParams() as { id: string }
  const isCreate = params.id === 'new'

  const { isHeaderSticky, headerContainerRef } = useHeaderSticky()

  useHotkeys('ctrl+s, meta+s', (e) => {
    e.preventDefault()
    form.handleSubmit(handleSubmit)()
  })

  const { executeAsync, isExecuting } = useAction(createOrUpdateExperience)

  const defaultValues = useMemo(() => {
    if (params.id === 'new' || !experience) return { ...getFormDefaultValues(experienceFormSchema), id: 'new' } as ExperienceForm
    return experience
  }, [params, experience])

  const form = useForm<ExperienceForm>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(experienceFormSchema)
  })

  async function handleSubmit(formValues: ExperienceForm) {
    try {
      const response = await executeAsync(formValues)
      const result = response?.data

      if (result && result.error) {
        toast.error(result.message)
        return
      }

      if (isCreate) router.refresh()

      toast.success(isCreate ? 'Experience created successfully!' : 'Experience updated successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  return (
    <form className='relative flex flex-col gap-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form} schema={experienceFormSchema}>
        <div
          ref={headerContainerRef}
          className={cn(
            'sticky top-20 z-50 flex flex-col justify-center gap-y-4 bg-white transition-all dark:bg-base-primary md:flex-row md:items-center md:justify-between md:gap-0',
            isHeaderSticky && 'py-5'
          )}
        >
          <HeaderHeading title='Experience' description='Form for creating/updating an experience.' />

          <div className='w-full space-x-0 space-y-[10px] md:flex md:w-fit md:items-center md:space-x-[10px] md:space-y-0 md:self-center'>
            <Button
              className='md:fit w-full'
              type='submit'
              variant='primary'
              disabled={isExecuting}
              isLoading={isExecuting}
              loadingText={isCreate ? 'Submitting' : 'Saving'}
            >
              {isCreate ? 'Submit' : 'Save'}
            </Button>
          </div>
        </div>

        <ExperienceFormFields />
      </Form>
    </form>
  )
}
