import { Suspense } from 'react'

import EmailVerify from './_components/email-verify'

export default async function EmailVerificationPage() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      {/* wrapping to prevent errors with useSearchParams */}
      <Suspense>
        <EmailVerify />
      </Suspense>
    </div>
  )
}
