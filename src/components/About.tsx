import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUpItem, staggerContainer } from '../lib/motionVariants'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-32 pt-48 sm:pb-48 sm:pt-64">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="rounded-2xl bg-black/50 px-6 py-4 shadow-lg shadow-black/40 backdrop-blur-xl sm:px-10 sm:py-5"
      >
        <motion.h2
          variants={fadeUpItem}
          className="text-sm font-semibold uppercase tracking-widest text-accent"
        >
          {t.about.heading}
        </motion.h2>
        <motion.p
          variants={fadeUpItem}
          className="mt-2 max-w-xl text-balance text-xl leading-relaxed text-ink sm:text-2xl"
        >
          {t.about.body}
        </motion.p>
      </motion.div>
    </section>
  )
}
