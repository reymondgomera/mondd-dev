import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { signinFormSchema } from '@/schema'
import { db } from './lib'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const validatedFields = signinFormSchema.safeParse(credentials)

          if (validatedFields.success) {
            const { email, password } = validatedFields.data

            const user = await db.user.findUnique({ where: { email } })

            if (!user || !user.password) return null

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (isPasswordMatch) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image
              }
            }
          }

          return null
        } catch (error) {
          return null
        }
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ]
} satisfies NextAuthConfig
