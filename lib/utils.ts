import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getInitials = (str: string, limit: number = 2) => {
  if (!str) return ''

  return str.split(/\s/).reduce((response, word, index) => {
    if (index < limit) response += word.slice(0, 1)
    return response
  }, '')
}

export function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export async function getFileFromBlobUrl(url: string) {
  const res = await axios.get(url, { responseType: 'blob' })
  const blob = res.data as Blob

  return new File([blob], uuidv4(), { type: blob.type })
}

export function extractFileKeyFromUrl(url: string) {
  if (url) return url.split('/').pop() ?? ''
  return ''
}

export function formatMonthYear(date: Date) {
  return format(date, 'MMM yyyy', { locale: enUS })
}
