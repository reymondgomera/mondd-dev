'use server'

import { Skill } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { action, db, getServerActionError, returnServerActionError, returnServerActionSuccess, deleteFiles, uploadFiles } from '@/lib'
import { authenticationMiddleware, authorizationMiddleware } from '@/lib/safe-action-middleware'
import { paramsFormSchema, skillFormSchema, toggleSkillFavoriteFormSchema } from '@/schema'

export async function getSkills() {
  return await db.skill.findMany({
    select: { title: true, logo: true, isFavorite: true, typeCode: true },
    orderBy: { title: 'asc' }
  })
}

export async function getSkillById(id: string) {
  try {
    return await db.skill.findUnique({ where: { id } })
  } catch (err) {
    return null
  }
}

const createOrUpdateSkill = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(skillFormSchema)
  .action(async ({ parsedInput }) => {
    const { id, formData: formDataValues, ...data } = parsedInput

    let isRedirect = false
    let result: Skill | undefined

    try {
      const formData = formDataValues as FormData

      const skill = await db.skill.findUnique({ where: { id } })

      //* get file value from FormData
      const files = {
        logo: formData.get('logo') as File
      }

      //* only do deletion if doing update
      if (skill && id !== 'new') {
        //* get url for deletion
        const logoUrl = skill.logo

        //* delete uploaded file then reupload, for simplicity of updating
        await deleteFiles([logoUrl])
      }

      //* upload new file
      const { logo } = await uploadFiles(files)

      //* create or update skill
      if (id === 'new') {
        const createdSkill = await db.skill.create({ data: { ...data, logo } })

        isRedirect = true
        result = createdSkill
      } else {
        const updatedSkill = await db.skill.update({
          where: { id },
          data: { ...data, logo }
        })

        result = updatedSkill
      }
    } catch (err) {
      return getServerActionError(err, 'CREATE_OR_UPDATE_SKILL')
    }

    if (isRedirect && id === 'new' && result) redirect(`/dashboard/skill/${result.id}`)
    revalidatePath(`/dashboard/skill/${result.id}`)
  })

const deleteSkill = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(paramsFormSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const skill = await db.skill.findUnique({ where: { id: data.id } })

      //* check if skill is not existed
      if (!skill) return returnServerActionError({ code: 404, message: 'Skill not found!', action: 'DELETE_SKILL' })

      //* get url for deletion
      const logoUrl = skill.logo

      //* delete file
      await deleteFiles([logoUrl])

      //* delete skill
      await db.skill.delete({ where: { id: data.id } })

      revalidatePath(`/dashboard/skill`)
    } catch (err) {
      return getServerActionError(err, 'DELETE_SKILL')
    }
  })

const toggleSkillFavorite = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(toggleSkillFavoriteFormSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const result = await db.skill.update({
        where: { id: data.id },
        data: { isFavorite: data.isFavorite }
      })

      revalidatePath(`/dashboard/skill/${result.id}`)

      return returnServerActionSuccess({
        message: `Skill ${result.isFavorite ? 'favorited' : 'unfavorited'} successfully!`
      })
    } catch (err) {
      return getServerActionError(err, 'TOGGLE_SKILL_FAVORITE')
    }
  })

export { createOrUpdateSkill, deleteSkill, toggleSkillFavorite }
