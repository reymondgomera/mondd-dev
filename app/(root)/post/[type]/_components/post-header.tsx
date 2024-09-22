'use client'

import { useForm } from 'react-hook-form'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { GetPostsForm, getPostsFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostType } from '@/types'
import { capitalize } from '@/lib'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function PostHeader() {
  const router = useRouter()
  const { type } = useParams() as { type: PostType }
  const searchParams = useSearchParams()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const debouncedHandleChange = useDebouncedCallback(function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
    const { value } = event.target

    currentSearchParams.set('title', value)
    currentSearchParams.set('page', '1')

    const query = currentSearchParams.toString()

    router.push(`/post/${type}?${query}`)
  }, 500)

  function Heading() {
    switch (type) {
      case 'project': {
        return (
          <div className='relative flex flex-col gap-y-3'>
            <h1 className='text-balance text-center text-2xl font-extrabold md:text-3xl lg:text-4xl'>Project</h1>
            <p className='text-center text-sm leading-5 text-slate-400 md:text-base md:leading-6 lg:leading-7'>
              These projects demonstrate my <span className='font-bold text-slate-200'>skills</span> and{' '}
              <span className='font-bold text-slate-200'>expertise</span> in web development.
            </p>
            <div className='absolute -top-5 left-[calc(50%-35px)] size-[72px] rounded-full bg-teal-300/10 blur-lg' />
          </div>
        )
      }

      case 'blog': {
        return (
          <div className='relative flex flex-col gap-y-3'>
            <h1 className='text-balance text-center text-2xl font-extrabold md:text-3xl lg:text-4xl'>{capitalize(type)}</h1>
            <p className='text-center text-sm leading-5 text-slate-400 md:text-base md:leading-6 lg:leading-7'>
              Explore my latest blogs for <span className='font-bold text-slate-200'>tips</span>,{' '}
              <span className='font-bold text-slate-200'>tutorials</span>, and <span className='font-bold text-slate-200'>discussions</span>{' '}
              related to <span className='font-bold text-slate-200'>software development</span>.
            </p>
            <div className='absolute -top-5 left-[calc(50%-35px)] size-[72px] rounded-full bg-teal-300/10 blur-lg' />
          </div>
        )
      }

      default:
        return null
    }
  }

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.value = searchParams.get('title') ?? ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputRef])

  return (
    <header className='flex max-w-3xl flex-col items-center justify-center gap-8'>
      <Heading />

      <div className='flex w-full justify-center'>
        <div className='relative w-full sm:w-auto'>
          <Icons.search className='absolute left-2.5 top-2.5 size-5 text-slate-400' />
          <Input ref={searchInputRef} className='w-full pl-10 sm:w-[440px]' placeholder='Search...' onChange={debouncedHandleChange} />
        </div>
      </div>
    </header>
  )
}
