import { z } from 'zod'

//* Schemas *//
export const signinFormSchema = z.object({
  callbackUrl: z.string().nullable(),
  email: z.string().min(1, { message: 'Please enter an email address.' }).email(),
  password: z.string().min(1, { message: 'Please enter a password.' })
})

export const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter a name.' }),
    email: z.string().min(1, { message: 'Please enter an email address.' }).email(),
    password: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' }),
    confirmPassword: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' })
  })
  .refine((formObj) => formObj.password === formObj.confirmPassword, { message: "Password don't match", path: ['confirmPassword'] })

export const forgotPasswordFormSchema = z.object({
  email: z.string().min(1, { message: 'Please enter an email address.' }).email()
})

export const newPasswordFormSchema = z
  .object({
    password: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' }),
    confirmPassword: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' })
  })
  .refine((formObj) => formObj.password === formObj.confirmPassword, { message: "Password don't match", path: ['confirmPassword'] })

export const verifyEmailFormSchema = z.object({ token: z.string() })

export const resendCodeFormSchema = z.object({ email: z.string().email().optional() })

export const verifyTwoFactorCodeFormSchema = z.object({
  code: z.string().min(1, { message: 'Please enter a code.' }).max(6, { message: 'Invalid code.' }),
  email: z.string().min(1, { message: 'Please enter an email address.' }).email()
})

export const resetPasswordFormSchema = z.object({
  token: z.string(),
  password: z.string().min(8, { message: 'Please enter a password with at least 8 characters.' })
})

//* Types *//
export type SigninForm = z.infer<typeof signinFormSchema>
export type SignupForm = z.infer<typeof signupFormSchema>
export type ResendCodeForm = z.infer<typeof resendCodeFormSchema>
export type VerifyEmailForm = z.infer<typeof verifyEmailFormSchema>
export type VerifyTwoFactorCodeForm = z.infer<typeof verifyTwoFactorCodeFormSchema>
export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>
export type NewPasswordForm = z.infer<typeof newPasswordFormSchema>
export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>
