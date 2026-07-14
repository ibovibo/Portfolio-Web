import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const SECTION_IDS = ['about', 'projects', 'skills', 'contact']
const TRIGGER_RATIO = 0.55
const SHOW_TRIGGER_DEBUG = false

export default function Nav() {
  const { lang, t, toggleLang } = useLanguage()
  const [activeId, setActiveId] = useState('')
  const [triggerY, setTriggerY] = useState(0)

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => {
      const section = document.getElementById(id)
      if (!section) return null
      const heading = section.querySelector('h2')
      return { id, el: (heading ?? section) as HTMLElement }
    }).filter((target): target is { id: string; el: HTMLElement } => target !== null)

    const handleScroll = () => {
      const trigger = window.innerHeight * TRIGGER_RATIO
      setTriggerY(trigger)
      let current = ''
      for (const { id, el } of targets) {
        if (el.getBoundingClientRect().top <= trigger) {
          current = id
        }
      }
      setActiveId(current)
    }

    handleScroll()
    const raf = requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.addEventListener('load', handleScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('load', handleScroll)
    }
  }, [])

  const linkClass = (id: string) =>
    `rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
      activeId === id ? 'text-accent font-semibold' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex items-center justify-center px-6">
      <nav className="hidden items-center gap-10 rounded-full bg-black/50 px-8 py-4 text-base shadow-lg shadow-black/40 backdrop-blur-xl sm:flex">
        <a href="#about" className={linkClass('about')}>
          {t.nav.about}
        </a>
        <a href="#projects" className={linkClass('projects')}>
          {t.nav.projects}
        </a>
        <a href="#skills" className={linkClass('skills')}>
          {t.nav.skills}
        </a>
        <a href="#contact" className={linkClass('contact')}>
          {t.nav.contact}
        </a>
      </nav>

      <button
        type="button"
        onClick={toggleLang}
        aria-label="Toggle language"
        aria-pressed={lang === 'tr'}
        className="fixed right-6 top-6 z-50 h-10 w-24 rounded-full bg-black/50 p-1 shadow-lg shadow-black/40 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <span
          className="absolute left-1 top-1 h-8 w-11 rounded-full bg-accent transition-transform duration-300 ease-out"
          style={{ transform: lang === 'tr' ? 'translateX(100%)' : 'translateX(0%)' }}
        />
        <span className="relative z-10 grid h-full w-full grid-cols-2 text-xs font-semibold">
          <span
            className={`flex items-center justify-center transition-colors duration-300 ${
              lang === 'en' ? 'text-paper' : 'text-muted'
            }`}
          >
            EN
          </span>
          <span
            className={`flex items-center justify-center transition-colors duration-300 ${
              lang === 'tr' ? 'text-paper' : 'text-muted'
            }`}
          >
            TR
          </span>
        </span>
      </button>

      {SHOW_TRIGGER_DEBUG && (
        <div
          className="pointer-events-none fixed inset-x-0 z-[9999] flex items-center gap-2 px-2"
          style={{ top: triggerY }}
        >
          <span className="h-px flex-1 bg-red-500" />
          <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            trigger {Math.round(triggerY)}px
          </span>
          <span className="h-px flex-1 bg-red-500" />
        </div>
      )}
    </header>
  )
}
