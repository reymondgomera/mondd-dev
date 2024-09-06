'use server'

import { db } from '@/lib'

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({ where: { email: email } })
  } catch (error) {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({ where: { id } })
  } catch (err) {
    return null
  }
}

export async function getAccountByUserId(userId: string) {
  try {
    return await db.account.findFirst({ where: { userId } })
  } catch (err) {
    return null
  }
}

export const getUserByPendingEmail = async (email: string) => {
  try {
    return await db.user.findFirst({
      where: {
        pendingEmail: email
      }
    })
  } catch {
    return null
  }
}
