import { useEffect, useRef, useState } from 'react'
import { useHudMotionEnabled } from '../../hooks/useHudMotionEnabled'

export type TextScramblePhase = 'idle' | 'running' | 'done'

export type UseTextScrambleOptions = {
  duration?: number
  glyphs?: string
  onDone?: () => void
}

const DEFAULT_GLYPHS = '#%&*+=<>/\\|01ABCDEFGHKLMNPRSTVXYZ'

function randomGlyph(pool: string): string {
  if (!pool.length) return ' '
  return pool.charAt(Math.floor(Math.random() * pool.length)) ?? ' '
}

/**
 * Scrambles toward `target` via rAF. Honours reduced motion + data-hud-motion.
 * Aborts on unmount or when `target` changes.
 */
export function useTextScramble(target: string, options: UseTextScrambleOptions = {}) {
  const { duration = 800, glyphs = DEFAULT_GLYPHS, onDone } = options
  const motionEnabled = useHudMotionEnabled()
  const [display, setDisplay] = useState<string>(target)
  const [phase, setPhase] = useState<TextScramblePhase>('idle')
  const [restartKey, setRestartKey] = useState(0)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (!motionEnabled) {
      setDisplay(target)
      setPhase('done')
      onDoneRef.current?.()
      return
    }

    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      setDisplay(target)
      setPhase('done')
      onDoneRef.current?.()
      return
    }

    let rafId = 0
    let startTs = 0
    let cancelled = false
    const chars = Array.from(target)
    const total = Math.max(1, chars.length)

    setPhase('running')
    setDisplay(chars.map((ch) => (ch === ' ' ? ' ' : randomGlyph(glyphs))).join(''))

    const step = (ts: number) => {
      if (cancelled) return
      if (!startTs) startTs = ts
      const progress = Math.min(1, (ts - startTs) / Math.max(1, duration))
      const settledUpTo = progress * total
      const next = chars
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < settledUpTo) return ch
          return randomGlyph(glyphs)
        })
        .join('')
      setDisplay(next)

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step)
      } else {
        setDisplay(target)
        setPhase('done')
        onDoneRef.current?.()
      }
    }

    rafId = window.requestAnimationFrame(step)
    return () => {
      cancelled = true
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [target, duration, glyphs, motionEnabled, restartKey])

  return { display, phase, restart: () => setRestartKey((k) => k + 1) }
}
