'use server'

import { db } from '@/lib'

export async function getExampleData() {
  try {
    return await db.reference.findMany()
  } catch (error) {
    console.error(error)
    console.log('EXAMPLE SERVER ERROR!')
  }
}
