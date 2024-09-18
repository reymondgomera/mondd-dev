'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'

import { PostData, deletePost } from '@/actions'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/custom/alert-modal'

export function getColumns(): ColumnDef<PostData>[] {
  return [
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
      cell: ({ row }) => <div className='max-w-[28rem] truncate font-medium'>{row.original.title}</div>
    },
    {
      accessorKey: 'isFeatured',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Highlight' />,
      cell: ({ row }) => (
        <div className='w-32'>
          {row.original.isFeatured ? <Badge variant='default'>Featured</Badge> : <Badge variant='outline'>Unfeatured</Badge>}
        </div>
      )
    },
    {
      accessorKey: 'isPublished',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Visibility' />,
      cell: ({ row }) => (
        <div className='w-32'>
          {row.original.isPublished ? <Badge variant='default'>Published</Badge> : <Badge variant='outline'>Draft</Badge>}
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Created' />,
      cell: ({ row }) => <div className='w-36'>{format(row.original.createdAt, 'PP')}</div>
    },
    {
      id: 'actions',
      size: 40,
      cell: ({ row }) => {
        const router = useRouter()
        const { executeAsync, isExecuting } = useAction(deletePost)
        const [showConfirmation, setShowConfirmation] = useState(false)

        const { id, title, slug, typeCode } = row.original

        async function handleDelete() {
          setShowConfirmation(false)

          toast.promise(executeAsync({ id }), {
            loading: 'Deleting post...',
            success: (response) => {
              const result = response?.data

              if (!response || !result) throw { message: 'Failed to delete post!', expectedError: true }

              if (!result.error) {
                router.refresh()
                return result.message
              }

              throw { message: result.message, expectedError: true }
            },
            error: (err: any) => {
              return err?.expectedError ? err.message : 'Something went wrong! Please try again later.'
            }
          })
        }

        return (
          <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button disabled={isExecuting} className='flex size-8 p-0 data-[state=open]:bg-muted' variant='ghost' size='icon'>
                  <Icons.dotsHorizontal className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-40' align='end'>
                <DropdownMenuItem onClick={() => router.push(`/dashboard/post/${typeCode}/${slug}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowConfirmation(true)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertModal
              isOpen={showConfirmation}
              title='Are you sure?'
              description={`Are you sure you want to delete this ${typeCode} entitled "${title}"?`}
              onConfirm={handleDelete}
              onConfirmText='Delete'
              onCancelText='Cancel'
              onCancel={() => setShowConfirmation(false)}
            />
          </>
        )
      }
    }
  ]
}
