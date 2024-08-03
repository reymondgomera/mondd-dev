import { capitalize } from '@/lib'

export default function PostCreatePage({ params }: { params: { type: 'project' | 'blog'; slug: string } }) {
  return (
    <div className='flex h-full w-full items-center justify-center p-2'>
      Dashboard - Post - {capitalize(params.type)} - {params.slug}
    </div>
  )
}
