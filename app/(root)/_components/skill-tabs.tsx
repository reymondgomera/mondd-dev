import { unstable_cache } from 'next/cache'

import SkillCard from './skill-card'
import { getReferences } from '@/actions'
import { SkillsDataForLandingPage, getSkillsForLandingPage } from '@/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/custom/tabs'

type RenderTabsContent = {
  triggers: { value: string; label: string }[]
  skills: SkillsDataForLandingPage[]
}

async function getSkillType() {
  return await unstable_cache(
    async () => getReferences({ entityCodes: ['skill-type'] }),
    ['skill-type-landing-page', 'skill-landing-page'],
    {
      tags: ['skill-type-landing-page', 'skill-landing-page']
    }
  )()
}

export default async function SkillTabs() {
  const [skilltypes, skills] = await Promise.all([getSkillType(), getSkillsForLandingPage()])

  if (!skilltypes || !skills) return null

  const triggers = [
    { value: 'all', label: 'All' },
    ...skilltypes
      .sort((a, b) => {
        const metaDataA = a.metadata as { order: number }
        const metaDataB = b.metadata as { order: number }
        return metaDataA.order - metaDataB.order
      })
      .map((type) => ({ value: type.code, label: type.name }))
  ]

  function renderTabsContent({ triggers, skills }: RenderTabsContent) {
    if (!triggers || !skills) return null

    return triggers.map((trigger, i) => (
      <TabsContent
        key={`${i}-${trigger.value}`}
        className='flex w-full max-w-3xl flex-wrap justify-center gap-4 p-3 data-[state=inactive]:m-0 data-[state=inactive]:p-0 sm:min-w-72 lg:max-w-5xl'
        value={trigger.value}
      >
        {skills
          .filter((skill) => trigger.value === skill.typeCode)
          .map((skill, i) => (
            <SkillCard key={`${i}-${skill.title}`} title={skill.title} icon={skill.logo} isFavorite={skill.isFavorite} />
          ))}
      </TabsContent>
    ))
  }

  return (
    <Tabs defaultValue='all' className='w-full'>
      <TabsList>
        {triggers.map((trigger, i) => (
          <TabsTrigger key={`${i}-tabs-trigger`} value={trigger.value}>
            {trigger.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent
        className='flex w-full max-w-3xl flex-wrap justify-center gap-4 p-3 data-[state=inactive]:m-0 data-[state=inactive]:p-0 sm:min-w-72 lg:max-w-5xl'
        value='all'
      >
        {skills.map((skill, i) => (
          <SkillCard key={i} title={skill.title} icon={skill.logo} isFavorite={skill.isFavorite} />
        ))}
      </TabsContent>

      {renderTabsContent({ triggers, skills })}
    </Tabs>
  )
}
