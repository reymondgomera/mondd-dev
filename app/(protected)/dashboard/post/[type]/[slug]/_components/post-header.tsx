'use client'

import { useParams } from 'next/navigation'

import { PostType } from '@/types'
import HeaderHeading from '@/app/(protected)/dashboard/_components/header-heading'
import AddPostButton from '../../_components/add-post-button'

export default function PostHeader() {
  const { type } = useParams() as { type: PostType }

  switch (type) {
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
