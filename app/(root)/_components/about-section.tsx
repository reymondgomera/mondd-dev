'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useInView } from 'framer-motion'

import { Icons } from '@/components/icons'
import { siteConfig } from '@/constant'
import { Badge } from '@/components/ui/badge'
import ContactMeButton from './contact-me-button'
import FixedSocialNav from './fixed-social-nav'
import BlurImage from '@/components/blur-image'

export default function AboutSection() {
  const contactRef = useRef(null)
  const isInView = useInView(contactRef, { amount: 'all' }) //? amount: 'all' - tells the animation to only run whenever the entire element is in the viewport/screen

  return (
    <>
      <section id='about' className='container flex flex-col items-center justify-center gap-10 py-[72px] lg:flex-row'>
        <div className='order-2 flex max-w-2xl flex-col items-center gap-6 lg:order-1 lg:items-start'>
          {/* hero content */}
          <div className='flex flex-col items-center gap-4 lg:items-start'>
            <div className='relative flex flex-col items-center gap-3 lg:items-start'>
              <Badge className='w-fit' variant='primary' size='sm'>
                Nice to meet you!
              </Badge>
              <h1 className='w-fit text-balance text-3xl font-extrabold lg:text-4xl xl:text-5xl'>
                Hi, I am <span className='text-teal-300'>Mond</span>
              </h1>

              <div className='absolute -top-10 left-16 -z-10 size-52 animate-pulse rounded-full bg-teal-300/10 blur-2xl lg:left-20 xl:left-28' />
            </div>
            <p className='text-center text-sm leading-5 text-slate-400 md:text-[15.5px] md:leading-6 lg:text-start lg:leading-7'>
              I am a <span className='font-bold text-slate-200'>Filipino web developer</span> with{' '}
              <span className='font-bold text-slate-200'>strong experience</span> in the{' '}
              <span className='font-bold text-slate-200'>JavaScript ecosystem</span>. I have work on both{' '}
              <span className='font-bold text-slate-200'>front-end</span> and{' '}
              <span className='font-bold text-slate-200'>back-end development</span> for{' '}
              <span className='font-bold text-slate-200'>over 2 years</span> now, I have built web apps using technologies like
              <span className='font-bold text-slate-200'> JavaScript/TypeScript</span>,{' '}
              <span className='font-bold text-slate-200'>React.js</span>, <span className='font-bold text-slate-200'>Next.js</span>,{' '}
              <span className='font-bold text-slate-200'>Node.js</span>, <span className='font-bold text-slate-200'> Express.js</span>,{' '}
              <span className='font-bold text-slate-200'>Nest.js</span> and databases such as{' '}
              <span className='font-bold text-slate-200'>PostgreSQL</span>, <span className='font-bold text-slate-200'>MySQL</span>,{' '}
              <span className='font-bold text-slate-200'>MSSQL</span>, <span className='font-bold text-slate-200'>Firebase Fire Store</span>{' '}
              and <span className='font-bold text-slate-200'>MongoDB</span>. I am passionate about{' '}
              <span className='font-bold text-slate-200'>exploring</span> and{' '}
              <span className='font-bold text-slate-200'>experimenting</span> with existing or latest technologies and finding ways to use
              them to improve development and create quality products.
            </p>

            {/* social */}
            <div ref={contactRef} className='flex gap-3'>
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
              <Link className='group transition-all hover:scale-125' href={siteConfig.socials.twitter} target='_blank'>
                <Icons.social.twitterX className='size-6 fill-current text-slate-400 group-hover:text-slate-200' />
              </Link>
            </div>
          </div>

          {/* hero cta */}
          <ContactMeButton />
        </div>

        {/* hero image */}
        <div className='order-1 flex w-60 items-center justify-center xs:w-[400px] lg:order-2 lg:w-[560px]'>
          <div className='relative min-w-[200px] rounded-full xs:w-[300px] md:w-[320px]'>
            <BlurImage className='!relative' src='/images/mond.png' alt='mond' fill />
            <div className='absolute left-6 top-5 -z-10 size-48 animate-pulse rounded-full bg-teal-300/15 blur-2xl xs:left-14 xs:top-10 sm:left-10 sm:size-56 md:left-12' />
          </div>
        </div>
      </section>

      <FixedSocialNav isInView={isInView} />
    </>
  )
}
