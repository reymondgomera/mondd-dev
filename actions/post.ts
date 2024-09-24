'use server'

import { Post, Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

import {
  ProjectMetadataForm,
  getPostsFormSchema,
  paramsFormSchema,
  postFormSchema,
  togglePostFeatureFormSchema,
  togglePostPublishFormSchema,
  updateBlogFormSchema,
  updatePostBodyFormSchema,
  updateProjectFormSchema
} from '@/schema'
import {
  action,
  capitalize,
  db,
  getServerActionError,
  returnServerActionError,
  returnServerActionSuccess,
  deleteFiles,
  uploadFiles
} from '@/lib'
import { authenticationMiddleware, authorizationMiddleware } from '@/lib/safe-action-middleware'
import { PostType, SearchParams, OrderByInput, WhereAnd, WhereOr } from '@/types'
import { filterColumn } from '@/lib/data-table/filterColumn'

export type PostData = Awaited<ReturnType<typeof getPosts>>['data'][number]
export type PostDataForLandingPage = Awaited<ReturnType<typeof getPostsForLandingPage>>['data'][number]

export async function getLatestFeaturedAndPublishedPosts(type: PostType) {
  return await db.post.findMany({
    where: { typeCode: type, isFeatured: true, isPublished: true },
    orderBy: { createdAt: 'desc' },
    take: 5
  })
}

export async function getPostsForLandingPage(type: PostType, searchParams: SearchParams) {
  const search = getPostsFormSchema.safeParse(searchParams)

  if (!search.success) return { data: [], pageCount: 0 }

  const { page, per_page, title } = search.data

  //* Offset to paginate the results
  const offset = (page - 1) * per_page

  //* initialized where input
  const where: Prisma.PostWhereInput = {
    typeCode: type,
    ...(title
      ? {
          OR: [
            { title: { contains: title, mode: 'insensitive' } },
            { description: { contains: title, mode: 'insensitive' } },
            { tags: { has: title } }
          ]
        }
      : {}),
    isPublished: true
  }

  const [data, total] = await db.$transaction([
    db.post.findMany({
      where,
      skip: offset,
      take: per_page,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        typeCode: true,
        description: true,
        tags: true,
        metadata: true,
        createdAt: true
      }
    }),
    db.post.count({ where })
  ])

  //* Calculate page count
  const pageCount = Math.ceil(total / per_page)

  return { data, pageCount }
}

export async function getPosts(type: PostType, searchParams: SearchParams) {
  noStore()

  const search = getPostsFormSchema.safeParse(searchParams)

  if (!search.success) return { data: [], pageCount: 0 }

  const { page, per_page, sort, title, isFeatured, isPublished } = search.data

  //* Offset to paginate the results
  const offset = (page - 1) * per_page

  //* Column and order to sort by
  const [column, order] = (sort?.split('.').filter(Boolean) ?? ['createdAt', 'desc']) as [keyof Post, 'asc' | 'desc']

  //* initialized where input
  // prettier-ignore
  const where: Prisma.PostWhereInput = {
    typeCode: type,
    ...(title ? filterColumn<'Post'>({ column: 'title', columnType: 'String', value: title }) : {}),
    AND: [
      ...(isFeatured ? [filterColumn<'Post'>({ column: 'isFeatured', columnType: 'Boolean', value: isFeatured, isSelectable: true })] : []),
      ...(isPublished? [filterColumn<'Post'>({ column: 'isPublished', columnType: 'Boolean', value: isPublished, isSelectable: true })] : []),
    ] as WhereAnd<'Post'> | WhereOr<'Post'>
  }

  //* initialized order input
  const orderBy = { [column]: order } as OrderByInput<'Post'>

  const [data, total] = await db.$transaction([
    db.post.findMany({
      where,
      skip: offset,
      take: per_page,
      orderBy,
      select: {
        id: true,
        title: true,
        slug: true,
        typeCode: true,
        type: { select: { name: true, code: true } },
        isFeatured: true,
        isPublished: true,
        createdAt: true
      }
    }),
    db.post.count({ where })
  ])

  //* Calculate page count
  const pageCount = Math.ceil(total / per_page)

  return { data, pageCount }
}

