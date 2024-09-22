import { z } from 'zod'

//* Schemas *//
export const paramsFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' })
})

export const tagFormSchema = z.object({ tag: z.string().min(1, { message: 'Please enter a tag.' }).toLowerCase() })

export type ParamsForm = z.infer<typeof paramsFormSchema>
export type TagForm = z.infer<typeof tagFormSchema>
