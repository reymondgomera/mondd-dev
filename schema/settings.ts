import { z } from 'zod'

//* Schema *//
export const settingsFormSchema = z
  .object({
    image: z.string().optional(),
    name: z.string().min(1, { message: 'Please enter a name' }).optional(),
    email: z.string().min(1, { message: 'Please enter an email' }).email().optional(),
    password: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' }).optional(),
    newPassword: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' }).optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    formData: z.any()
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    { message: 'Please enter a new password.', path: ['newPassword'] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    { message: 'Please enter a current password.', path: ['password'] }
  )

export type SettingsForm = z.infer<typeof settingsFormSchema>
