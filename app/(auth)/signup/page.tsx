import AuthLeftSide from '../_components/auth-left-side'
import SignupForm from './_components/signup-form'

export default function SignUpPage() {
  return (
    <div className='flex h-full w-full'>
      <AuthLeftSide subtitle='One step at a time' />
      <div className='flex h-full w-full items-center justify-center bg-white p-10 md:p-20 lg:w-[50%]'>
        <SignupForm />
      </div>
    </div>
  )
}
