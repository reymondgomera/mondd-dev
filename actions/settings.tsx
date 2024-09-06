'use server'

import bcrypt from 'bcryptjs'

import { unstable_update } from '@/auth'
import { settingsFormSchema } from '@/schema'
import { getUserByEmail, getUserById } from './user'
import { generateVerificationToken } from './token'
import { authenticationMiddleware } from '@/lib/safe-action-middleware'
import EmailConfirmationEmail from '@/components/email/email-confirmation'
import {
  action,
  db,
  getServerActionError,
  resend,
  returnServerActionError,
  returnServerActionSuccess,
  deleteFiles,
  uploadFiles
} from '@/lib'

const updateSettings = action
  .use(authenticationMiddleware)
  .schema(settingsFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    let { formData: formValues, ...data } = parsedInput
    const { userId, isOAuth } = ctx

    try {
      const formData = formValues as FormData
      const user = await getUserById(userId)

      if (!user) return returnServerActionError({ code: 401, message: 'User does not exist!', action: 'UPDATE_SETTINGS' })

      if (isOAuth) {
        data.email = undefined
        data.isTwoFactorEnabled = undefined
        data.password = undefined
        data.newPassword = undefined
      }

      if (data.email && data.email !== user.email) {
        const existingUser = await getUserByEmail(data.email)

        if (existingUser && existingUser.id !== user.id) {
          return returnServerActionError({ code: 409, message: 'Email already in use!', action: 'UPDATE_SETTINGS' })
        }

        //* Send Email Verification
        const verificationToken = await generateVerificationToken(data.email)

        const emailData = await resend.emails.send({
          from: `mond.dev <${process.env.RESEND_EMAIL_SENDER}>`,
          to: verificationToken.email,
          subject: 'Confirm Your Email Address',
          react: <EmailConfirmationEmail token={verificationToken.token} expires={verificationToken.expiresAt} />
        })

        if (emailData.data) {
          await db.user.update({
            where: { id: user.id },
            data: { pendingEmail: verificationToken.email }
          })

          return returnServerActionSuccess({ data: { confirmEmail: true }, message: 'Confirmation email has been sent' })
        }

        return returnServerActionError({ code: 500, message: 'Failed to send email!', action: 'UPDATE_SETTINGS' })
      }

      if (data.password && data.newPassword && user.password) {
        const isPasswordMatch = await bcrypt.compare(data.password, user.password)

        if (!isPasswordMatch) return returnServerActionError({ code: 400, message: 'Incorrect password!', action: 'UPDATE_SETTINGS' })

        const hashedPassword = await bcrypt.hash(data.newPassword, 10)

        data.password = hashedPassword
        data.newPassword = undefined
      }

      //* get file value from formData
      const files = {
        image: formData.get('image') as File | null
      }

      //* get url for deletion
      const isImageUrlProvidedByProvider = user.image && !user.image.startsWith('https://utfs.io') ? true : false
      const imageUrl = user.image ? (!isImageUrlProvidedByProvider ? user.image : '') : ''

      //* delete uploaded file then reupload, for simplicity of updating
      await deleteFiles([imageUrl])

      //* upload new file
      const { image } = await uploadFiles(files)

      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: {
          ...data,
          image: image ? image : isImageUrlProvidedByProvider ? user.image : null,
          isTwoFactorVerified: data.isTwoFactorEnabled ? true : null
        }
      })

      await unstable_update({
        user: {
          email: updatedUser.email,
          name: updatedUser.name,
          image: updatedUser.image,
          isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
          isTwoFactorVerified: updatedUser.isTwoFactorEnabled
        }
      })

      return returnServerActionSuccess({ message: 'Account updated successfully!' })
    } catch (err) {
      return getServerActionError(err, 'UPDATE_SETTINGS')
    }
  })

export { updateSettings }
