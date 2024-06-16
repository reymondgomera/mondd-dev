import Link from 'next/link'

import { siteConfig } from '@/constant'
import { Icons } from '@/components/icons'
import { cn } from '@/lib'

type FixedSocialNavProps = {
  className?: string
  isInView: boolean
}

export default function FixedSocialNav({ className, isInView }: FixedSocialNavProps) {
  return (
    <div
      className={cn(
        'fixed top-[30%] z-50 flex w-fit flex-col items-center justify-center gap-3 rounded-lg bg-slate-subtle-1 p-3 transition-all',
        isInView ? 'hidden' : 'fixed',
        className
      )}
    >
      <Link className='group transition-all hover:scale-125' href={siteConfig.socials.github} target='_blank'>
        <Icons.social.github className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
      </Link>
      <Link className='group transition-all hover:scale-125' href={siteConfig.socials.linkedIn} target='_blank'>
        <Icons.social.linkedIn className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
      </Link>
      <Link className='group transition-all hover:scale-125' href={siteConfig.socials.email} target='_blank'>
        <Icons.social.email className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
      </Link>
      <Link className='group transition-all hover:scale-125' href={siteConfig.socials.facebook} target='_blank'>
        <Icons.social.facebook className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
      </Link>
      <Link className='group transition-all hover:scale-125' href={siteConfig.socials.instagram} target='_blank'>
        <Icons.social.instagram className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
      </Link>
      <Link className='group transition-all hover:scale-125' href={siteConfig.socials.twitter} target='_blank'>
        <Icons.social.twitterX className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
      </Link>
      <Link className='group transition-all hover:scale-125' href={siteConfig.downloadUrls.resume} target='_blank'>
        <Icons.fileText className='size-6 fill-current stroke-slate-400 text-slate-subtle-1 group-hover:stroke-slate-200' />
      </Link>
    </div>
  )
}
