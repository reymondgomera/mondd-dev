'use server'

import createError from 'http-errors'

import { db } from '@/lib'
import { HttpSuccess } from '@/types'

type GetReferences = {
  entityCodes: string[]
}

export async function getReferences({ entityCodes }: GetReferences) {
  try {
    const references = await db.reference.findMany({
      where: { entityCode: { in: entityCodes } },
      select: {
        code: true,
        name: true,
        entityCode: true,
        description: true,
        parentCode: true,
        isActive: true,
        isDefault: true,
        isParent: true,
        metadata: true
      },
      orderBy: { name: 'asc' }
    })

    return { statusCode: 200, data: references } as HttpSuccess<typeof references>
  } catch (error) {
    console.error('[GET_REFERENCES]: Internal Server Error')
    throw createError(500, 'Internal Server Error')
  }
}
