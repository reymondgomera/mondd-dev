import Button from '@/components/custom/button'
import { Icons } from '@/components/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './sidebar'

export default function MobileToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='min-[1200px]:hidden'>
          <Icons.menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='w-fit p-0' side='left'>
        <Sidebar className='mt-8' />
      </SheetContent>
    </Sheet>
  )
}
