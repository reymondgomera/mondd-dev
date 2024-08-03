import { capitalize } from '@/lib'

export default function PostPage({ searchParams }: { searchParams: { type: 'project' | 'blog' } }) {
  return <div className='flex h-full w-full items-center justify-center p-2'>Dashboard - {capitalize(searchParams.type)}</div>
}
