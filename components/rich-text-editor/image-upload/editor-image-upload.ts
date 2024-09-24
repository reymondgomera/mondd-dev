import { toast } from 'sonner'

import { onUpload } from '@/actions'
import { createImageUpload } from '@/editor/plugins'
import { v4 as uuidv4 } from 'uuid'

export const uploadFn = (limit: number) => {
  return createImageUpload({
    onUpload: (file) => {
      const formData = new FormData()
      formData.append('file', file, uuidv4())

      return onUpload(formData)
    },
    validateFn: (file) => {
      if (!file.type.includes('image/')) {
        toast.error('File type not supported. ')
        return false
      } else if (file.size / 1024 / 1024 > limit) {
        toast.error(`File size too big (max ${limit}MB).`)
        return false
      }
      return true
    }
  })
}
