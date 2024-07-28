import AuthLeftSide from '../_components/auth-left-side'
import SigninForm from './_components/signin-form'

export default function SigninPage() {
  return (
    <div className='flex h-full w-full'>
      <AuthLeftSide subtitle='Hard work and determination surpasses geniuses' />
      <div className='flex h-full w-full items-center justify-center bg-white p-10 md:p-20 lg:w-[50%]'>
        <SigninForm />
      </div>
    </div>
  )
}

SigninPage.theme = 'light'
