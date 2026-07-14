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
  const x = useTransform(scrollYProgress, [0, 0.48, 0.52, 1], [start, '0%', '0%', end])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.94, 1, 1, 1, 0.94])
  const sheenX = useTransform(scrollYProgress, [0, 1], ['-30%', '230%'])
  const cardBackground = useTransform(
    scrollYProgress,
    [0, 0.42, 0.48, 0.52, 0.58, 1],
    ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', '#ffffff', '#ffffff', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)'],
  )

  if (reducedMotion) {
    return { ref, x: undefined, scale: undefined, sheenX: undefined, cardBackground: undefined, progress: undefined }
  }

  return { ref, x, scale, sheenX, cardBackground, progress: scrollYProgress }
}
