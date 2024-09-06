'use client'

import { useFormContext } from 'react-hook-form'

import InputField from '@/components/form/input-field'
import { SettingsForm } from '@/schema'
import ImageUploaderField from '@/components/form/image-uploader-field'
import SwitchField from '@/components/form/switch-field'
import { ExtendedUser } from '@/auth'

type AccountFormFields = {
  user: ExtendedUser
}

export default function AccountFormFields({ user }: AccountFormFields) {
  const form = useFormContext<SettingsForm>()

  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='flex flex-1 flex-col gap-y-5'>
        <div className='flex flex-col gap-y-4'>
          <InputField control={form.control} name='name' label='Name' extendedProps={{ inputProps: { placeholder: 'Name' } }} />

          {!user.isOAuth ? (
            <>
              <InputField control={form.control} name='email' label='Email' extendedProps={{ inputProps: { placeholder: 'Name' } }} />
              <InputField
                control={form.control}
                name='password'
                label='Current Password'
                extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
              />
              <InputField
                control={form.control}
                name='newPassword'
                label='New Password'
                extendedProps={{ inputProps: { type: 'password', placeholder: '**************' } }}
              />

              <SwitchField
                control={form.control}
                layout='wide'
                name='isTwoFactorEnabled'
                label='Two Factor Authentication'
                description='Enable two factor authentication for your account.'
              />
            </>
          ) : null}

          <div className='block lg:hidden'>
            <ImageField />
          </div>
        </div>
      </div>

      <div className='hidden lg:block'>
        <ImageField />
      </div>
    </div>
  )
}

function ImageField() {
  const form = useFormContext<SettingsForm>()

  return (
    <div className='mb-4  w-full space-y-4 lg:mb-0 lg:w-80'>
      <ImageUploaderField
        control={form.control}
        name='image'
        label='Logo'
        showLabel={false}
        extendedProps={{
          imageUploaderProps: {
            isMultiple: false,
            display: null,
            inputContainerClassName: 'h-[320px]'
          }
        }}
      />
    </div>
  )
}
