'use client'

import { useParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'

import { capitalize } from '@/lib'
import { PostType } from '@/types'
import { createPost } from '@/actions'
import { useCurrentUser } from '@/hooks'
import { Icons } from '@/components/icons'
import Button from '@/components/custom/button'
import { editorDefaultContent } from '@/components/rich-text-editor/editor-default-content'

export default function AddPostButton() {
  const user = useCurrentUser()
  const params = useParams() as { type: PostType }

  const { executeAsync, isExecuting } = useAction(createPost)

  async function handleAddPost() {
    try {
      if (!user) return

      const response = await executeAsync({
        authorId: user.id,
        typeCode: params.type,
        title: `Untitled ${capitalize(params.type)}`,
        description: `Blank ${params.type} post.`,
        slug: uuidv4(),
        body: JSON.stringify(editorDefaultContent),
        tags: ['untitled']
      })

      if (response && response.data && response.data.error) toast.error(response.data.message)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong! Please try again later.')
    }
  }

  return (
    <Button isLoading={isExecuting} loadingText='Adding' variant='primary' onClick={handleAddPost}>
      {!isExecuting ? <Icons.add className='mr-2 size-4' /> : null}
      <span>Add</span>
    </Button>
  )
}
