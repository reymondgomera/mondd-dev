'use client'

import { sidebarNavItems } from '@/constant'
import SidebarItem from './sidebar-item'
import { cn } from '@/lib'

type SidebarProps = {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('flex h-full w-[215px] flex-col gap-x-2 p-6', className)}>
      {sidebarNavItems.map((item, i) => (
        <SidebarItem key={i} item={item} />
      ))}
    </aside>
  )
}
