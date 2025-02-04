import { z } from 'zod'
import { dataTableSearchParamsSchema } from './data-table'

//* Schemas *//
export const getSkillsFormSchema = dataTableSearchParamsSchema.extend({
  title: z.string().optional(),
  typeCode: z.string().optional(),
  isFavorite: z.string().optional()
})

export const skillFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  title: z.string().min(1, { message: 'Please enter a title.' }),
  typeCode: z.string().min(1, { message: 'Please select a skill type.' }),
  logo: z.string().min(1, { message: 'Please upload a logo' }),
  isFavorite: z.boolean().default(false),
  formData: z.any()
})

export const toggleSkillFavoriteFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  isFavorite: z.boolean().default(false)
})

// * Types *//
export type SkillForm = z.infer<typeof skillFormSchema>
export type ToggleSkillFavoriteForm = z.infer<typeof toggleSkillFavoriteFormSchema>
