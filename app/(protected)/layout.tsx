import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'

import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

export default async function ProtectedRouteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session && session.user && session.user.isTwoFactorEnabled && !session.user.isTwoFactorVerified) {
    redirect('/two-factor')
  }

  return (
    <SessionProvider session={session}>
      <div className='flex h-full w-full flex-col'>
        <Navbar />

        <div className='mt-20 flex h-fit p-6 sm:px-10 lg:px-20'>
          <div className='fixed bottom-6 top-[calc(80px+1.5rem)] z-[200] max-[1200px]:hidden'>
            <Sidebar />
          </div>

          <main className='w-full flex-1 flex-col gap-y-4 min-[1200px]:ml-[215px]'>{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}
