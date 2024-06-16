import Nav from './_components/nav'
import Footer from './_components/footer'
import { navItems } from '@/constant'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <Nav items={navItems} />
      <main id='main-content' className='flex-1'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
