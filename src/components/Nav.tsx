import { useLanguage } from '../i18n/LanguageContext'

export default function Nav() {
  const { lang, t, toggleLang } = useLanguage()

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
      <a
        href="#top"
        className="font-semibold tracking-tight text-ink hover:text-accent transition-colors"
      >
        İbrahim
      </a>

      <nav className="flex items-center gap-6 text-sm">
        <a href="#about" className="hidden sm:inline text-muted hover:text-ink transition-colors">
          {t.nav.about}
        </a>
        <a href="#skills" className="hidden sm:inline text-muted hover:text-ink transition-colors">
          {t.nav.skills}
        </a>
        <a href="#projects" className="hidden sm:inline text-muted hover:text-ink transition-colors">
          {t.nav.projects}
        </a>

        <button
          type="button"
          onClick={toggleLang}
          aria-label="Toggle language"
          className="flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-accent hover:text-accent transition-colors"
        >
          <span className={lang === 'en' ? 'text-ink font-semibold' : ''}>EN</span>
          <span className="text-line">/</span>
          <span className={lang === 'tr' ? 'text-ink font-semibold' : ''}>TR</span>
        </button>
      </nav>
    </header>
  )
}
