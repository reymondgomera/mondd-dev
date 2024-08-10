import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

export default async function ProtectedRouteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session && session.user && session.user.isTwoFactorEnabled && !session.user.isTwoFactorVerified) {
    redirect('/two-factor')
  }

  return (
    <div className='flex h-full w-full flex-col'>
      <Navbar />

      {/* //TODO fix sidebar height when fixed */}
      <div className='mt-20 flex h-fit px-6 py-6 sm:px-10 lg:px-20'>
        <div className='fixed bottom-6 top-[calc(80px+1.5rem)] z-[200] max-[1200px]:hidden'>
          <Sidebar />
        </div>

        <main className='flex-1 min-[1200px]:ml-[215px]'>{children}</main>
      </div>
    </div>
  )
}
