type SkillCardProps = {
  title: string
  icon: string
  isFavorite?: boolean
}

export default function SkillCard({ title, icon, isFavorite }: SkillCardProps) {
  //?TODO: add tooltip
  return (
    <div className='group relative flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg bg-slate-subtle-1 p-2.5 transition-all hover:bg-teal-400/10 lg:size-32'>
      <img className='size-8 transition-all lg:size-[45px]' src={icon} alt={title} />
      <h2 className='text-balance text-center text-sm font-medium text-slate-200 group-hover:text-teal-300'>{title}</h2>

      {isFavorite ? <img className='absolute right-2 top-1 size-4' src='/images/heart.svg' alt='heart' /> : null}
    </div>
  )
}
