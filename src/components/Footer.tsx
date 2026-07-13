import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mx-auto mt-16 flex max-w-3xl scroll-mt-28 flex-col items-center gap-4 border-t border-line px-6 py-20 text-center sm:mt-24 sm:flex-row sm:justify-between sm:text-left"
    >
      <p className="text-sm text-muted">
        {t.footer.builtBy} · {year}
      </p>
      <div className="flex items-center gap-5 text-sm">
        <a
          href="https://github.com/ibovibo"
          target="_blank"
          rel="noreferrer"
          className="rounded text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          GitHub
        </a>
        <a
          href="mailto:qrdanlar@gmail.com"
          className="rounded text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          qrdanlar@gmail.com
        </a>
      </div>
    </motion.footer>
  )
}
