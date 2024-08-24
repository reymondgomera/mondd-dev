'use server'

import { utapi } from '@/lib/uploadthing'

export const onUpload = async (formData: FormData) => {
  const file = formData.get('file') as File
  const uploaded = await utapi.uploadFiles(file)

  return uploaded.data?.url
}

export const onDelete = async (key: string) => {
  await utapi.deleteFiles(key)
}
