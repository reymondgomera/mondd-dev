'use client'

import { toast } from 'sonner'
import { useMemo } from 'react'
import { Skill } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHotkeys } from 'react-hotkeys-hook'

import { useHeaderSticky } from '@/hooks'
import { cn, getFileFromBlobUrl, getFormDefaultValues } from '@/lib'
import { type SkillForm, skillFormSchema } from '@/schema'
import { useAction } from 'next-safe-action/hooks'
import { createOrUpdateSkill, getReferences, toggleSkillFavorite } from '@/actions'
import { Form } from '@/components/ui/form'
import HeaderHeading from '../../../_components/header-heading'
import { Button as ShadcnButton } from '@/components/ui/button'
import Button from '@/components/custom/button'
import { Icons } from '@/components/icons'
import SkillFormFields from './skill-form-fields'

type SkillFormProps = {
  skill: Skill | null
  skilltypes: Awaited<ReturnType<typeof getReferences>>
}

export default function SkillForm({ skill, skilltypes }: SkillFormProps) {
  const router = useRouter()

  const params = useParams() as { id: string }
  const isCreate = params.id === 'new'

  const { isHeaderSticky, headerContainerRef } = useHeaderSticky()

  useHotkeys('ctrl+s, meta+s', (e) => {
    e.preventDefault()
    form.handleSubmit(handleSubmit)()
  })

  const { executeAsync: createOrUpdateSkillExecuteAsync, isExecuting: createOrUpdateSkillIsExecuting } = useAction(createOrUpdateSkill)
  const { executeAsync: toggleSkillFavoriteExecuteAsync, isExecuting: toggleSkillFavoriteIsExecuting } = useAction(toggleSkillFavorite)

  const isDisabled = useMemo(() => {
    return createOrUpdateSkillIsExecuting || toggleSkillFavoriteIsExecuting
  }, [createOrUpdateSkillIsExecuting, toggleSkillFavoriteIsExecuting])

  const defaultValues = useMemo(() => {
    if (params.id === 'new' || !skill) return { ...getFormDefaultValues(skillFormSchema), id: 'new' } as SkillForm
    return skill
  }, [params, skill])

  const form = useForm<SkillForm>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(skillFormSchema)
  })

  const isFavorite = useMemo(() => {
    if (params.id === 'new') return form.getValues('isFavorite')
    else if (skill) return skill.isFavorite
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('isFavorite'), skill])

  async function handleSubmit(formValues: SkillForm) {
    try {
      const formData = new FormData()

      //* resolve file promise
      const logoFile = await getFileFromBlobUrl(formValues.logo)

      //* add files to formData
      formData.append('logo', logoFile)

      //* invoke create or update
      const response = await createOrUpdateSkillExecuteAsync({ ...formValues, formData })
      const result = response?.data

      if (result && result.error) {
        toast.error(result.message)
        return
      }

      if (!isCreate) router.refresh()

      toast.success(isCreate ? 'Skill created successfully!' : 'Skill updated successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  async function handleToggleSkillFavorite() {
    if (isCreate) {
      form.setValue('isFavorite', !form.getValues('isFavorite'))
      return
    }

    try {
      if (!skill) return

      const response = await toggleSkillFavoriteExecuteAsync({ id: params.id, isFavorite: !skill.isFavorite })
      const result = response?.data

      if (!response || !result) {
        toast.error(`Failed to ${skill.isFavorite ? 'unfavorite' : 'favorite'} ${skill.title.toLowerCase()}!`)
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
      <Form {...form} schema={skillFormSchema}>
        <div
          ref={headerContainerRef}
          className={cn(
            'sticky top-20 z-50 flex flex-col justify-center gap-y-4 bg-white transition-all dark:bg-base-primary md:flex-row md:items-center md:justify-between md:gap-0',
            isHeaderSticky && 'py-5'
          )}
        >
          <HeaderHeading title='Skill' description='Form for creating a skill.' />

          <div className='w-full space-x-0 space-y-[10px] md:flex md:w-fit md:items-center md:space-x-[10px] md:space-y-0 md:self-center'>
            <ShadcnButton
              className='md:fit w-full'
              type='button'
              variant='outline'
              disabled={isDisabled}
              onClick={handleToggleSkillFavorite}
            >
              {toggleSkillFavoriteIsExecuting ? <Icons.spinner className='size-4 animate-spin' /> : null}

              {!toggleSkillFavoriteIsExecuting ? (
                <span>{isFavorite ? <Icons.heart className='size-6' /> : <Icons.heartOutline className='size-6' />}</span>
              ) : null}
            </ShadcnButton>

            <Button
              className='md:fit w-full'
              type='submit'
              variant='primary'
              disabled={isDisabled}
              isLoading={createOrUpdateSkillIsExecuting}
              loadingText={isCreate ? 'Submitting' : 'Saving'}
            >
              {isCreate ? 'Submit' : 'Save'}
            </Button>
          </div>
        </div>

        <SkillFormFields skilltypes={skilltypes} />
      </Form>
    </form>
  )
}
