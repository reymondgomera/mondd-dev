import Link from 'next/link'
import { notFound } from 'next/navigation'

import { capitalize } from '@/lib'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { getExperienceById } from '@/actions'
import ExperienceForm from './_components/experience-form'

export default async function ExperiencePage({ params }: { params: { id: string } }) {
  const experience = params.id !== 'new' ? await getExperienceById(params.id) : null

  if (params.id !== 'new' && !experience) notFound()

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className='dark:hover:text-slate:200 dark:text-slate-400' href='/dashboard/experience'>
                Experience
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className='font-semibold text-primary hover:text-primary dark:text-slate-200'
                href={`/dashboard/experience/${params.id}`}
              >
                {params.id !== 'new' ? experience?.id : capitalize(params.id)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ExperienceForm experience={experience} />
    </>
  )
}
