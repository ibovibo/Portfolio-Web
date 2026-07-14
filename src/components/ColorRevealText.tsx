import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useMemo } from 'react'

const PALETTE = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
const STOPS_PER_SIDE = 20
const WHITE_ZONE = 0.42

function buildColorTimeline(seed: number) {
  const preInput = Array.from({ length: STOPS_PER_SIDE }, (_, i) => (i / (STOPS_PER_SIDE - 1)) * WHITE_ZONE)
  const preOutput = preInput.map((_, i) => PALETTE[(seed + i) % PALETTE.length])

  const postInput = Array.from(
    { length: STOPS_PER_SIDE },
    (_, i) => 1 - WHITE_ZONE + (i / (STOPS_PER_SIDE - 1)) * WHITE_ZONE,
  )
  const postOutput = postInput.map((_, i) => PALETTE[(seed + STOPS_PER_SIDE + i) % PALETTE.length])

  return {
    input: [...preInput, 0.48, 0.52, ...postInput],
    output: [...preOutput, '#000000', '#000000', ...postOutput],
  }
}

function Word({ word, progress, seed }: { word: string; progress: MotionValue<number>; seed: number }) {
  const { input, output } = useMemo(() => buildColorTimeline(seed), [seed])
  const color = useTransform(progress, input, output)

  return <motion.span style={{ color }}>{word}</motion.span>
}

interface ColorRevealTextProps {
  text: string
  progress?: MotionValue<number>
  className?: string
}

export default function ColorRevealText({ text, progress, className }: ColorRevealTextProps) {
  const words = useMemo(() => text.split(' '), [text])
  const seeds = useMemo(() => {
    const result: number[] = []
    for (let i = 0; i < words.length; i++) {
      let next = Math.floor(Math.random() * PALETTE.length)
      while (i > 0 && next === result[i - 1]) {
        next = Math.floor(Math.random() * PALETTE.length)
      }
      result.push(next)
    }
    return result
  }, [words])

  if (!progress) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <Word word={word} progress={progress} seed={seeds[i]} />
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
