'use server'

import { Experience, Prisma } from '@prisma/client'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { SearchParams, OrderByInput } from '@/types'
import { action, db, getServerActionError, returnServerActionError, returnServerActionSuccess } from '@/lib'
import { authenticationMiddleware, authorizationMiddleware } from '@/lib/safe-action-middleware'
import { paramsFormSchema, experienceFormSchema, getExperiencesFormSchema } from '@/schema'
import { filterColumn } from '@/lib/data-table/filterColumn'

export type ExperienceData = Awaited<ReturnType<typeof getExperiences>>['data'][number]
export type ExperiencesDataForLandingPage = Awaited<ReturnType<typeof getExperiencesForLandingPage>>[number]

export async function getExperiencesForLandingPage() {
  //* impose noStore since it will be used in root page which is statically rendered
  //* enables the rsc to be uncached
  noStore()

  return await db.experience.findMany({
    select: { title: true, description: true, start: true, end: true, tags: true },
    orderBy: { start: 'desc' }
  })
}

export async function getExperiences(searchParams: SearchParams) {
  noStore()

  const search = getExperiencesFormSchema.safeParse(searchParams)

  if (!search.success) return { data: [], pageCount: 0 }

  const { page, per_page, sort, title } = search.data

  //* Offset to paginate the results
  const offset = (page - 1) * per_page

  //* Column and order to sort by
  const [column, order] = (sort?.split('.').filter(Boolean) ?? ['start', 'desc']) as [keyof Experience, 'asc' | 'desc']

  //* initialized where input
  const where: Prisma.ExperienceWhereInput = {
    ...(title ? filterColumn<'Experience'>({ column: 'title', columnType: 'String', value: title }) : {}),
    AND: []
  }

  //* initialized order input
  const orderBy = { [column]: order } as OrderByInput<'Experience'>

  const [data, total] = await db.$transaction([
    db.experience.findMany({
      where,
      skip: offset,
      take: per_page,
      orderBy,
      select: {
        id: true,
        title: true,
        start: true,
        end: true
      }
    }),
    db.experience.count({ where })
  ])

  //* calculate page count
  const pageCount = Math.ceil(total / per_page)

  return { data, pageCount }
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
      const experience = await db.experience.findUnique({ where: { id: data.id } })

      //* check if experience is not existed
      if (!experience) return returnServerActionError({ code: 404, message: 'Experience not found!', action: 'DELETE_EXPERIENCE' })

      await db.experience.delete({ where: { id: data.id } })

      revalidatePath(`/dashboard/experience`)

      return returnServerActionSuccess({ message: `Experience "${experience.title}" deleted successfully!` })
    } catch (err) {
      return getServerActionError(err, 'DELETE_EXPERIENCE')
    }
  })

export { createOrUpdateExperience, deleteExperience }
