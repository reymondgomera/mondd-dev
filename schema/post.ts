import { z } from 'zod'
import { ppDate } from '@/constant'

import { dataTableSearchParamsSchema } from './data-table'

const { arg, params, schema } = ppDate

//* Schemas *//
export const getPostsFormSchema = dataTableSearchParamsSchema.extend({
  title: z.string().optional(),
  isFeatured: z.string().optional(),
  isPublished: z.string().optional()
})

export const postFormSchema = z.object({
  authorId: z.string().min(1, { message: 'Please enter an author id.' }),
  typeCode: z.string().min(1, { message: 'Please select a post type.' }),
  title: z.string().min(1, { message: 'Please enter a title.' }),
  description: z.string().min(1, { message: 'Please enter a description.' }),
  thumbnail: z.string().nullish(),
  slug: z.string().min(1, { message: 'Please enter a slug.' }),
  body: z.string().min(1, { message: 'Please enter a body.' }),
  tags: z.array(z.string()).min(1, { message: 'Please enter at least one tag.' }),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false)
})

export const updatePostBodyFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  body: z.string().min(1, { message: 'Please enter a body.' })
})

export const togglePostFeatureFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  isFeatured: z.boolean().default(false)
})

export const togglePostPublishFormSchema = z.object({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  isPublished: z.boolean().default(false)
})

export const projectMetadataFormSchema = z.object({
  url: z.string().url().optional().or(z.literal('')),
  createdAt: z.preprocess(arg, schema('date created'), params('date created')),
  madeAt: z.string().optional(),
  screenshots: z.array(z.string()).default([])
})

export const projectFormSchema = postFormSchema.extend({
  id: z.string().min(1, { message: 'Please enter an id.' }),
  metadata: projectMetadataFormSchema
})

export const updateProjectFormSchema = projectFormSchema.extend({ formData: z.any() })

export const blogFormSchema = postFormSchema.extend({ id: z.string().min(1, { message: 'Please enter an id.' }) })

export const updateBlogFormSchema = blogFormSchema.extend({ formData: z.any() })

//* Types *//
export type GetPostsForm = z.infer<typeof getPostsFormSchema>
export type PostForm = z.infer<typeof postFormSchema>
export type UpdatePostBodyForm = z.infer<typeof updatePostBodyFormSchema>
export type ProjectForm = z.infer<typeof projectFormSchema>
export type UpdateProjectForm = z.infer<typeof updateProjectFormSchema>
export type ProjectMetadataForm = z.infer<typeof projectMetadataFormSchema>
export type BlogForm = z.infer<typeof blogFormSchema>
export type UpdateBlogForm = z.infer<typeof updateBlogFormSchema>
