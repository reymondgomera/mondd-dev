'use server'

import { db } from '@/lib'

type GetReferences = {
  entityCodes: string[]
}

export async function getReferences({ entityCodes }: GetReferences) {
  return await db.reference.findMany({
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
}
