import { useState, useEffect, useRef, useCallback } from 'react'

export function useHeaderSticky() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)
  const headerContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const ref = headerContainerRef.current
    if (ref && ref?.offsetTop > 0) setIsHeaderSticky(true)
    else setIsHeaderSticky(false)
  }, [headerContainerRef])

  useEffect(() => {
    if (headerContainerRef.current) window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerContainerRef])

  return { isHeaderSticky, headerContainerRef }
}
