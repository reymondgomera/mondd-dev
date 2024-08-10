'use server'

import createError from 'http-errors'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

import {
  forgotPasswordFormSchema,
  resendCodeFormSchema,
  resetPasswordFormSchema,
  signinFormSchema,
  signupFormSchema,
  verifyEmailFormSchema,
  verifyTwoFactorCodeFormSchema
} from '@/schema'
import { HttpSuccess } from '@/types'
import { action, db, resend, resolveAppError } from '@/lib'
import { auth, signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/constant'
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getTwoFactorTokenByEmail,
  getVerificationTokenByToken
} from './token'
import { getUserByEmail } from './user'
import EmailConfirmationEmail from '@/components/email/email-confirmation'
import PasswordResetEmail from '@/components/email/password-reset'
import TwoFactorAuthEmail from '@/components/email/two-factor-auth'

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

const signupUser = action.schema(signupFormSchema).action(async ({ parsedInput: data }) => {
  try {
    const { name, email } = data

    const existingUser = await getUserByEmail(email)

    if (existingUser) throw createError(409, 'Email already in use!', { action: 'SIGNUP_USER' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    const role = await db.reference.findFirst({ where: { entityCode: 'user-role', isDefault: true } })

    await db.user.create({ data: { name, email, password: hashedPassword, ...(role && { roleCode: role.code }) } })

    //* Send Email Verification
    const verificationToken = await generateVerificationToken(email)

    const emailData = await resend.emails.send({
      from: 'mond.dev <onboarding@resend.dev>',
      to: verificationToken.email,
      subject: 'Confirm Your Email Address',
      react: <EmailConfirmationEmail token={verificationToken.token} expires={verificationToken.expiresAt} />
    })

    if (emailData.data) return { statusCode: 200, message: 'Confirmation email has been sent.' } as HttpSuccess

    throw createError(500, 'Failed to send email!', { action: 'SIGNUP_USER' })
  } catch (err) {
    throw resolveAppError(err, 'SIGNUP_USER')
  }
})

const signinUser = action.schema(signinFormSchema).action(async ({ parsedInput: data }) => {
  const { email, password, callbackUrl } = data

  const user = await getUserByEmail(email)

  if (!user || !user.email || !user.password) throw createError(401, 'User does not exist!', { action: 'SIGNIN_USER' })

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    const emailData = await resend.emails.send({
      from: 'mond.dev <onboarding@resend.dev>',
      to: verificationToken.email,
      subject: 'Confirm Your Email Address',
      react: <EmailConfirmationEmail token={verificationToken.token} expires={verificationToken.expiresAt} />
    })

    if (emailData.data) {
      return { statusCode: 200, data: { twoFactor: false }, message: 'Confirmation email has been sent.' } as HttpSuccess<{
        twoFactor: boolean
      }>
    }

    throw createError(500, 'Failed to send email!', { action: 'SIGNIN_USER' })
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: user.isTwoFactorEnabled ? false : true,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    })

    //* send 2FA email if user has 2FA enabled
    if (user.isTwoFactorEnabled && user.email) {
      const twoFactorToken = await generateTwoFactorToken(user.email)

      const emailData = await resend.emails.send({
        from: 'mond.dev <onboarding@resend.dev>',
        to: twoFactorToken.email,
        subject: 'Two Factor Authentication',
        react: <TwoFactorAuthEmail token={twoFactorToken.token} expires={twoFactorToken.expiresAt} />
      })

      if (emailData.data) {
        return {
          statusCode: 200,
          data: { twoFactor: true },
          message: 'Two factor authentication email has been sent.'
        } as HttpSuccess<{ twoFactor: boolean }>
      }

      throw createError(500, 'Failed to send two factor authentication email!', { action: 'SIGNIN_USER' })
    }
  } catch (err) {
    if (err instanceof AuthError) {
      const authError = err as any

      // this is a workaround for getting CredentialSignin auth error, because it was changed next-auth 5.0.0-beta.19
      switch (authError?.cause?.err?.code) {
        case 'credentials':
          return { statusCode: 401, data: { twoFactor: false }, message: 'Invalid credentials!' }
        default:
          return { statusCode: 500, data: { twoFactor: false }, message: 'Failed to sign in! Please try again later.' }
      }
    }

    throw err
  }
})

const resendCode = action.schema(resendCodeFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.email) throw createError(401, 'User does not exist!', { action: 'RESEND_CODE' })

    const user = await getUserByEmail(data.email)

    if (!user || !user.email) throw createError(401, 'User does not exist!', { action: 'RESEND_CODE' })

    //* send 2FA email if user has 2FA enabled
    if (user.isTwoFactorEnabled && user.email) {
      const twoFactorToken = await generateTwoFactorToken(user.email)

      const emailData = await resend.emails.send({
        from: 'mond.dev <onboarding@resend.dev>',
        to: twoFactorToken.email,
        subject: 'Two Factor Authentication',
        react: <TwoFactorAuthEmail token={twoFactorToken.token} expires={twoFactorToken.expiresAt} />
      })

      if (emailData.data) {
        return {
          statusCode: 200,
          data: { twoFactor: true },
          message: 'Two factor authentication email has been sent.'
        } as HttpSuccess<{ twoFactor: boolean }>
      }
    }

    throw createError(500, 'Failed to resend two factor authentication email!', { action: 'SIGNIN_USER' })
  } catch (err) {
    throw resolveAppError(err, 'RESEND_CODE')
  }
})

