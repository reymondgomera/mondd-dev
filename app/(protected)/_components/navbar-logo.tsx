'use client'

import Link from 'next/link'

export default function NavbarLogo() {
  return (
    <Link href='/'>
      <div className='bg-logo-dark dark:bg-logo-default h-4 w-[100px] bg-no-repeat' />
    </Link>
  )
}
