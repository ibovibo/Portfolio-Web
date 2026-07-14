import { useEffect } from 'react'
import Lenis from 'lenis'

let activeLenis: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    activeLenis = lenis

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      activeLenis = null
    }
  }, [])
}

export function scrollToY(y: number) {
  if (activeLenis) {
    activeLenis.scrollTo(y, { duration: 1.1 })
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
