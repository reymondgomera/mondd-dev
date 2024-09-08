'use client'

import AutoResizeTextAreaField from '@/components/form/auto-resize-textarea-field'
import CheckboxField from '@/components/form/checkbox-field'
import CheckboxGroupField from '@/components/form/checkbox-group-field'
import { ComboboxField } from '@/components/form/combobox-field'
import DatePickerField from '@/components/form/date-picker-field'
import FileUploaderField from '@/components/form/file-uploader-field'
import ImageUploaderField from '@/components/form/image-uploader-field'
import InputField from '@/components/form/input-field'
import MonthPickerField from '@/components/form/month-picker-field'
import MultiSelectField from '@/components/form/multi-select-field'
import RadioGroupField from '@/components/form/radio-group-field'
import SelectField from '@/components/form/select-field'
import SwitchField from '@/components/form/switch-field'
import TextAreaField from '@/components/form/textarea-field'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { getFormDefaultValues } from '@/lib'
import { FormOption } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

const postType = [
  { value: 'project', label: 'Project' },
  { value: 'blog', label: 'Blog' },
  { value: 'announcement', label: 'Announcement' },
  { value: 'news', label: 'News' },
  { value: 'event', label: 'Event' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'update', label: 'Update' },
  { value: 'review', label: 'Review' },
  { value: 'interview', label: 'Interview' },
  { value: 'case-study', label: 'Case Study' }
]

const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'others', label: 'Others' }
]

const favoriteColors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'gray', label: 'Gray' }
]

