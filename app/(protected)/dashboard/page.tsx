import { Icons } from '@/components/icons'
import StatCard from './_components/stat-card'
import Top5VisitorsCountriesPieChart from './_components/top5-visitors-countries-pie-chart'
import Top5VisitorsCountriesList from './_components/top5-visitors-countries-list'
import TotalVisitorsLineChart from './_components/total-visitors-bar-chart'

export default async function DashboardPage() {
  return (
    <div className='grid grid-cols-1 gap-5 overflow-auto p-6 md:grid-cols-2 lg:grid-cols-4'>
      <div className='order-1'>
        <StatCard title='Total Project' value='25' icon={Icons.code} />
      </div>

      <div className='order-2'>
        <StatCard title='Total Blog' value='10' icon={Icons.notebookPen} />
      </div>

      <div className='order-5 row-span-2 md:col-span-2 lg:order-3'>
        <Top5VisitorsCountriesPieChart />
      </div>

      <div className='order-3 lg:order-4'>
        <StatCard title='Total Skills' value='50' icon={Icons.bulb} />
      </div>

      <div className='order-4 lg:order-5'>
        <StatCard title='Total Experience' value='50' icon={Icons.clock} />
      </div>

      <div className='order-6 md:col-span-2 lg:h-[432px]'>
        <Top5VisitorsCountriesList />
      </div>

      <div className='min-[428px] order-7 md:col-span-2 '>
        <TotalVisitorsLineChart />
      </div>
    </div>
  )
}
