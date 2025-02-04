'use client'

import { signOut } from 'next-auth/react'

import { ExtendedUser } from '@/auth'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getInitials, titleCase } from '@/lib'

type UserButtonProps = {
  user?: ExtendedUser
}

export default function UserButton({ user }: UserButtonProps) {
  if (!user || !user.name) return null

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-9 cursor-pointer'>
          <AvatarImage className='object-cover object-center' src={user.image ?? ''} />
          <AvatarFallback>{getInitials(user.name ?? '').toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' sideOffset={15}>
        <div className='flex items-center gap-x-3 px-2 py-1.5'>
          <Avatar className='size-11'>
            <AvatarImage className='object-cover object-center' src={user.image ?? ''} />
            <AvatarFallback>{getInitials(user.name).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex-col'>
            <h1 className='text-base font-semibold'>{titleCase(user.name)}</h1>
            <p className='text-xs text-muted-foreground'>{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
          <Icons.signout className='mr-2 size-4' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
