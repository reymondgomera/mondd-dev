import { MetadataRoute } from 'next'

import { siteConfig } from '@/constant'
import { db } from '@/lib'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  //* post type url
  const postType = await db.reference.findMany({ where: { entityCode: 'post-type' } })
  const postTypeUrl: MetadataRoute.Sitemap = postType.map((type) => ({ url: `${siteConfig.baseUrl}/post/${type.code}`, lastModified: type.updatedAt })) // prettier-ignore

  //* post url
  const posts = await db.post.findMany({ select: { slug: true, typeCode: true, updatedAt: true }, orderBy: { typeCode: 'asc' } })
  const postsUrl: MetadataRoute.Sitemap = posts.map(post => ({ url: `${siteConfig.baseUrl}/post/${post.typeCode}/${post.slug}`, lastModified: post.updatedAt })) // prettier-ignore

  return [{ url: siteConfig.baseUrl }, ...postTypeUrl, ...postsUrl]
}