const framework = [
  { value: 'react', label: 'React.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'django', label: 'Django' },
  { value: 'flask', label: 'Flask' },
  { value: 'spring', label: 'Spring' },
  { value: 'express', label: 'Express.js' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'node.js', label: 'Node.js' },
  { value: 'asp_net', label: 'ASP.NET' }
]

const exampleFormSchema = z.object({
  name: z.string().min(1, { message: 'Please enter a name.' }),
  age: z.coerce.number().min(1, { message: 'Please enter an age.' }).optional(),
  email: z.string().min(1, { message: 'Please enter an email.' }).email({ message: 'Please enter a valid email.' }),
  nested: z.object({
    p1: z.string(),
    p2: z.string()
  }),
  date: z.date(),
  created: z.date(),
  description: z.string().min(1, { message: 'Please enter a description.' }),
  body: z.string().min(1, { message: 'Please enter a body.' }),
  reference: z.string().min(1, { message: 'Please select a type.' }),
  postType: z.string().min(1, { message: 'Please select a skill.' }),
  gender: z.string().min(1, { message: 'Please select gender' }),
  isAgree: z.boolean().default(false),
  favoriteColor: z.array(z.string()).min(1, { message: 'Please select at least one favorite color.' }),
  isDefault: z.boolean().default(false),
  framework: z.array(z.string()).min(1, { message: 'Please select atleast one framework.' }),
  profilePic: z.string().min(1, { message: 'Please select an Profile Picture.' }),
  gallery: z.array(z.string()).min(1, { message: 'Please select at least one image.' }),
  doc: z.string().min(1, { message: 'Please select a file' }),
  galleryDocs: z.array(z.string()).min(1, { message: 'Please select at least one file' })
})

type ExamplesForm = z.infer<typeof exampleFormSchema>

export default function ExampleForm({ refData, postType }: { refData: FormOption[]; postType: FormOption[] }) {
  const [frameworkData, setFrameworkData] = useState<FormOption[]>([
    { value: 'react', label: 'React.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'spring', label: 'Spring' },
    { value: 'express', label: 'Express.js' },
    { value: 'laravel', label: 'Laravel' },
    { value: 'node.js', label: 'Node.js' },
    { value: 'asp_net', label: 'ASP.NET' }
  ])
  // const [frameworkIsLoading, setFrameworkIsLoading] = useState(false)

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      ...getFormDefaultValues(exampleFormSchema),
      date: new Date('02-29-2018'),
      created: new Date('09-01-1970'),
      isAgree: true,
      isDefault: true,
      body: 'qwewqewqeqw ? what?'
      // postType: 'blog',
      // reference: 'blog'
      // gender: 'female'
      // favoriteColor: ['red', 'green', 'yellow']
      // framework: ['angular', 'spring', 'vue']
      // profilePic: 'https://utfs.io/f/07c5969c-5ba4-46d9-adf3-acd479207abf-wz6kr6x.svg'
      // gallery: [
      //   'https://utfs.io/f/683b2cef-f618-417f-b982-47ba777948fa-c81ys3.svg',
      //   'https://utfs.io/f/a282d8ad-c286-4fd0-a039-3c0915ee23b8-1xrfm.svg'
      // ],

      // doc: 'https://utfs.io/f/6698adba-44be-434c-98e2-e59255db73bf-h705nv.svg',
      // galleryDocs: [
      //   'https://utfs.io/f/de365f96-df59-4fa6-a72a-084f9bd3b7dc-efmypw.svg',
      //   'https://utfs.io/f/79201a40-9c35-4c41-80b4-ba84035d6122-dk6j3t.svg'
      // ]
    },
    resolver: zodResolver(exampleFormSchema)
  })

  const handleSubmit = (data: FieldValues) => {
    console.log('submitted', data)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const f = Array.from(frameworkData)
    const [reorderedItem] = f.splice(result.source.index, 1)
    f.splice(result.destination.index, 0, reorderedItem)

    setFrameworkData(f)
  }

  // useEffect(() => {
  //   // artificial delay
  //   setFrameworkIsLoading(true)
  //   setTimeout(() => {
  //     setFrameworkData(postType)
  //     setFrameworkIsLoading(false)
  //   }, 5000)
  // }, [postType])

  return (
    <Form {...form} schema={exampleFormSchema}>
      <div className='text-lg'>Form Component Example Implementation</div>

      <div className='my-5'>{JSON.stringify(form.watch(), null, 2)}</div>

      <form className='my-5 space-y-2' onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField control={form.control} name='email' label='Email' extendedProps={{ inputProps: { placeholder: 'Email' } }} />

        <DatePickerField
          control={form.control}
          name='date'
          label='Date'
          extendedProps={{
            calendarProps: { mode: 'single', fromYear: 1800, toYear: new Date().getFullYear(), captionLayout: 'dropdown-buttons' }
          }}
        />

        <MonthPickerField control={form.control} name='created' label='Date Created' />

        <TextAreaField control={form.control} name='description' label='Description' />

        <AutoResizeTextAreaField
          control={form.control}
          name='body'
          label='Body'
          extendedProps={{ autoResizeTextAreaProps: { maxHeight: 200 } }}
        />

        <ComboboxField data={refData} control={form.control} name='reference' label='Reference' />

        <SelectField data={postType} control={form.control} name='postType' label='Post Type' />

        <MultiSelectField data={framework} control={form.control} name='framework' label='Framework' />

        <RadioGroupField
          data={gender}
          control={form.control}
          name='gender'
          label='Gender'
          extendedProps={{ radioGroupProps: { className: 'flex gap-3' } }}
        />

        <CheckboxField control={form.control} name='isAgree' label='Accept terms and conditions' description='this is a checkbox field.' />

        <CheckboxGroupField
          data={favoriteColors}
          control={form.control}
          name='favoriteColor'
          label='Favorite Color'
          description='This is a sample checkbox group'
          extendedProps={{ checkboxGroupProps: { className: 'flex flex-wrap gap-3' } }}
        />

        <SwitchField
          control={form.control}
          layout='default'
          name='isDefault'
          label='Default Mode'
          description='This is a sample switch description.'
        />

        <div className='max-w-[200px]'>
          <SwitchField
            control={form.control}
            layout='centered'
            name='isDefault'
            label='Default Mode'
            description='This is a sample switch description.'
          />
        </div>

        <SwitchField
          control={form.control}
          layout='wide'
          name='isDefault'
          label='Default Mode'
          description='This is a sample switch description.'
        />

        <div className='flex gap-10'>
          <div className='w-full text-lg font-bold'>IMAGE UPLOADER</div>

          <ImageUploaderField
            control={form.control}
            name='profilePic'
            label='Profile Picture'
            extendedProps={{
              imageUploaderProps: {
                errorClassName: 'underline text-pink-500',
                inputContainerClassName: 'w-[400px] h-[400px]',
                isMultiple: false,
                display: null,
                unsupportedMimeTypes: ['image/svg+xml']
                // isLoading: true
                // isError: true
              }
            }}
          />

          <ImageUploaderField
            control={form.control}
            name='gallery'
            label='Gallery'
            extendedProps={{
              imageUploaderProps: {
                inputContainerClassName: 'w-[400px] h-[400px]',
                isMultiple: true,
                display: 'compact',
                unsupportedMimeTypes: ['image/svg+xml', 'image/png']
                // isLoading: true
                // isError: true
              }
            }}
          />
        </div>

        <div className='flex gap-10'>
          <div className='w-full text-lg font-bold'>FILE UPLOADER</div>

          <FileUploaderField
            control={form.control}
            name='doc'
            label='Document'
            type={['application/pdf']}
            extendedProps={{
              fileUploaderProps: {
                inputContainerClassName: 'w-[400px] h-[400px]'
                // isLoading: true
                // isError: true
              }
            }}
          />

          <FileUploaderField
            control={form.control}
            name='galleryDocs'
            label='Document'
            type={['application/pdf']}
            extendedProps={{
              fileUploaderProps: {
                inputContainerClassName: 'w-[400px] h-[400px]',
                isMultiple: true
                // isLoading: true
                // isError: true
              }
            }}
          />
        </div>

        <div className='mt-2'>
          <h1 className='text-lg font-bold'>Drop & Drop</h1>
          <div className='mb-3'>{JSON.stringify(frameworkData, null, 2)}</div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='frameworks'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='flex flex-col gap-2'>
                  {frameworkData.map((f, i) => (
                    <Draggable key={f.value} draggableId={f.value} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className='rounded-md bg-blue-300 p-5'
                        >
                          {f.value}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className='flex justify-end'>
          <Button className='mt-3' type='submit' variant='primary'>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
