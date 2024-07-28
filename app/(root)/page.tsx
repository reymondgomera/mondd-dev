import { Icons } from '@/components/icons'
import AsyncWrapper from '@/components/async-wrapper'
import SectionWrapper from '@/components/section-wrapper'
import SectionHeader from '@/components/section-header'
import { ComponentErrorFallback } from '@/components/error-fallback'
import { BlogSkeleton, ExperienceSkeleton, ProjectSkeleton, SkillSkeleton } from '@/components/loading-fallback'
import ContactForm from './_components/form/contact-form'
import SkillTabs from './_components/skill-tabs'
import ProjectBento from './_components/project-bento'
import ExperienceTimeline from './_components/experience-timeline'
import AboutSection from './_components/about-section'
import BlogBento from './_components/blog-bento'

export default async function Home() {
  return (
    <>
      <AboutSection />

      <SectionWrapper id='skill' className='landing-page-section' enableSyncNav>
        <SectionHeader title='Skill'>
          All the <span className='font-bold text-slate-200'>tech stacks, tools</span>, and
          <span className='font-bold text-slate-200'> platforms</span> I have used throughout my experience in Web development.
        </SectionHeader>

        <div className='mx-auto max-w-5xl'>
          <AsyncWrapper
            errorBoundaryProps={{
              FallbackComponent: ComponentErrorFallback,
              extendedProps: {
                componentErrorFallback: {
                  title: "Oops! skill can't be loaded",
                  description: 'Something went wrong!',
                  className: 'p-2',
                  icon: <Icons.circleAlert className='size-14 text-destructive' />
                }
              }
            }}
            suspenseProps={{ fallback: <SkillSkeleton /> }}
          >
            <SkillTabs />
          </AsyncWrapper>
        </div>
      </SectionWrapper>

      <SectionWrapper id='project' className='landing-page-section' enableSyncNav>
        <SectionHeader title='Project'>
          These projects demonstrate my <span className='font-bold text-slate-200'>skills</span> and{' '}
          <span className='font-bold text-slate-200'>expertise</span> in web development.
        </SectionHeader>

        <AsyncWrapper
          errorBoundaryProps={{
            FallbackComponent: ComponentErrorFallback,
            extendedProps: {
              componentErrorFallback: {
                title: "Oops! project can't be loaded",
                description: 'Something went wrong!',
                className: 'p-2',
                icon: <Icons.circleAlert className='size-14 text-destructive' />
              }
            }
          }}
          suspenseProps={{ fallback: <ProjectSkeleton /> }}
        >
          <ProjectBento />
        </AsyncWrapper>
      </SectionWrapper>

      <SectionWrapper id='experience' className='landing-page-section' enableSyncNav>
        <SectionHeader title='Experience'>
          Discover the timeline of my <span className='font-bold text-slate-200'>professional journey</span>, highlighting my{' '}
          <span className='font-bold text-slate-200'>work experiences</span> and the
          <span className='font-bold text-slate-200'> skills</span> I've honed along the way.
        </SectionHeader>

        <AsyncWrapper
          errorBoundaryProps={{
            FallbackComponent: ComponentErrorFallback,
            extendedProps: {
              componentErrorFallback: {
                title: "Oops! experience can't be loaded",
                description: 'Something went wrong!',
                className: 'p-2',
                icon: <Icons.circleAlert className='size-14 text-destructive' />
              }
            }
          }}
          suspenseProps={{ fallback: <ExperienceSkeleton /> }}
        >
          <ExperienceTimeline />
        </AsyncWrapper>
      </SectionWrapper>

      <SectionWrapper id='blog' className='landing-page-section' enableSyncNav>
        <SectionHeader title='Blog'>
          Explore my latest blogs for <span className='font-bold text-slate-200'>tips</span>,
          <span className='font-bold text-slate-200'> tutorials</span>, and discussions related to
          <span className='font-bold text-slate-200'> web development</span>.
        </SectionHeader>

        <AsyncWrapper
          errorBoundaryProps={{
            FallbackComponent: ComponentErrorFallback,
            extendedProps: {
              componentErrorFallback: {
                title: "Oops! blog can't be loaded",
                description: 'Something went wrong!',
                className: 'p-2',
                icon: <Icons.circleAlert className='size-14 text-destructive' />
              }
            }
          }}
          suspenseProps={{ fallback: <BlogSkeleton /> }}
        >
          <BlogBento />
        </AsyncWrapper>
      </SectionWrapper>

      <SectionWrapper id='contact' className='landing-page-section' enableSyncNav>
        <div className='mx-auto flex flex-col items-center gap-11 lg:flex-row lg:gap-20'>
          <div className='flex flex-col gap-9'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-balance text-center text-2xl font-extrabold text-slate-200 sm:text-3xl md:text-4xl lg:text-left lg:text-4xl'>
                Got an opportunity?
              </h1>
              <div className='relative'>
                <h1 className='text-balance text-center text-2xl font-extrabold text-teal-300 sm:text-3xl md:text-4xl lg:text-left lg:text-4xl'>
                  Let’s talk!
                </h1>
                <div className='absolute -top-4 left-24 size-[72px] rounded-full bg-teal-300/10 blur-lg sm:left-28 md:left-32 lg:left-11' />
              </div>
            </div>
            <div className='flex flex-col items-center gap-2 lg:items-start'>
              <div className='flex items-center gap-2 text-sm font-semibold text-slate-200'>
                <Icons.phone className='size-4' />
                (+63) 935 740 2196 | 909 425 4367
              </div>
              <div className='flex items-center gap-2 text-sm font-semibold text-slate-200'>
                <Icons.mail className='size-4' />
                reymondgomera24@gmail.com
              </div>
              <div className='flex items-center gap-2 text-sm font-semibold text-slate-200'>
                <Icons.location className='size-4' />
                Davao City, Davao Del Sur, Philippines
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-6 rounded-lg border border-slate-500/15 bg-slate-subtle-1 p-6 md:w-[532px] md:p-7 lg:p-10'>
            <div className='flex flex-col justify-center gap-1'>
              <div className='text-balance text-center text-lg font-bold text-teal-300'>Contact Me</div>
              <p className='text-center text-sm text-slate-400'>
                Get in touch with me via <span className='font-bold text-slate-200'>email</span> or by filling out the contact form. I will
                get back to you <span className='font-bold text-slate-200'>promptly</span>.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
