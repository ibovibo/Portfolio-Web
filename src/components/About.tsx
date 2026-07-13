import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {t.about.heading}
        </h2>
        <p className="mt-4 text-xl leading-relaxed text-ink sm:text-2xl">{t.about.body}</p>
      </motion.div>
    </section>
  )
}
