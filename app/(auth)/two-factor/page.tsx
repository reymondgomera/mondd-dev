import AuthLeftSide from '../_components/auth-left-side'
import TwoFactorForm from './_components/two-factor-form'

export default function TwoFactorPage() {
  return (
    <div className='flex h-full w-full'>
      <AuthLeftSide subtitle='Stay true in the dark & humble in the spotlight' />
      <div className='flex h-full w-full items-center justify-center bg-white p-10 md:p-20 lg:w-[50%]'>
        <TwoFactorForm />
      </div>
    </div>
  )
}
