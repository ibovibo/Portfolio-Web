import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const SkillLogo3D = lazy(() => import('./SkillLogo3D'))

const SKILL_LOGOS: Record<string, string> = {
  GitHub: '/assets/github.glb',
  Git: '/assets/gitlogo.glb',
  Python: '/assets/pythonlogo.glb',
  SQL: '/assets/sqllogo.glb',
  Pandas: '/assets/pandaslogo.glb',
  NumPy: '/assets/numpylogo.glb',
}

const SKILL_DISC_COLORS: Record<string, string> = {
  Git: '#000000',
  Python: '#000000',
  Pandas: '#000000',
}

const ROW_HEIGHT = 230
const LEFT_X = 25
const RIGHT_X = 75

function curvedPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ''
  let d = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const p = points[i]
    const midY = (prev.y + p.y) / 2
    d += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
  }

  return d
}

export default function Skills() {
  const { t } = useLanguage()
  const items = t.skills.items
  const n = items.length

  const points = items.map((_, i) => ({
    x: i % 2 === 0 ? LEFT_X : RIGHT_X,
    y: (i + 0.5) * 100,
  }))

  const pathD = curvedPath(points)

  return (
    <section id="skills" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-32 sm:py-48">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {t.skills.heading}
        </h2>

        <div className="relative mt-10" style={{ height: n * ROW_HEIGHT }}>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 100 ${n * 100}`}
            preserveAspectRatio="none"
          >
            <path d={pathD} fill="none" stroke="#16a34a" strokeWidth={4} strokeLinecap="round" />
            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth={0.6}
              strokeDasharray="3 3"
              strokeLinecap="round"
              opacity={0.6}
            />
          </svg>

          {items.map((skill, i) => {
            const logoPath = SKILL_LOGOS[skill]
            const p = points[i]
            return (
              <div
                key={skill}
                className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 sm:h-40 sm:w-40"
                style={{ left: `${p.x}%`, top: `${(p.y / (n * 100)) * 100}%` }}
              >
                {logoPath ? (
                  <Suspense
                    fallback={
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
                        {skill.charAt(0)}
                      </div>
                    }
                  >
                    <SkillLogo3D
                      path={logoPath}
                      label={skill}
                      discColor={SKILL_DISC_COLORS[skill]}
                    />
                  </Suspense>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
                    {skill.charAt(0)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
