import { faker } from '@faker-js/faker'
import { title } from 'radash'
import { v4 as uuidv4 } from 'uuid'

export function generateRandomPost() {
  const postTypeEnum = ['project', 'blog'] as const
  const authorId = 'c9c4b9cd-c009-4812-a1ac-9318babc307e'

  return {
    authorId,
    title: title(faker.hacker.phrase()),
    thumbnail: faker.image.url({ width: 768, height: 384 }),
    description: faker.lorem.sentence(faker.number.int({ min: 1, max: 4 })),
    typeCode: faker.helpers.arrayElement(postTypeEnum),
    slug: uuidv4(),
    body: JSON.stringify({ type: 'doc', content: [{ type: 'paragraph' }] }),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => faker.hacker.adjective()),
    isPublished: faker.datatype.boolean(),
    isFeatured: faker.datatype.boolean()
  }
}
