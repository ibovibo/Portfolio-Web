import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-start justify-start overflow-hidden px-6 pt-96 pb-16 text-left sm:px-16 sm:pt-[34rem]"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex max-w-3xl flex-col items-start gap-5 sm:gap-6"
      >
        <h1 className="font-bold tracking-tighter text-ink">
          <span className="block text-6xl leading-[0.95] sm:text-8xl">{t.hero.name}</span>
          <span className="mt-3 block text-2xl leading-tight sm:text-4xl">{t.hero.eyebrow}</span>
        </h1>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ibovibo"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-full bg-ink py-2 pl-8 pr-2 text-lg font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            {t.hero.githubCta}
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-accent">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-xs text-muted">
        <span>{t.hero.scrollHint}</span>
        <span className="h-8 w-px animate-pulse bg-line" />
      </div>
    </section>
  )
}
