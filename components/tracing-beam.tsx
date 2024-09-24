'use client'

import React, { useMemo, useRef } from 'react'
import { motion, useTransform, useScroll, useSpring } from 'framer-motion'

import { cn } from '@/lib'
import { TailwindColorVariables } from '@/types'
import { useElementSize } from '@/hooks/use-element-size'

type TracingBeamProps = {
  children: React.ReactNode
  className?: string
  dot: {
    color: TailwindColorVariables
    border: TailwindColorVariables
  }
  gradientColor: {
    color1: TailwindColorVariables
    color2: TailwindColorVariables
    color3: TailwindColorVariables
    color4: TailwindColorVariables
  }
}

export const TracingBeam = ({ children, className, dot, gradientColor }: TracingBeamProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { ref: contentRef, height } = useElementSize()
  const svgHeight = useMemo(() => height - 80, [height])

  const { scrollYProgress } = useScroll()

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]), {
    stiffness: 500,
    damping: 90
  })

  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight]), {
    stiffness: 500,
    damping: 90
  })

  return (
    <motion.div ref={ref} className={cn('relative mx-auto h-full w-full max-w-4xl', className)}>
      <div className='absolute -left-4 top-0 hidden md:-left-20 lg:block'>
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5
          }}
          animate={{
            boxShadow: scrollYProgress.get() > 0 ? 'none' : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}
          className='border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm'
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5
            }}
            animate={{
              backgroundColor: `var(${dot.color})`,
              borderColor: `var(${dot.border})`
            }}
            className='size-3 rounded-full border border-neutral-300 bg-white'
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width='20'
          height={svgHeight} //* Set the SVG height
          className='ml-4 block'
          aria-hidden='true'
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill='none'
            stroke='#9091A0'
            strokeOpacity='0.16'
            transition={{
              duration: 10
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='1.25'
            className='motion-reduce:hidden'
            transition={{
              duration: 10
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id='gradient'
              gradientUnits='userSpaceOnUse'
              x1='0'
              x2='0'
              y1={y1} //* set y1 for gradient
              y2={y2} //* set y2 for gradient
            >
              <stop stopColor={`var(${gradientColor.color1})`} stopOpacity='0'></stop>
              <stop stopColor={`var(${gradientColor.color2})`}></stop>
              <stop offset='0.325' stopColor={`var(${gradientColor.color3})`}></stop>
              <stop offset='1' stopColor={`var(${gradientColor.color4})`} stopOpacity='0'></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
