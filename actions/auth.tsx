'use server'

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
import { action, db, getServerActionError, resend, returnServerActionError, returnServerActionSuccess } from '@/lib'
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
import { getUserByEmail, getUserByPendingEmail } from './user'
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

    const existingUser = (await getUserByEmail(email)) || (await getUserByPendingEmail(email))

    if (existingUser) return returnServerActionError({ code: 409, message: 'Email already in use!', action: 'SIGNUP_USER' })

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const role = await db.reference.findFirst({ where: { entityCode: 'user-role', isDefault: true } })

    await db.user.create({ data: { name, email, password: hashedPassword, ...(role && { roleCode: role.code }) } })

    //* Send Email Verification
    const verificationToken = await generateVerificationToken(email)

    const emailData = await resend.emails.send({
      from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
      to: verificationToken.email,
      subject: 'Confirm Your Email Address',
      react: <EmailConfirmationEmail token={verificationToken.token} expires={verificationToken.expiresAt} />
    })

    if (emailData.data) return returnServerActionSuccess({ message: 'Confirmation email has been sent.' })

    return returnServerActionError({ code: 500, message: 'Failed to send email!', action: 'SIGNUP_USER' })
  } catch (err) {
    return getServerActionError(err, 'SIGNUP_USER')
  }
})

const signinUser = action.schema(signinFormSchema).action(async ({ parsedInput: data }) => {
  const { email, password, callbackUrl } = data

  const user = await getUserByEmail(email)

  if (!user || !user.email || !user.password) {
    return returnServerActionError({ code: 401, message: 'User does not exist!', action: 'SIGNIN_USER' })
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(email)

    const emailData = await resend.emails.send({
      from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
      to: verificationToken.email,
      subject: 'Confirm Your Email Address',
      react: <EmailConfirmationEmail token={verificationToken.token} expires={verificationToken.expiresAt} />
    })

    if (emailData.data) {
      return returnServerActionSuccess({ message: 'Confirmation email has been sent.', data: { twoFactor: false } })
    }

    return returnServerActionError({ code: 500, message: 'Failed to send email!', action: 'SIGNIN_USER' })
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
        from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
        to: twoFactorToken.email,
        subject: 'Two Factor Authentication',
        react: <TwoFactorAuthEmail token={twoFactorToken.token} expires={twoFactorToken.expiresAt} />
      })

      if (emailData.data) {
        return returnServerActionSuccess({ data: { twoFactor: true }, message: 'Two factor authentication email has been sent.' })
      }

      return returnServerActionError({ code: 500, message: 'Failed to send two factor authentication email!', action: 'SIGNIN_USER' })
    }
  } catch (err) {
    if (err instanceof AuthError) {
      const authError = err as any

      //* this is a workaround for getting CredentialSignin auth error, because it was changed next-auth 5.0.0-beta.19
      switch (authError?.cause?.err?.code) {
        case 'credentials':
          return returnServerActionError({ code: 401, data: { twoFactor: false }, message: 'Invalid credentials!', action: 'SIGNIN_USER' })
        default:
          return returnServerActionError({
            code: 500,
            data: { twoFactor: false },
            message: 'Failed to sign in! Please try again later.',
            action: 'SIGNIN_USER'
          })
      }
    }

    throw err //* need to throw error here else redirect not working for some reason in auth.js
  }
})

const resendCode = action.schema(resendCodeFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.email) return returnServerActionError({ code: 401, message: 'User does not exist!', action: 'RESEND_CODE' })

    const user = await getUserByEmail(data.email)

    if (!user || !user.email) return returnServerActionError({ code: 401, message: 'User does not exist!', action: 'RESEND_CODE' })

    //* send 2FA email if user has 2FA enabled
    if (user.isTwoFactorEnabled && user.email) {
      const twoFactorToken = await generateTwoFactorToken(user.email)

      const emailData = await resend.emails.send({
        from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
        to: twoFactorToken.email,
        subject: 'Two Factor Authentication',
        react: <TwoFactorAuthEmail token={twoFactorToken.token} expires={twoFactorToken.expiresAt} />
      })

      if (emailData.data) {
        return returnServerActionSuccess({ data: { twoFactor: true }, message: 'Two factor authentication email has been sent.' })
      }
    }

    return returnServerActionError({ code: 500, message: 'Failed to resend two factor authentication email!', action: 'RESEND_CODE' })
  } catch (err) {
    return getServerActionError(err, 'RESEND_CODE')
  }
})

