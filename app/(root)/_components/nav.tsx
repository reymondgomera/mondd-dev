'use client'

import { useState } from 'react'
import Link from 'next/link'

import { NavItem } from '@/constant'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib'
import { Icons } from '@/components/icons'
import MobileNav from './mobile-nav'
import { useNavigationStore } from '@/hooks'

type NavProps = {
  items: NavItem[]
}

export default function Nav({ items }: NavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false) // only do this becauase i want to get the hash e.g. /#about  //TODO: make this state as zustand
  const { hash, hasBackground, setHash } = useNavigationStore(['hash', 'hasBackground', 'setHash'])

  return (
    <div className={cn('sticky top-0 z-50 py-5', hasBackground && 'bg-base-primary')}>
      <nav className='container flex justify-between'>
        {/* logo */}
        <Link href='/' className='hidden lg:inline-flex lg:items-center' onClick={() => setHash('')}>
          <h1 className='text-lg font-bold'>
            <span>mond.</span>
            <span className='text-teal-300'>dev</span>
          </h1>
        </Link>

        <div className='hidden lg:flex lg:gap-3'>
          {items.length > 0
            ? items.map((item, i) => (
                <Button key={i} asChild variant='ghost' className='p-3 text-sm text-slate-200' onClick={() => setHash(item.href)}>
                  <Link className={cn(hash === item.href && 'text-teal-300')} href={item.href}>
                    {item.title}
                  </Link>
                </Button>
              ))
            : null}

          {/* //TODO: Download Resume */}
          <Button variant='primary'>Resume</Button>
        </div>

        <Button className='hover:bg-transparent lg:hidden' variant='ghost' onClick={() => setShowMobileMenu((prev) => !prev)}>
          {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        </Button>

        {showMobileMenu && items && <MobileNav items={items} setShowMobileMenu={setShowMobileMenu} hash={hash} setHash={setHash} />}
      </nav>
    </div>
  )
}
