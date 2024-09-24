import { z } from 'zod'

export const dataTableSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  advanced_filter: z
    .string()
    .transform((value) => value === 'true')
    .default('false')
})

export type DataTableSearchParams = z.infer<typeof dataTableSearchParamsSchema>
