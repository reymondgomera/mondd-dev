import Nav from './_components/nav'
import Footer from './_components/footer'
import { navItems } from '@/constant'
import ForceDarkTheme from './_components/force-dark-theme'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ForceDarkTheme />

      <div className='relative flex min-h-screen flex-col'>
        <Nav items={navItems} />
        <main id='main-content' className='flex-1'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
