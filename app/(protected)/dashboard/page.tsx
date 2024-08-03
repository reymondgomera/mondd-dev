import { auth } from '@/auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className='space-y-4 text-wrap break-words p-20 text-sm'>
      <div>{JSON.stringify(session, null, 2)}</div>
    </div>
  )
}