export async function getPostBySlug(type: string, slug: string, isPublished?: boolean) {
  try {
    return await db.post.findUnique({ where: { typeCode: type, slug, isPublished } })
  } catch (err) {
    return null
  }
}

const createPost = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(postFormSchema)
  .action(async ({ parsedInput: data }) => {
    let success = false
    let result: Post | undefined

    try {
      const post = await db.post.create({ data })

      success = true
      result = post
    } catch (err) {
      return getServerActionError(err, 'CREATE_POST')
    }

    if (success && result) redirect(`/dashboard/post/${result.typeCode}/${result.slug}`)
  })

const deletePost = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(paramsFormSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const post = await db.post.findUnique({ where: { id: data.id } })

      //* check if post is not existed
      if (!post) return returnServerActionError({ code: 404, message: 'Post not found!', action: 'DELETE_POST' })

      switch (post.typeCode) {
        case 'project':
          {
            //* get urls for deletion
            const thumbnailUrl = post.thumbnail ? post.thumbnail : ''
            const screenshotsUrls = post.metadata ? (post.metadata as any as ProjectMetadataForm).screenshots : []
            const toDeleteFileUrls: string[] = [thumbnailUrl, ...(screenshotsUrls && screenshotsUrls.length > 0 ? screenshotsUrls : [])]

            //* delete files
            if (toDeleteFileUrls.length > 0) await deleteFiles(toDeleteFileUrls)
          }
          break

        default:
          {
            //* get urls for deletion
            const thumbnailUrl = post.thumbnail ? post.thumbnail : ''
            const toDeleteFileUrls: string[] = [thumbnailUrl]

            //* delete files
            if (toDeleteFileUrls.length > 0) await deleteFiles(toDeleteFileUrls)
          }
          break
      }

      const deletedPost = await db.post.delete({ where: { id: data.id } })

      revalidatePath(`/dashboard/post/${post.typeCode}`)

      return returnServerActionSuccess({ message: `${capitalize(deletedPost.typeCode)} deleted successfully!` })
    } catch (err) {
      return getServerActionError(err, 'DELETE_POST')
    }
  })

const updatePostBody = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(updatePostBodyFormSchema)
  .action(async ({ parsedInput: data }) => {
    let success = false
    let result: Post | undefined

    try {
      const updatedPost = await db.post.update({
        data: { body: data.body },
        where: { id: data.id }
      })

      success = true
      result = updatedPost
    } catch (err) {
      return getServerActionError(err, 'UPDATE_POST_BODY')
    }

    if (success && result) revalidatePath(`/dashboard/post/${result.typeCode}/${result.slug}`)
  })

const updateProject = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(updateProjectFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, authorId, typeCode, formData: formDataValues, ...data } = parsedInput

    let success = false
    let result: Post | undefined

    try {
      const formData = formDataValues as FormData
      const slug = slugify(data.slug, { lower: true, strict: true })

      const post = await db.post.findUnique({ where: { id } })

      //* check if post is not existed
      if (!post) return returnServerActionError({ code: 404, message: 'Project not found!', action: 'UPDATE_PROJECT' })

      //* check if the user is the author, if not throw error

      if (post.authorId !== ctx.userId) {
        return returnServerActionError({ code: 403, message: 'You are not allowed to edit this project.', action: 'UPDATE_PROJECT' })
      }

      const slugExist = await db.post.findUnique({ where: { slug: slug, AND: [{ id: { not: post.id } }] } })

      //* check if generated slug is already exist, if exist throw error
      if (slugExist) return returnServerActionError({ code: 409, message: 'Slug is already exist!', action: 'UPDATE_PROJECT' })

      //* get file value from formData
      const files = {
        thumbnail: formData.get('thumbnail') as File | null,
        screenshots: formData.getAll('screenshots') as File[]
      }

      //* get urls for deletion
      const thumbnailUrl = post.thumbnail ? post.thumbnail : ''
      const screenshotsUrls = post.metadata ? (post.metadata as any as ProjectMetadataForm).screenshots : []
      const toDeleteFileUrls: string[] = [thumbnailUrl, ...(screenshotsUrls && screenshotsUrls.length > 0 ? screenshotsUrls : [])]

      //* delete all uploaded files then reupload, for simplicity of updating
      if (toDeleteFileUrls.length > 0) await deleteFiles(toDeleteFileUrls)

      //* upload new files
      const { thumbnail, screenshots } = await uploadFiles(files)

      //* update post in db
      const updatedProject = await db.post.update({
        where: { id },
        data: {
          ...data,
          slug,
          thumbnail,
          metadata: {
            ...data.metadata,
            screenshots
          }
        }
      })

      success = true
      result = updatedProject
    } catch (err) {
      return getServerActionError(err, 'UPDATE_PROJECT')
    }

    if (success && result) redirect(`/dashboard/post/${result.typeCode}/${result.slug}`)
  })

