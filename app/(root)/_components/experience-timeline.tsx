import { getExperiencesForLandingPage } from '@/actions'
import ExperienceTimelineItem from './experience-timeline-item'

export default async function ExperienceTimeline() {
  const experiences = await getExperiencesForLandingPage()

  return (
    <div className='mx-auto max-w-3xl'>
      <div className='flex flex-col'>
        {experiences.map((item, i) => (
          <ExperienceTimelineItem key={`${i}-${item.title}`} experiences={experiences} exprience={item} index={i} />
        ))}
      </div>
    </div>
  )
}
