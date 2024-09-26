'use server'

import { db } from '@/lib'

export async function getDashboardData() {
  const [projects, blogs, skills, experiences] = await db.$transaction([
    db.post.count({ where: { typeCode: 'project' } }),
    db.post.count({ where: { typeCode: 'blog' } }),
    db.skill.count(),
    db.experience.count()
  ])

  return { projects, blogs, skills, experiences }
}