const updateBlog = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(updateBlogFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, authorId, typeCode, formData: formDataValues, ...data } = parsedInput

    let success = false
    let result: Post | undefined

    try {
      const formData = formDataValues as FormData
      const slug = slugify(data.slug, { lower: true, strict: true })

      const post = await db.post.findUnique({ where: { id } })

      //* check if post is not existed
      if (!post) return returnServerActionError({ code: 404, message: 'blog not found!', action: 'UPDATE_BLOG' })

      //* check if the user is the author, if not throw error

      if (post.authorId !== ctx.userId) {
        return returnServerActionError({ code: 403, message: 'You are not allowed to edit this blog.', action: 'UPDATE_BLOG' })
      }

      const slugExists = await db.post.findUnique({ where: { slug: slug, AND: [{ id: { not: post.id } }] } })

      //* check if generated slug is already exist, if exist throw error
      if (slugExists) return returnServerActionError({ code: 409, message: 'Slug is already exist!', action: 'UPDATE_BLOG' })

      //* get file value from formData
      const files = {
        thumbnail: formData.get('thumbnail') as File | null
      }

      //* get urls for deletion
      const thumbnailUrl = post.thumbnail ? post.thumbnail : ''
      const toDeleteFileUrls: string[] = [thumbnailUrl]

      //* delete all uploaded files then reupload, for simplicity of updating
      if (toDeleteFileUrls.length > 0) await deleteFiles(toDeleteFileUrls)

      //* upload files
      const { thumbnail } = await uploadFiles(files)

      //* update post in db
      const updatedBlog = await db.post.update({
        where: { id },
        data: {
          ...data,
          slug,
          thumbnail
        }
      })

      success = true
      result = updatedBlog
    } catch (err) {
      return getServerActionError(err, 'UPDATE_BLOG')
    }

    if (success && result) redirect(`/dashboard/post/${result.typeCode}/${result.slug}`)
  })

const togglePostFeature = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(togglePostFeatureFormSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const result = await db.post.update({
        where: { id: data.id },
        data: { isFeatured: data.isFeatured }
      })

      revalidatePath(`/dashboard/post/${result.typeCode}/${result.slug}`)

      return returnServerActionSuccess({
        message: `${capitalize(result.typeCode)} ${result.isFeatured ? 'featured' : 'unfeatured'} successfully!.`
      })
    } catch (err) {
      return getServerActionError(err, 'TOGGLE_POST_FEATURE')
    }
  })

const togglePostPublish = action
  .use(authenticationMiddleware)
  .use(authorizationMiddleware)
  .schema(togglePostPublishFormSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const result = await db.post.update({
        where: { id: data.id },
        data: { isPublished: data.isPublished }
      })

      revalidatePath(`/dashboard/post/${result.typeCode}/${result.slug}`)

      return returnServerActionSuccess({
        message: `${capitalize(result.typeCode)} ${result.isPublished ? 'published' : 'unpublished'} successfully!.`
      })
    } catch (err) {
      return getServerActionError(err, 'TOGGLE_POST_PUBLISH')
    }
  })

export { createPost, deletePost, updatePostBody, updateProject, updateBlog, togglePostFeature, togglePostPublish }
