'use server'

import { Prisma, Skill } from '@prisma/client'
import { revalidatePath, unstable_noStore as noStore, unstable_cache, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { action, db, getServerActionError, returnServerActionError, returnServerActionSuccess, deleteFiles, uploadFiles } from '@/lib'
import { authenticationMiddleware, authorizationMiddleware } from '@/lib/safe-action-middleware'
import { getSkillsFormSchema, paramsFormSchema, skillFormSchema, toggleSkillFavoriteFormSchema } from '@/schema'
import { SearchParams, OrderByInput, WhereAnd, WhereOr } from '@/types'
import { filterColumn } from '@/lib/data-table/filterColumn'

export type SkillData = Awaited<ReturnType<typeof getSkills>>['data'][number]
export type SkillsDataForLandingPage = Awaited<ReturnType<typeof getSkillsForLandingPage>>[number]

export async function getSkillsForLandingPage() {
  return await unstable_cache(
    async () => {
      return db.skill.findMany({ select: { title: true, isFavorite: true, logo: true, typeCode: true }, orderBy: { title: 'asc' } })
    },
    ['skill-landing-page'],
    { tags: ['skill-landing-page'] }
  )()
}

export async function getSkills(searchParams: SearchParams) {
  noStore()

  const search = getSkillsFormSchema.safeParse(searchParams)

  if (!search.success) return { data: [], pageCount: 0 }

  const { page, per_page, sort, title, typeCode, isFavorite } = search.data

  //* Offset to paginate the results
  const offset = (page - 1) * per_page

  //* Column and order to sort by
  const [column, order] = (sort?.split('.').filter(Boolean) ?? ['createdAt', 'desc']) as [keyof Skill, 'asc' | 'desc']

  //* initialized where input
  // prettier-ignore
  const where: Prisma.SkillWhereInput = {
    ...(title ? filterColumn<'Skill'>({ column: 'title', columnType: 'String', value: title }) : {}),
    AND: [
      ...(typeCode ? [filterColumn<'Skill'>({ column: 'typeCode', columnType: 'String', value: typeCode, isSelectable: true })] : []),
      ...(isFavorite ? [filterColumn<'Skill'>({ column: 'isFavorite', columnType: 'Boolean', value: isFavorite, isSelectable: true })] : [])
    ] as WhereAnd<'Skill'> | WhereOr<'Skill'>
  }

  //* initialized order input
  const orderBy = { [column]: order } as OrderByInput<'Skill'>

  const [data, total] = await db.$transaction([
    db.skill.findMany({
      where,
      skip: offset,
      take: per_page,
      orderBy,
      select: {
        id: true,
        title: true,
        typeCode: true,
        type: { select: { name: true, code: true } },
        logo: true,
        isFavorite: true,
        createdAt: true
      }
    }),
    db.skill.count({ where })
  ])

  //* calculate page count
  const pageCount = Math.ceil(total / per_page)

  return { data, pageCount }
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

    revalidateTag('skill-landing-page')

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

      revalidateTag('skill-landing-page')
      revalidatePath(`/dashboard/skill`)

      return returnServerActionSuccess({ message: `Skill "${skill.title}" deleted successfully!` })
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

      revalidateTag('skill-landing-page')
      revalidatePath(`/dashboard/skill/${result.id}`)

      return returnServerActionSuccess({
        message: `Skill ${result.isFavorite ? 'favorited' : 'unfavorited'} successfully!`
      })
    } catch (err) {
      return getServerActionError(err, 'TOGGLE_SKILL_FAVORITE')
    }
  })

export { createOrUpdateSkill, deleteSkill, toggleSkillFavorite }
