type HeaderHeadingProps = {
  title: string
  description?: string
}

function HeaderHeading({ title, description }: HeaderHeadingProps) {
  return (
    <div className='flex flex-col justify-center'>
      <h1 className='text-base font-semibold lg:text-lg'>{title}</h1>
      {description ? <p className='text-sm text-slate-400 lg:text-base'>{description}</p> : null}
    </div>
  )
}

export default HeaderHeading
