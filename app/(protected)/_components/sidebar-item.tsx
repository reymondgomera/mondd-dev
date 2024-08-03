'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarNavItem } from '@/constant'
import { cn } from '@/lib'

type SidebarItemProps = {
  item: SidebarNavItem
}

export default function SidebarItem({ item: { title, href, icon: Icon, disabled } }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (pathname.startsWith(`${href}`) && href !== '/dashboard')

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium hover:cursor-pointer hover:bg-slate-subtle-1',
        isActive && 'bg-slate-subtle-1',
        disabled && 'opacity-50 hover:cursor-not-allowed'
      )}
    >
      {Icon ? <Icon className='size-6' /> : null}
      <span>{title}</span>
    </Link>
  )
}
