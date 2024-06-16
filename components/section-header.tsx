type SectionHeaderProps = {
  title: string
  children?: React.ReactNode
}

export default function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className='relative mx-auto flex max-w-3xl flex-col gap-3'>
      <h1 className='text-balance text-center text-2xl font-extrabold md:text-3xl lg:text-4xl'>{title}</h1>
      <p className='text-center text-sm leading-5 text-slate-400 md:text-base md:leading-6 lg:leading-7'>{children}</p>
      <div className='absolute -top-5 left-[calc(50%-35px)] size-[72px] rounded-full bg-teal-300/10 blur-lg' />
    </div>
  )
}
