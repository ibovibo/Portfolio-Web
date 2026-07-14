import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollSlide } from '../hooks/useScrollSlide'
import ColorRevealText from './ColorRevealText'

export default function About() {
  const { t } = useLanguage()
  const { ref, x, scale, sheenX, cardBackground, progress } = useScrollSlide<HTMLDivElement>('left')

  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-32 pt-48 sm:pb-48 sm:pt-64">
      <motion.div
        ref={ref}
        style={{ x, scale, backgroundColor: cardBackground }}
        className="transform-gpu relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-10 sm:py-5"
      >
        <motion.div
          aria-hidden
          style={{ x: sheenX }}
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <h2 className="relative text-sm font-semibold uppercase tracking-widest text-accent">
          {t.about.heading}
        </h2>
        <p className="relative mt-2 max-w-xl text-balance text-xl leading-relaxed text-ink sm:text-2xl">
          <ColorRevealText text={t.about.body} progress={progress} />
        </p>
      </motion.div>
    </section>
  )
}
