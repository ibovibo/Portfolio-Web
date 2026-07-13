import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-32 sm:py-48">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {t.projects.heading}
        </h2>

        {t.projects.items.length > 0 ? (
          <div className="mt-6 flex flex-col gap-4">
            {t.projects.items.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-2xl border border-transparent bg-black/50 p-6 shadow-lg shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
                  <span className="shrink-0 text-xs font-medium text-muted">{project.tag}</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">{project.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {project.linkLabel}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-black/50 p-8 text-center shadow-lg shadow-black/40 backdrop-blur-xl">
            <p className="text-sm text-muted">{t.projects.comingSoon}</p>
          </div>
        )}
      </motion.div>
    </section>
  )
}
