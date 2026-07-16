import { lazy, Suspense, useEffect, useRef, useState } from 'react'
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
const LOOP_DURATION_MS = 35000
const TRIGGER_LEAD = 15

function segmentD(prev: { x: number; y: number }, p: { x: number; y: number }): string {
  const midY = (prev.y + p.y) / 2
  return `M ${prev.x} ${prev.y} C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
}

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

  const pathRef = useRef<SVGPathElement>(null)
  const segmentRefs = useRef<(SVGPathElement | null)[]>([])
  const carRef = useRef<HTMLDivElement>(null)
  const facingRight = useRef(true)
  const [spinTriggers, setSpinTriggers] = useState<Record<number, number>>({})

  useEffect(() => {
    const path = pathRef.current
    if (!path || points.length < 2) return

    const waypointLengths = [0]
    segmentRefs.current.forEach((seg) => {
      const segLen = seg?.getTotalLength() ?? 0
      waypointLengths.push(waypointLengths[waypointLengths.length - 1] + segLen)
    })
    const totalLength = waypointLengths[waypointLengths.length - 1]
    if (totalLength <= 0) return

    let raf: number
    let start: number | null = null
    let nextWaypoint = 0

    const tick = (time: number) => {
      if (start === null) start = time
      const progress = ((time - start) % LOOP_DURATION_MS) / LOOP_DURATION_MS
      if (progress < 0.01) nextWaypoint = 0
      const length = progress * totalLength

      if (
        nextWaypoint < waypointLengths.length &&
        length >= waypointLengths[nextWaypoint] - TRIGGER_LEAD
      ) {
        const idx = nextWaypoint
        setSpinTriggers((prev) => ({ ...prev, [idx]: (prev[idx] ?? 0) + 1 }))
        if (idx > 0 && idx < n - 1) {
          facingRight.current = !facingRight.current
        }
        nextWaypoint++
      }

      const pt = path.getPointAtLength(length)
      const ahead = path.getPointAtLength(Math.min(length + 0.5, totalLength))
      const dx = ahead.x - pt.x
      const dy = ahead.y - pt.y
      const tilt = Math.atan2(dx, dy) * (180 / Math.PI) * 0.6

      if (carRef.current) {
        carRef.current.style.left = `${pt.x}%`
        carRef.current.style.top = `${(pt.y / (n * 100)) * 100}%`
        const flip = facingRight.current ? 1 : -1
        carRef.current.style.transform = `translate(-50%, -50%) translateY(-10px) rotate(${tilt}deg) scaleX(${flip})`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD, n])

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
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={4}
              strokeLinecap="round"
              opacity={0.7}
            />
            <path
              d={pathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth={0.6}
              strokeDasharray="3 3"
              strokeLinecap="round"
              opacity={0.6}
            />
            {points.slice(1).map((p, i) => (
              <path
                key={i}
                ref={(el) => {
                  segmentRefs.current[i] = el
                }}
                d={segmentD(points[i], p)}
                fill="none"
                stroke="none"
              />
            ))}
          </svg>

          <div
            ref={carRef}
            className="absolute z-0 h-14 w-14 sm:h-20 sm:w-20"
            style={{ left: '0%', top: '0%' }}
            aria-hidden="true"
          >
            <img
              src="/assets/sonic.gif"
              alt=""
              draggable={false}
              className="h-full w-full select-none rounded-full object-cover drop-shadow-lg"
            />
          </div>

          {items.map((skill, i) => {
            const logoPath = SKILL_LOGOS[skill]
            const p = points[i]
            return (
              <div
                key={skill}
                className="absolute z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 sm:h-40 sm:w-40"
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
                      spinTrigger={spinTriggers[i]}
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
