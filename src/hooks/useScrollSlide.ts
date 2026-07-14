import { useRef } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function useScrollSlide<T extends HTMLElement>(from: 'left' | 'right') {
  const ref = useRef<T>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const start = from === 'left' ? '-100%' : '100%'
  const end = from === 'left' ? '100%' : '-100%'
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [start, '0%', end])

  return { ref, x: reducedMotion ? undefined : x }
}
