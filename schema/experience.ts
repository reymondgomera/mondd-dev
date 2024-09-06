import { z } from 'zod'

import { ppDate } from '@/constant'

const { arg, params, schema } = ppDate

export const experienceFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  title: z.string().min(1, { message: 'Please enter a title.' }),
  description: z.string().min(1, { message: 'Please enter a description.' }),
  tags: z.array(z.string()).min(1, { message: 'Please enter at least one tag.' }),
  start: z.preprocess(arg, schema('start date'), params('start date')),
  end: z.preprocess(arg, schema('end date'), params('end date'))
})

//* Types *//
export type ExperienceForm = z.infer<typeof experienceFormSchema>
