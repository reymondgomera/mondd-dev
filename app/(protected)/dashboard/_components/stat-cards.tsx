import { getDashboardData } from '@/actions'
import StatCard from './stat-card'
import { Icons } from '@/components/icons'
import { formatNumber } from '@/lib'

export default async function StatCards() {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const { projects, blogs, skills, experiences } = await getDashboardData()

  return (
    <>
      <StatCard title='Total Project' value={formatNumber(projects)} icon={Icons.code} />
      <StatCard title='Total Blog' value={formatNumber(blogs)} icon={Icons.notebookPen} />
      <StatCard title='Total Skills' value={formatNumber(skills)} icon={Icons.bulb} />
      <StatCard title='Total Experience' value={formatNumber(experiences)} icon={Icons.clock} />
    </>
  )
}
