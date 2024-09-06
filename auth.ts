import { JWT } from 'next-auth/jwt'
import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from './lib'
import authConfig from './auth.config'
import { getAccountByUserId, getUserById } from './actions'

//* module augmentation for next-auth
export type ExtendedUser = {
  id: string
  name: string | null
  email: string
  roleCode: string | null
  image: string | null | undefined
  emailVerified: Date | null
  isTwoFactorEnabled: boolean
  isTwoFactorVerified: boolean | null
  isOAuth: boolean
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: ExtendedUser
  }
}

export const callbacks: NextAuthConfig['callbacks'] = {
  signIn: async ({ user, account }) => {
    if (!user || !user.id) return false

    //* allow OAuth accounts to sign in without email verification
    if (account?.provider !== 'credentials') return true

    const existingUser = await getUserById(user.id)

    //* not allow users to sign in without email verification
    if (!existingUser?.emailVerified) return false

    return true
  },
  jwt: async ({ token, session, trigger }) => {
    if (!token.sub) return token

    const existingUser = await getUserById(token.sub)

    if (!existingUser) return token

    const existingAccount = await getAccountByUserId(existingUser.id)

    const { id, name, email, image, roleCode, emailVerified, isTwoFactorEnabled, isTwoFactorVerified } = existingUser

    token.user = { id, name, email, roleCode, image, emailVerified, isTwoFactorEnabled, isTwoFactorVerified, isOAuth: !!existingAccount }

    if (trigger === 'update') token.user = session.user as ExtendedUser

    return token
  },
  session: ({ token, session }) => {
    if (token.user) session.user = token.user
    return session
  }
}

//* split auth configuration for edge compatibility since Prisma ORM does not support it yet
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks,
  events: {
    createUser: async ({ user }) => {
      const role = await db.reference.findFirst({ where: { entityCode: 'user-role', isDefault: true } })

      if (role) {
        await db.user.update({
          where: { id: user.id },
          data: { roleCode: role.code }
        })
      }
    },
    signOut: async (message) => {
      if (message && 'token' in message && message.token && message.token.sub) {
        await db.user.update({
          where: { id: message.token.sub },
          data: { isTwoFactorVerified: null }
        })
      }
    },
    linkAccount: async ({ user }) => {
      //* update emailVerified for oAuth accounts
      // * then events is fired when an account in a given provider is linked to a user in our user database. (e.g sign up with Google or Github etc)
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  pages: {
    signIn: '/signin',
    error: '/auth-error'
  },
  ...authConfig
})
