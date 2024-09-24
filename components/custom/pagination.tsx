'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib'

type ListPaginationProps<T> = {
  data: T[]
  initialPerPage: number
  pageCount: number
  pageLimit?: number
  className?: string
}

export default function ListPagination<T>({ data, pageLimit = 5, pageCount, initialPerPage, className }: ListPaginationProps<T>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [pagesStart, setPagesStart] = useState<number>(0)
  const [pagesEnd, setPagesEnd] = useState<number>(pageLimit)

  const page = useMemo(() => (isNaN(Number(searchParams.get('page'))) ? 1 : Number(searchParams.get('page'))), [searchParams])
  const pages = useMemo(
    () => data && Array.from({ length: pageCount }, (_, i) => i + 1).slice(pagesStart, pagesEnd),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageCount, pagesEnd, pagesEnd]
  )

  const pageHandler = (pageNumber: number) => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
    currentSearchParams.set('page', pageNumber.toString())

    const query = currentSearchParams.toString()

    router.push(`${pathname}?${query}`, { scroll: false })
  }

  const previousHandler = () => {
    if (page === 1) return
    pageHandler(page - 1)
  }

  const nextHandler = () => {
    if (page === pageCount) return
    pageHandler(page + 1)
  }

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
    const page = searchParams.get('page')
    const per_page = searchParams.get('per_page')

    if (!page) currentSearchParams.set('page', '1')
    if (!per_page) currentSearchParams.set('per_page', initialPerPage.toString())

    const query = currentSearchParams.toString()

    router.push(`${pathname}?${query}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const newStart = Math.floor((page - 1) / pageLimit) * pageLimit
    const newEnd = Math.min(newStart + pageLimit, pageCount)

    setPagesStart(newStart)
    setPagesEnd(newEnd)
  }, [page, pageLimit, pageCount])

  if (data.length < 1) return null

  return (
    <Pagination className={className}>
      <PaginationContent className='flex-wrap justify-center gap-2'>
        <PaginationItem className='hidden cursor-pointer select-none md:block'>
          <PaginationPrevious className={buttonVariants({ variant: 'primary' })} onClick={previousHandler} />
        </PaginationItem>

        {/* Show ellipsis before current set if not starting from 1 */}
        {pagesStart > 0 && (
          <>
            <PaginationItem className='hidden cursor-pointer md:block'>
              <PaginationLink
                className={buttonVariants({
                  variant: 'primary',
                  className: cn(page === 1 && 'dark:border-teal-300/10 dark:bg-teal-400/10 dark:text-teal-400')
                })}
                onClick={() => pageHandler(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem className='hidden select-none md:block'>
              <PaginationEllipsis>...</PaginationEllipsis>
            </PaginationItem>
          </>
        )}

        {pages &&
          pages.map((p) => {
            return (
              <PaginationItem key={p} className='cursor-pointer select-none'>
                <PaginationLink
                  className={buttonVariants({
                    variant: 'primary',
                    className: cn(p === page && 'dark:border-teal-300/10 dark:bg-teal-400/10 dark:text-teal-400')
                  })}
                  onClick={() => pageHandler(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          })}

        {/* Show ellipsis after current set if there are more pages */}
        {pagesEnd < pageCount && (
          <>
            <PaginationItem className='hidden select-none md:block'>
              <PaginationEllipsis>...</PaginationEllipsis>
            </PaginationItem>

            <PaginationItem className='hidden cursor-pointer md:block'>
              <PaginationLink
                className={buttonVariants({
                  variant: 'primary',
                  className: cn(page === pageCount && 'dark:border-teal-300/10 dark:bg-teal-400/10 dark:text-teal-400')
                })}
                onClick={() => pageHandler(pageCount)}
              >
                {pageCount}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem className='hidden cursor-pointer select-none md:block'>
          <PaginationNext className={buttonVariants({ variant: 'primary' })} onClick={nextHandler} />
        </PaginationItem>

        {/* previous & next button on small screen devices */}
        <div className='flex w-full justify-center gap-1 md:hidden'>
          <PaginationItem className='cursor-pointer select-none'>
            <PaginationPrevious className={buttonVariants({ variant: 'primary' })} onClick={previousHandler} />
          </PaginationItem>
          <PaginationItem className='cursor-pointer select-none'>
            <PaginationNext className={buttonVariants({ variant: 'primary' })} onClick={nextHandler} />
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  )
}
