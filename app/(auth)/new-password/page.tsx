import { Suspense } from 'react'
import AuthLeftSide from '../_components/auth-left-side'
import NewPasswordForm from './_components/new-password-form'

export default function NewPasswordPage() {
  return (
    <div className='flex h-full w-full'>
      <AuthLeftSide subtitle='You’re going to make it, trust me' />
      <div className='flex h-full w-full items-center justify-center bg-white p-10 md:p-20 lg:w-[50%]'>
        {/* wrapping to prevent errors with useSearchParams */}
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
