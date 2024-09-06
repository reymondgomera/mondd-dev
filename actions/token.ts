'use server'

import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'

import { db } from '@/lib'

//* in seconds 3600 = 1 hour
const verificationTokenExpiration = process.env.VERIFICATION_TOKEN_EXPIRATION || 3600
const passwordResetTokenExpiration = process.env.PASSWORD_RESET_TOKEN_EXPIRATION || 1800
const twoFactorTokenExpiration = process.env.TWO_FACTOR_TOKEN_EXPIRATION || 3600

export async function getVerificationTokenByToken(token: string) {
  try {
    return await db.verificationToken.findUnique({ where: { token: token } })
  } catch (err) {
    return null
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    return await db.verificationToken.findFirst({ where: { email } })
  } catch (err) {
    return null
  }
}

export async function getPasswordResetTokenByToken(token: string) {
  try {
    return await db.passwordResetToken.findUnique({ where: { token } })
  } catch (err) {
    return null
  }
}

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    return await db.passwordResetToken.findFirst({ where: { email } })
  } catch (err) {
    return null
  }
}

export async function getTwoFactorTokenByToken(token: string) {
  try {
    return await db.twoFactorToken.findUnique({ where: { token: token } })
  } catch (err) {
    return null
  }
}

export async function getTwoFactorTokenByEmail(email: string) {
  try {
    return await db.twoFactorToken.findFirst({ where: { email } })
  } catch (err) {
    return null
  }
}

export async function generateVerificationToken(email: string) {
  const token = uuidv4()
  const expiresAt = new Date(new Date().getTime() + (verificationTokenExpiration as number) * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) await db.verificationToken.delete({ where: { id: existingToken.id } })

  return await db.verificationToken.create({ data: { email, expiresAt, token } })
}

export async function generatePasswordResetToken(email: string) {
  const token = uuidv4()
  const expiresAt = new Date(new Date().getTime() + (passwordResetTokenExpiration as number) * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) await db.passwordResetToken.delete({ where: { id: existingToken.id } })

  return await db.passwordResetToken.create({ data: { email, expiresAt, token } })
}

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expiresAt = new Date(new Date().getTime() + (twoFactorTokenExpiration as number) * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) await db.twoFactorToken.delete({ where: { id: existingToken.id } })

  return await db.twoFactorToken.create({ data: { email, expiresAt, token } })
}