const verifyEmail = action.schema(verifyEmailFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.token) throw createError(400, 'Missing token!', { action: 'VERIFY_EMAIL' })

    const existingToken = await getVerificationTokenByToken(data.token)

    if (!existingToken) throw createError(400, 'Invalid token!', { action: 'VERIFY_EMAIL' })

    const hasExpired = new Date(existingToken.expiresAt) < new Date()

    if (hasExpired) throw createError(401, 'Token has expired!', { action: 'VERIFY_EMAIL' })

    const user = await getUserByEmail(existingToken.email)

    if (!user) throw createError(401, 'Email does not exist!', { action: 'VERIFY_EMAIL' })

    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    })

    await db.verificationToken.delete({ where: { id: existingToken.id } })

    return { statusCode: 200, message: 'Email has been verified.' } as HttpSuccess
  } catch (err) {
    throw resolveAppError(err, 'VERIFY_EMAIL')
  }
})

const verifyTwoFactorCode = action.schema(verifyTwoFactorCodeFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.code) throw createError(400, 'Missing code!', { action: 'VERIFY_TWO_FACTOR_CODE' })

    const twoFactorToken = await getTwoFactorTokenByEmail(data.email)

    if (!twoFactorToken) throw createError(400, 'Invalid code!', { action: 'VERIFY_TWO_FACTOR_CODE' })

    if (twoFactorToken.token !== data.code) throw createError(400, 'Invalid code!', { action: 'VERIFY_TWO_FACTOR_CODE' })

    const hasExpired = new Date(twoFactorToken.expiresAt) < new Date()

    if (hasExpired) throw createError(401, 'Code has expired!', { action: 'VERIFY_TWO_FACTOR_CODE' })

    const user = await getUserByEmail(twoFactorToken.email)

    if (!user) throw createError(401, 'Email does not exist!', { action: 'VERIFY_TWO_FACTOR_CODE' })

    await new Promise((resolve) => setTimeout(resolve, 1000)) //* simulate delay for better UI/UX

    await db.user.update({
      where: { id: user.id },
      data: { isTwoFactorVerified: true }
    })

    await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

    return { statusCode: 200, message: 'Two factor code has been verified.' } as HttpSuccess
  } catch (err) {
    throw resolveAppError(err, 'VERIFY_TWO_FACTOR_CODE')
  }
})

const forgotPassword = action.schema(forgotPasswordFormSchema).action(async ({ parsedInput: data }) => {
  try {
    const { email } = data

    const user = await getUserByEmail(email)

    if (!user) throw createError(400, 'Email does not exist!', { action: 'FORGOT_PASSWORD' })

    const passwordResetToken = await generatePasswordResetToken(email)

    const emailData = await resend.emails.send({
      from: 'mond.dev <onboarding@resend.dev>',
      to: passwordResetToken.email,
      subject: 'Reset your password',
      react: <PasswordResetEmail token={passwordResetToken.token} expires={passwordResetToken.expiresAt} />
    })

    if (emailData.data) return { statusCode: 200, message: 'Password reset email has been sent.' } as HttpSuccess

    throw createError(500, 'Failed to send email!', { action: 'FORGOT_PASSWORD' })
  } catch (err) {
    throw resolveAppError(err, 'FORGOT_PASSWORD')
  }
})

const resetPassword = action.schema(resetPasswordFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.token) throw createError(400, 'Missing token!', { action: 'RESET_PASSWORD' })

    const existingToken = await getPasswordResetTokenByToken(data.token)

    if (!existingToken) throw createError(400, 'Invalid token!', { action: 'RESET_PASSWORD' })

    const hasExpired = new Date(existingToken.expiresAt) < new Date()

    if (hasExpired) throw createError(401, 'Token has expired!', { action: 'RESET_PASSWORD' })

    const user = await getUserByEmail(existingToken.email)

    if (!user || !user.password) throw createError(401, 'Email does not exist!', { action: 'RESET_PASSWORD' })

    const isPreviousPassword = await bcrypt.compare(data.password, user.password)

    if (isPreviousPassword) throw createError(400, 'Password cannot be the same as old password!', { action: 'RESET_PASSWORD' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    await db.passwordResetToken.delete({ where: { id: existingToken.id } })

    return { statusCode: 200, message: 'Password has been reset.' } as HttpSuccess
  } catch (err) {
    throw resolveAppError(err, 'RESET_PASSWORD')
  }
})

export { signupUser, signinUser, verifyEmail, verifyTwoFactorCode, resendCode, forgotPassword, resetPassword }
