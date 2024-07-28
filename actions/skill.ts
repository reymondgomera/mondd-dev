'use server'

import { db, resolveAppError } from '@/lib'
import { HttpSuccess } from '@/types'

export async function getSkills() {
  try {
    const skills = await db.skill.findMany({
      select: { title: true, logo: true, isFavorite: true, typeCode: true },
      orderBy: { title: 'asc' }
    })

    return { statusCode: 200, data: skills } as HttpSuccess<typeof skills>
  } catch (err) {
    throw resolveAppError(err, 'GET_SKILLS')
  }
}
