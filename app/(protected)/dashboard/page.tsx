import { auth, signOut } from '@/auth'
import Button from '@/components/custom/button'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className='space-y-4 p-20'>
      <div>{JSON.stringify(session, null, 2)}</div>

      <form
        action={async () => {
          'use server'
          await signOut({
            redirectTo: '/signin'
          })
        }}
      >
        <Button variant='primary' type='submit'>
          Signout
        </Button>
      </form>
    </div>
  )
}