const verifyEmail = action.schema(verifyEmailFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.token) return returnServerActionError({ code: 400, message: 'Missing token!', action: 'VERIFY_EMAIL' })

    const existingToken = await getVerificationTokenByToken(data.token)

    if (!existingToken) return returnServerActionError({ code: 400, message: 'Invalid token!', action: 'VERIFY_EMAIL' })

    const hasExpired = new Date(existingToken.expiresAt) < new Date()

    if (hasExpired) return returnServerActionError({ code: 401, message: 'Token has expired!', action: 'VERIFY_EMAIL' })

    const user = (await getUserByEmail(existingToken.email)) || (await getUserByPendingEmail(existingToken.email))

    if (!user) return returnServerActionError({ code: 401, message: 'Email does not exist!', action: 'VERIFY_EMAIL' })

    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
        pendingEmail: null
      }
    })

    await db.verificationToken.delete({ where: { id: existingToken.id } })

    return returnServerActionSuccess({ message: 'Email has been verified.' })
  } catch (err) {
    return getServerActionError(err, 'VERIFY_EMAIL')
  }
})

const verifyTwoFactorCode = action.schema(verifyTwoFactorCodeFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.code) return returnServerActionError({ code: 400, message: 'Missing code!', action: 'VERIFY_TWO_FACTOR_CODE' })

    const twoFactorToken = await getTwoFactorTokenByEmail(data.email)

    if (!twoFactorToken) return returnServerActionError({ code: 400, message: 'Invalid code!', action: 'VERIFY_TWO_FACTOR_CODE' })

    if (twoFactorToken.token !== data.code) {
      return returnServerActionError({ code: 400, message: 'Invalid code!', action: 'VERIFY_TWO_FACTOR_CODE' })
    }

    const hasExpired = new Date(twoFactorToken.expiresAt) < new Date()

    if (hasExpired) return returnServerActionError({ code: 401, message: 'Code has expired!', action: 'VERIFY_TWO_FACTOR_CODE' })

    const user = await getUserByEmail(twoFactorToken.email)

    if (!user) return returnServerActionError({ code: 401, message: 'Email does not exist!', action: 'VERIFY_TWO_FACTOR_CODE' })

    await new Promise((resolve) => setTimeout(resolve, 1000)) //* simulate delay for better UI/UX

    await db.user.update({
      where: { id: user.id },
      data: { isTwoFactorVerified: true }
    })

    await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

    return returnServerActionSuccess({ message: 'Two factor code has been verified.' })
  } catch (err) {
    return getServerActionError(err, 'VERIFY_TWO_FACTOR_CODE')
  }
})

const forgotPassword = action.schema(forgotPasswordFormSchema).action(async ({ parsedInput: data }) => {
  try {
    const { email } = data

    const user = await getUserByEmail(email)

    if (!user) return returnServerActionError({ code: 400, message: 'Email does not exist!', action: 'FORGOT_PASSWORD' })

    const passwordResetToken = await generatePasswordResetToken(email)

    const emailData = await resend.emails.send({
      from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
      to: passwordResetToken.email,
      subject: 'Reset your password',
      react: <PasswordResetEmail token={passwordResetToken.token} expires={passwordResetToken.expiresAt} />
    })

    if (emailData.data) return returnServerActionSuccess({ message: 'Password reset email has been sent.' })

    return returnServerActionError({ code: 500, message: 'Failed to send email!', action: 'FORGOT_PASSWORD' })
  } catch (err) {
    return getServerActionError(err, 'FORGOT_PASSWORD')
  }
})

const resetPassword = action.schema(resetPasswordFormSchema).action(async ({ parsedInput: data }) => {
  try {
    if (!data.token) return returnServerActionError({ code: 400, message: 'Missing token!', action: 'RESET_PASSWORD' })

    const existingToken = await getPasswordResetTokenByToken(data.token)

    if (!existingToken) return returnServerActionError({ code: 400, message: 'Invalid token!', action: 'RESET_PASSWORD' })

    const hasExpired = new Date(existingToken.expiresAt) < new Date()

    if (hasExpired) return returnServerActionError({ code: 401, message: 'Token has expired!', action: 'RESET_PASSWORD' })

    const user = await getUserByEmail(existingToken.email)

    if (!user || !user.password) return returnServerActionError({ code: 401, message: 'Email does not exist!', action: 'RESET_PASSWORD' })

    const isPreviousPassword = await bcrypt.compare(data.password, user.password)

    if (isPreviousPassword) {
      return returnServerActionError({ code: 400, message: 'Password cannot be the same as old password!', action: 'RESET_PASSWORD' })
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    await db.passwordResetToken.delete({ where: { id: existingToken.id } })

    return returnServerActionSuccess({ message: 'Password has been reset.' })
  } catch (err) {
    return getServerActionError(err, 'RESET_PASSWORD')
  }
})

export { signupUser, signinUser, verifyEmail, verifyTwoFactorCode, resendCode, forgotPassword, resetPassword }
