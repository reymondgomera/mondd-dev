'use client'

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { SkillForm } from '@/schema'
import ImageUploaderField from '@/components/form/image-uploader-field'
import { IconBadge } from '@/components/icon-bardge'
import { Icons } from '@/components/icons'
import InputField from '@/components/form/input-field'
import { ComboboxField } from '@/components/form/combobox-field'
import { getReferences } from '@/actions'

type SkillFormFieldsProps = {
  skilltypes: Awaited<ReturnType<typeof getReferences>>
}

export default function SkillFormFields({ skilltypes }: SkillFormFieldsProps) {
  const form = useFormContext<SkillForm>()

  const skilltypesValues = useMemo(() => {
    if (!skilltypes || skilltypes.length === 0) return []
    return skilltypes.map((type) => ({ label: type.name, value: type.code }))
  }, [skilltypes])

  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='flex flex-1 flex-col gap-y-5'>
        <div className='flex items-center gap-x-2'>
          <IconBadge icon={Icons.list} />
          <h2 className='text-2xl'>Details</h2>
        </div>

        <div className='flex flex-col gap-y-4'>
          <InputField control={form.control} name='title' label='Title' extendedProps={{ inputProps: { placeholder: 'Title' } }} />

          <ComboboxField control={form.control} data={skilltypesValues} name='typeCode' label='Type' />
        </div>

        <div className='block lg:hidden'>
          <LogoField />
        </div>
      </div>

      <div className='hidden lg:block'>
        <LogoField />
      </div>
    </div>
  )
}

function LogoField() {
  const form = useFormContext<SkillForm>()
  return (
    <div className='mb-4 w-full space-y-4 lg:mb-0 lg:w-80'>
      <ImageUploaderField
        control={form.control}
        name='logo'
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
