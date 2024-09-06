import { isValid } from 'date-fns'
import { RawCreateParams, RefinementCtx, z } from 'zod'

export const ppDate = {
  arg: (value: unknown, ctx: RefinementCtx): Date => {
    if (typeof value === 'string' && isValid(new Date(value))) return new Date(value)

    if (!(value instanceof Date)) {
      ctx.addIssue({
        code: 'invalid_type',
        received: typeof value,
        expected: 'date'
      })
    }

    return value as Date
  },
  schema: (name: string) => {
    return z.date({
      errorMap: (issue, ctx) => {
        if (issue.code === 'invalid_date' || issue.code === 'invalid_type') return { message: `Please enter a valid ${name ?? 'date'}.` }
        else return { message: ctx.defaultError }
      }
    })
  },
  params: (name?: string): RawCreateParams => {
    return {
      required_error: `Please enter ${name ?? 'date'}.`
    }
  }
}
