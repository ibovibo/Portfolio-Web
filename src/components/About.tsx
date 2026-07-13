import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-28 px-6 pb-32 pt-48 sm:pb-48 sm:pt-64">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="rounded-2xl bg-black/50 px-6 py-4 shadow-lg shadow-black/40 backdrop-blur-xl sm:px-10 sm:py-5"
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {t.about.heading}
        </h2>
        <p className="mt-2 max-w-xl text-balance text-xl leading-relaxed text-ink sm:text-2xl">
          {t.about.body}
        </p>
      </motion.div>
    </section>
  )
}
