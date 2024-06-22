'use server'

import createError from 'http-errors'

import { db } from '@/lib'
import { HttpSuccess } from '@/types'

export async function getSkills() {
  try {
    const skills = await db.skill.findMany({
      select: { title: true, logo: true, isFavorite: true, typeCode: true },
      orderBy: { title: 'asc' }
    })

    return { statusCode: 200, data: skills } as HttpSuccess<typeof skills>
  } catch (error) {
    console.error('[GET_SKILLS]: Internal Server Error')
    throw createError(500, 'Internal Server Error')
  }
}
