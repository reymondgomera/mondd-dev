import Link from 'next/link'

import { Icons } from '@/components/icons'
import { navItems, siteConfig } from '@/constant'

export default function Footer() {
  return (
    <footer className='flex flex-col border border-t border-slate-500/15'>
      <div className='container flex flex-col gap-y-4 bg-base-primary py-6 lg:flex-row lg:justify-between lg:gap-0'>
        <div className='flex flex-col items-center gap-y-3 lg:items-start'>
          <Icons.logo />
          <div className='flex gap-3'>
            <Link className='group transition-all hover:scale-125' href={siteConfig.socials.github} target='_blank'>
              <Icons.social.github className='size-5 fill-current text-slate-400 group-hover:text-slate-200' />
            </Link>
            <Link className='group transition-all hover:scale-125' href={siteConfig.socials.linkedIn} target='_blank'>
              <Icons.social.linkedIn className='size-5 fill-current text-slate-400 group-hover:text-slate-200' />
            </Link>
            <Link className='group transition-all hover:scale-125' href={siteConfig.socials.email} target='_blank'>
              <Icons.social.email className='size-5 fill-current text-slate-400 group-hover:text-slate-200' />
            </Link>
            <Link className='group transition-all hover:scale-125' href={siteConfig.socials.facebook} target='_blank'>
              <Icons.social.facebook className='size-5 fill-current text-slate-400 group-hover:text-slate-200' />
            </Link>
            <Link className='group transition-all hover:scale-125' href={siteConfig.socials.instagram} target='_blank'>
              <Icons.social.instagram className='size-5 fill-current text-slate-400 group-hover:text-slate-200' />
            </Link>
            <Link className='group transition-all hover:scale-125' href={siteConfig.socials.twitter} target='_blank'>
              <Icons.social.twitterX className='size-5 fill-current text-slate-400 group-hover:text-slate-200' />
            </Link>
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-x-3 gap-y-0'>
          {navItems.length > 0
            ? navItems.map((item, i) => (
                <Link className='p-3 text-sm' key={`${i}-footer-nav`} href={item.href}>
                  {item.title}
                </Link>
              ))
            : null}
        </div>
      </div>
      <div className='flex justify-center bg-base-dark py-3'>
        <div className='flex gap-1 text-sm'>
          <span>© 2024, Made with</span>
          <img src='/images/heart.svg' alt='heart' />
          <span> by</span>
          <span className='font-semibold text-teal-300'>mond</span>
        </div>
      </div>
    </footer>
  )
}
