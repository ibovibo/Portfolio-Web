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

export default function Skills() {
  const { t } = useLanguage()

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

        <div className="mt-6 flex flex-wrap gap-6">
          {t.skills.items.map((skill) => {
            const logoPath = SKILL_LOGOS[skill]
            return (
              <div key={skill} className="h-64 w-64">
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
