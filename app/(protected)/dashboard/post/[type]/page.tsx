import { PostType } from '@/types'
import HeaderHeading from '../../_components/header-heading'
import AddPostButton from './_components/add-post-button'

export default function PostsPage({ params }: { params: { type: PostType } }) {
  function Heading() {
    switch (params.type) {
      case 'project': {
        return (
          <div className='flex items-center justify-between'>
            <HeaderHeading title='Projects' description='These are all the projects you have made throughout your career.' />
            <AddPostButton />
          </div>
        )
      }

      default: {
        return (
          <div className='flex items-center justify-between'>
            <HeaderHeading title='Blog' description='These are all the blogs you want to share with everyone.' />
            <AddPostButton />
          </div>
        )
      }
    }
  }

  return (
    <>
      <Heading />
    </>
  )
}
