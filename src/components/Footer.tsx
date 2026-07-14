import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const EMAIL = 'ibovibo61@gmail.com'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const linkClass =
    'text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded'

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-28"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          {t.contact.heading}
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          className="group mt-8 flex items-center gap-3 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-base font-medium text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {t.contact.emailCta}
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-accent">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

      <div className="border-t border-line bg-black/30 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex flex-col gap-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg font-semibold text-ink">{t.footer.tagline}</p>
              <a href={`mailto:${EMAIL}`} className={`mt-1 inline-block text-sm ${linkClass}`}>
                {EMAIL}
              </a>
            </div>

            <div className="flex justify-center gap-12 sm:justify-start">
              <div>
                <h3 className="text-sm font-semibold text-ink">{t.footer.discover}</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  <li>
                    <a href="#top" className={linkClass}>
                      {t.footer.home}
                    </a>
                  </li>
                  <li>
                    <a href="#about" className={linkClass}>
                      {t.nav.about}
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className={linkClass}>
                      {t.nav.projects}
                    </a>
                  </li>
                  <li>
                    <a href="#skills" className={linkClass}>
                      {t.nav.skills}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ink">{t.footer.socials}</h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  <li>
                    <a
                      href="https://github.com/ibovibo"
                      target="_blank"
                      rel="noreferrer"
                      className={linkClass}
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`} className={linkClass}>
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-line pt-6 text-center text-xs text-muted sm:text-left">
            © {year} İbrahim. {t.footer.rights}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
