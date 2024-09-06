'use server'

import { Experience } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { action, db, getServerActionError } from '@/lib'
import { authenticationMiddleware, authorizationMiddleware } from '@/lib/safe-action-middleware'
import { paramsFormSchema, experienceFormSchema } from '@/schema'

export async function getExperiences() {
  return await db.experience.findMany({
    orderBy: { start: 'desc' }
  })
}

export async function getExperienceById(id: string) {
  try {
    return await db.experience.findUnique({ where: { id } })
  } catch (err) {
    return null
  }
}

const createOrUpdateExperience = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(experienceFormSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput

    let isRedirect = false
    let result: Experience | undefined

    try {
      if (id == 'new') {
        const createdExperience = await db.experience.create({ data })

        isRedirect = true
        result = createdExperience
      } else {
        const updatedExperience = await db.experience.update({
          where: { id },
          data
        })

        result = updatedExperience
      }
    } catch (err) {
      return getServerActionError(err, 'CREATE_OR_UPDATE_EXPERIENCE')
    }

    if (isRedirect && result) redirect(`/dashboard/experience/${result.id}`)
    revalidatePath(`/dashboard/experience/${result.id}`)
  })

const deleteExperience = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(paramsFormSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      await db.experience.delete({ where: { id: data.id } })

      revalidatePath(`/dashboard/experience`)
    } catch (err) {
      return getServerActionError(err, 'DELETE_EXPERIENCE')
    }
  })

export { createOrUpdateExperience, deleteExperience }
