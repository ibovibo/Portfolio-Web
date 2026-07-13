import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex max-w-2xl flex-col items-center"
      >
        <span className="mb-4 rounded-full border border-accent-dim bg-accent-soft px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
          {t.hero.eyebrow}
        </span>

        <h1 className="text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
          {t.hero.name}
        </h1>

        <p className="mt-6 max-w-md text-balance text-base text-muted sm:text-lg">
          {t.hero.tagline}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <a
            href="https://github.com/ibovibo"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            {t.hero.githubCta}
          </a>
          <a
            href="mailto:qrdanlar@gmail.com"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {t.hero.emailCta}
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-xs text-muted">
        <span>{t.hero.scrollHint}</span>
        <span className="h-8 w-px animate-pulse bg-line" />
      </div>
    </section>
  )
}
