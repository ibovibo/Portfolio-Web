import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto flex max-w-3xl flex-col items-center gap-4 border-t border-line px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
      <p className="text-sm text-muted">
        {t.footer.builtBy} · {year}
      </p>
      <div className="flex items-center gap-5 text-sm">
        <a
          href="https://github.com/ibovibo"
          target="_blank"
          rel="noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          GitHub
        </a>
        <a
          href="mailto:qrdanlar@gmail.com"
          className="text-muted transition-colors hover:text-accent"
        >
          qrdanlar@gmail.com
        </a>
      </div>
    </footer>
  )
}
