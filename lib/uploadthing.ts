'use server'

import { UTApi } from 'uploadthing/server'
import { FileEsque } from 'uploadthing/types'
import { extractFileKeyFromUrl } from './utils'

const utapi = new UTApi()

type UploadFilesReturnType<T> = Promise<{
  [K in keyof T]: T[K] extends File
    ? string
    : T[K] extends File | null
      ? string | null
      : T[K] extends File[]
        ? string[]
        : T[K] extends File[] | null
          ? string[] | null
          : null
}>

export async function uploadFiles<T extends Record<string, File | File[] | null>>(files: T): UploadFilesReturnType<T> {
  const keys = Object.keys(files)
  const toUpload: (File | File[] | null)[] = []

  Object.values(files).forEach((file) => {
    if (file) toUpload.push(file)
    else toUpload.push(null)
  })

  const uploadedFiles = await Promise.all(
    toUpload.map((file) => {
      if (!file) return null
      if (Array.isArray(file)) return utapi.uploadFiles(file as FileEsque[])
      return utapi.uploadFiles(file as FileEsque)
    })
  )

  const result = uploadedFiles.reduce((acc, curr, index) => {
    if (curr && Array.isArray(curr)) {
      return {
        ...acc,
        [keys[index]]: curr
          .filter((file) => file.data)
          .map((file) => file.data?.url ?? '')
          .filter((url) => url !== '')
      }
    } else if (curr && curr.data) {
      return { ...acc, [keys[index]]: curr.data.url }
    } else return { ...acc, [keys[index]]: null }
  }, {})

  return result as UploadFilesReturnType<T>
}

export async function deleteFiles(urls: string[]) {
  const fileKeys = urls.map((url) => extractFileKeyFromUrl(url)).filter((key) => key !== '')
  await utapi.deleteFiles(fileKeys)
}
