'use client'

import { toast } from 'sonner'
import { useState } from 'react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { ColumnDef } from '@tanstack/react-table'

import { SkillData, deleteSkill } from '@/actions'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import AlertModal from '@/components/custom/alert-modal'

export function getColumns(): ColumnDef<SkillData>[] {
  return [
    {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
      cell: ({ row }) => <div className='max-w-[28rem] truncate font-medium'>{row.original.title}</div>
    },
    {
      accessorKey: 'typeCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Type' />,
      cell: ({ row }) => (
        <div className='w-52'>
          <Badge variant='outline'>{row.original.type.name}</Badge>
        </div>
      )
    },
    {
      accessorKey: 'isFavorite',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Favorite' />,
      cell: ({ row }) => (
        <div className='w-32'>{row.original.isFavorite ? <Badge variant='default'>Yes</Badge> : <Badge variant='outline'>No</Badge>}</div>
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
      cell: function ActionCell({ row }) {
        const router = useRouter()
        const { executeAsync } = useAction(deleteSkill)
        const [showConfirmation, setShowConfirmation] = useState(false)

        const { id, title } = row.original

        async function handleDelete() {
          setShowConfirmation(false)

          toast.promise(executeAsync({ id }), {
            loading: 'Deleting skill...',
            success: (response) => {
              const result = response?.data

              if (!response || !result) throw { message: 'Failed to delete skill!', expectedError: true }

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
                <Button className='flex size-8 p-0 data-[state=open]:bg-muted' variant='ghost' size='icon'>
                  <Icons.dotsHorizontal className='size-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-40' align='end'>
                <DropdownMenuItem onClick={() => router.push(`/dashboard/skill/${id}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowConfirmation(true)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertModal
              isOpen={showConfirmation}
              title='Are you sure?'
              description={`Are you sure you want to delete this skill entitled "${title}"?`}
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
