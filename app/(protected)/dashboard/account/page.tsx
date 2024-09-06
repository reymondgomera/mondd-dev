import { getCurrentUser } from '@/actions'
import AccountForm from './_components/account-form'

export default async function AccountPage() {
  const user = await getCurrentUser()

  return <AccountForm user={user} />
}
