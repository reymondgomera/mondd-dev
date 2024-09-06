'use server'

import { Post } from '@prisma/client'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { revalidatePath } from 'next/cache'

import {
  ProjectMetadataForm,
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

export async function getPostBySlug(type: string, slug: string) {
  try {
    return await db.post.findUnique({ where: { typeCode: type, slug } })
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
