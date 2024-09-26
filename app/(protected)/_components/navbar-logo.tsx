'use client'

import Link from 'next/link'

export default function NavbarLogo() {
  return (
    <Link href='/'>
      <div className='h-7 w-[100px] bg-logo-dark bg-no-repeat dark:bg-logo-default' />
    </Link>
  )
}
