import ThemeToggle from '@/components/theme-toggle'

import UserButton from './user-button'
import MobileToggle from './mobile-toggle'
import NavbarLogo from './navbar-logo'
import { getCurrentUser } from '@/actions'

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <header className='fixed z-50 h-[80px] w-full border-b border-t-0 bg-white px-6 dark:bg-base-primary sm:px-10 lg:px-20'>
      <nav className='flex h-full w-full items-center justify-between py-5'>
        <NavbarLogo />

        <div className='flex items-center gap-x-3'>
          <ThemeToggle />
          <UserButton user={user} />
          <MobileToggle />
        </div>
      </nav>
    </header>
  )
}
