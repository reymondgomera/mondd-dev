import Link from 'next/link'

import { cn } from '@/lib'
import { Button } from '@/components/ui/button'
import { NavItem } from '@/constant'
import { useLockBody } from '@/hooks'

type MobileNavProps = {
  items: NavItem[]
  setShowMobileMenu: (show: boolean) => void
  hash: string
  setHash: (hash: string) => void
}

export default function MobileNav({ items, setShowMobileMenu, hash, setHash }: MobileNavProps) {
  useLockBody()

  return (
    <div className={cn('slide-out fixed inset-0 top-20 z-50 overflow-auto p-6 shadow-md animate-in slide-in-from-bottom-80 lg:hidden')}>
      <div className='relative z-20 flex min-w-[280px] flex-col gap-5 rounded-md bg-popover p-4'>
        <Link href='/' className='flex items-center justify-center lg:hidden' onClick={() => setHash('')}>
          <img alt='logo' src='/images/logo-text-default.svg' className='h-7' />
        </Link>

        <div className='flex flex-col gap-3 lg:hidden'>
          {items.length > 0
            ? items.map((item, i) => (
                <Button key={i} asChild variant='ghost' className='w-full p-3 text-sm text-slate-200'>
                  <Link
                    className={cn(hash === item.href && 'text-teal-300')}
                    href={item.href}
                    onClick={() => {
                      setHash(item.href)
                      setShowMobileMenu(false)
                    }}
                  >
                    {item.title}
                  </Link>
                </Button>
              ))
            : null}

          <Button variant='primary' asChild>
            <Link href={process.env.NEXT_PUBLIC_RESUME_URL ?? '#'} target='_blank'>
              Resume
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
