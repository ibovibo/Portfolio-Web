import type { Variants } from 'framer-motion'

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}
