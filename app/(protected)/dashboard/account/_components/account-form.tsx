'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { notFound } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'
import { useAction } from 'next-safe-action/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import Button from '@/components/custom/button'
import { SettingsForm, settingsFormSchema } from '@/schema'
import HeaderHeading from '../../_components/header-heading'
import AccountFormFields from './account-form-fields'
import Alert from '@/components/custom/alert'
import { updateSettings } from '@/actions'
import { ExtendedUser } from '@/auth'
import { cn, getFileFromBlobUrl } from '@/lib'
import { useHeaderSticky } from '@/hooks'

type AccountFormProps = {
  user?: ExtendedUser
}

export default function AccountForm({ user }: AccountFormProps) {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const { executeAsync, isExecuting } = useAction(updateSettings)

  const { isHeaderSticky, headerContainerRef } = useHeaderSticky()

  useHotkeys('ctrl+s, meta+s', (e) => {
    e.preventDefault()
    form.handleSubmit(handleSubmit)()
  })

  if (!user) notFound()

  const form = useForm<SettingsForm>({
    mode: 'onChange',
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      image: user.image ? user.image.replace('s96', 's320') : undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled || false,
      newPassword: undefined,
      password: undefined
    },
    resolver: zodResolver(settingsFormSchema)
  })

  async function handleSubmit(formValues: SettingsForm) {
    setSuccess('')
    setError('')

    try {
      const formData = new FormData()

      //* resolve file promise
      const imageFile = formValues.image
        ? formValues.image.startsWith('https://utfs.io') || formValues.image.startsWith('blob:')
          ? await getFileFromBlobUrl(formValues.image)
          : null
        : null

      //* add files to formData
      imageFile && formData.append('image', imageFile)

      const response = await executeAsync({ ...formValues, formData })
      const result = response?.data

      if (!response || !result) {
        toast.error('Failed to update account!. Please try again later.')
        return
      }

      if (!result.error) {
        if (result.data && result.data.confirmEmail) {
          setSuccess(result.message)
          return
        }

        toast.success(result.message)
        return
      }

      if (result.error) {
        if (result.code === 409) {
          form.setError('email', { type: 'custom', message: result.message })
          return
        }

        if (result.code === 400) {
          form.setError('password', { type: 'custom', message: result.message })
          return
        }

        toast.error(result.message)
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  return (
    <form className='flex flex-col gap-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
      <Form {...form} schema={settingsFormSchema}>
        <div
          ref={headerContainerRef}
          className={cn(
            'sticky top-20 z-50 flex flex-col justify-center gap-y-4 bg-white transition-all dark:bg-base-primary md:flex-row md:items-center md:justify-between md:gap-0',
            isHeaderSticky && 'py-5'
          )}
        >
          <HeaderHeading title='Account' description='Update your account details' />

          <Button type='submit' variant='primary' isLoading={isExecuting} loadingText='Saving'>
            Save
          </Button>
        </div>

        <Alert variant='success' message={success} />
        <Alert variant='error' message={error} />

        <AccountFormFields user={user} />
      </Form>
    </form>
  )
}
