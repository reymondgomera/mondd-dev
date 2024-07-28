import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function ProtectedRouteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (session && session.user && session.user.isTwoFactorEnabled && !session.user.isTwoFactorVerified) {
    redirect('/two-factor')
  }

  return <>{children}</>
}
