import { auth } from '@/auth'
import { createMiddleware } from 'next-safe-action'

import { getUserById } from '@/actions'
import { returnServerActionError } from '.'

export const authenticationMiddleware = createMiddleware().define(async ({ next }) => {
  const session = await auth()

  if (!session || !session.user) throw returnServerActionError({ code: 401, message: 'Unauthorized!', action: 'AUTHENTICATION_MIDDLEWARE' })

  const user = await getUserById(session.user.id)

  if (!user) throw returnServerActionError({ code: 401, message: 'Unauthorized!', action: 'AUTHENTICATION_MIDDLEWARE' })

  return next({ ctx: { userId: session.user.id, role: session.user.roleCode, isOAuth: session.user.isOAuth } })
})

export const authorizationMiddleware = createMiddleware<{ ctx: { userId: string; role: string | null } }>().define(
  async ({ ctx, next }) => {
    const { role } = ctx

    if (role === null || role !== 'admin') {
      throw returnServerActionError({ code: 403, message: 'Forbidden!', action: 'AUTHORIZATION_MIDDLEWARE' })
    }

    return next()
  }
)
