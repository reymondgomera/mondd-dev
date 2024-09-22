'use server'

import { db } from '@/lib'
import { generateRandomPost } from '@/lib'

export async function seedPost() {
  const count = await db.post.count()

  if (count < 1) {
    const posts = Array.from({ length: 125 }, () => generateRandomPost())
    await db.post.createMany({ data: posts })
    console.log('Seeded posts')
  }
}
