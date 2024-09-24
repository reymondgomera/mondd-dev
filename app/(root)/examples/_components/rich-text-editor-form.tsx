'use client'

import { z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { useState } from 'react'

import { editorDefaultContent } from '@/components/rich-text-editor/editor-default-content'
import { zodResolver } from '@hookform/resolvers/zod'
import RichTextEditorField from '@/components/form/rich-text-editor-field'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const EditorHtmlContent = dynamic(() => import('@/components/rich-text-editor/editor-html-content'), { ssr: false })

const exampleFormSchema = z.object({
  content: z.string().min(1, { message: 'Please enter content.' })
})

type ExampleForm = z.infer<typeof exampleFormSchema>

const handleSubmit = (data: FieldValues) => {
  console.log('submitted', data)
}

export default function RichTextEditorForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ExampleForm>({
    mode: 'onChange',
    defaultValues: { content: JSON.stringify(editorDefaultContent) },
    resolver: zodResolver(exampleFormSchema)
  })

  return (
    <Form {...form} schema={exampleFormSchema}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <RichTextEditorField control={form.control} name='content' label='content' extendedProps={{ richTextEditorProps: { isLoading } }} />

        <div className='flex justify-end'>
          <Button className='mr-2 mt-4' variant='base-primary'>
            Submit
          </Button>
          <Button type='button' className='mt-4' variant='ghost' onClick={() => setIsLoading((prev) => !prev)}>
            Toggle Loading
          </Button>
        </div>

        <EditorHtmlContent value={form.watch('content')} />
      </form>
    </Form>
  )
}
