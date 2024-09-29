import { z } from 'zod'

import { ppDate } from '@/constant'
import { dataTableSearchParamsSchema } from './data-table'

const { arg, params, schema } = ppDate

//* Schemas *//
export const getExperiencesFormSchema = dataTableSearchParamsSchema.extend({
  title: z.string().optional()
})

export const experienceFormSchema = z
  .object({
    id: z.string().min(1, { message: 'Please enter an id.' }),
    title: z.string().min(1, { message: 'Please enter a title.' }),
    description: z.string().min(1, { message: 'Please enter a description.' }),
    tags: z.array(z.string()).min(1, { message: 'Please enter at least one tag.' }),
    start: z.preprocess(arg, schema('start date'), params('start date')),
    end: z.preprocess(arg, schema('end date'), params('end date')).nullable()
  })
  .refine(
    (formObj) => {
      if (!formObj.end) return true
      if (formObj.start.getMonth() === formObj.end.getMonth() && formObj.start.getFullYear() === formObj.end.getFullYear()) return true
      if (formObj.start < formObj.end) return true
    },
    { message: 'End date should be greater than start date.', path: ['end'] }
  )

//* Types *//
export type ExperienceForm = z.infer<typeof experienceFormSchema>
