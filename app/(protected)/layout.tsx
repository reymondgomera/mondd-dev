import { redirect } from 'next/navigation'
import { auth } from '@/auth'

import Navbar from './_components/navbar'
import Footer from '../(root)/_components/footer'
import Sidebar from './_components/sidebar'

export default async function ProtectedRouteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session && session.user && session.user.isTwoFactorEnabled && !session.user.isTwoFactorVerified) {
    redirect('/two-factor')
  }

  return (
    <div className='flex h-full w-full flex-col px-6 sm:px-10 lg:px-20'>
      <Navbar />

      <div className='mt-auto flex h-[calc(100vh-5rem)] py-6'>
        <div className='max-[1200px]:hidden'>
          <Sidebar />
        </div>

        <main className='w-full flex-1 bg-slate-subtle-1'>{children}</main>
      </div>

      <Footer className='mt-auto w-full' showNav={false} />
    </div>
  )
}
