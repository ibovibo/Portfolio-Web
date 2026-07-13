import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {t.skills.heading}
        </h2>

        <ul className="mt-6 flex flex-wrap gap-3">
          {t.skills.items.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-ink backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
