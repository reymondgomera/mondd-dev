'use server'

import { db, resolveAppError } from '@/lib'

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email: email } })

    return user
  } catch (error) {
    throw resolveAppError(error, 'GET_USER_BY_EMAIL')
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({ where: { id } })

    return user
  } catch (err) {
    throw resolveAppError(err, 'GET_USER_BY_ID')
  }
}

export async function getAccountByUserId(userId: string) {
  try {
    const account = await db.account.findFirst({ where: { userId } })

    return account
  } catch (err) {
    return null
  }
}
