import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { getReferences, getSkillById } from '@/actions'
import { capitalize } from '@/lib'
import SkillForm from './_components/skill-form'

export default async function SkillPage({ params }: { params: { id: string } }) {
  const skill = params.id !== 'new' ? await getSkillById(params.id) : null
  const skillTypes = await getReferences({ entityCodes: ['skill-type'] })

  if (params.id !== 'new' && !skill) notFound()

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className='dark:hover:text-slate:200 dark:text-slate-400' href='/dashboard/skill'>
                Skill
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className='font-semibold text-primary hover:text-primary dark:text-slate-200' href={`/dashboard/skill/${params.id}`}>
                {params.id !== 'new' ? skill?.id : capitalize(params.id)}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SkillForm skill={skill} skilltypes={skillTypes} />
    </>
  )
}
