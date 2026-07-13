import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {t.projects.heading}
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          {t.projects.items.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-2xl border border-line bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-accent"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
                <span className="shrink-0 text-xs font-medium text-muted">{project.tag}</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {project.linkLabel}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
