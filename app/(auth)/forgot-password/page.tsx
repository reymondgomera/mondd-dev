import AuthLeftSide from '../_components/auth-left-side'
import ForgotPasswordForm from './_components/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <div className='flex h-full w-full'>
      <AuthLeftSide subtitle='God is good all the time' />
      <div className='flex h-full w-full items-center justify-center bg-white p-10 md:p-20 lg:w-[50%]'>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
