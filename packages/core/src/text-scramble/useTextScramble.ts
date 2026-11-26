import { useEffect, useRef, useState } from 'react'
import { useHudMotionEnabled } from '../hooks/useHudMotionEnabled'

export type TextScramblePhase = 'idle' | 'running' | 'done'

export type UseTextScrambleOptions = {
  /** Total scramble duration in ms. Default 800. */
  duration?: number
  /** Override the glyph pool. */
  glyphs?: string
  /** Called when the scramble completes. */
  onDone?: () => void
}

const DEFAULT_GLYPHS = '#%&*+=<>/\\|01ABCDEFGHKLMNPRSTVXYZ'

function randomGlyph(pool: string): string {
  if (!pool.length) return ' '
  return pool.charAt(Math.floor(Math.random() * pool.length)) ?? ' '
}

/**
 * Scrambles characters toward `target` over `duration` ms via rAF.
 *
 * Returns `{ display, phase, restart }`:
 *  - `display` — the current visible text
 *  - `phase`   — `'idle' | 'running' | 'done'`
 *  - `restart` — imperatively start a fresh scramble to `target`
 *
 * Honours `prefers-reduced-motion` and `[data-hud-motion="off"]`: when motion
 * is disabled the hook jumps straight to `done` with `display === target`.
 *
 * Aborts cleanly on unmount or whenever `target` changes.
 */
export function useTextScramble(target: string, options: UseTextScrambleOptions = {}) {
  const { duration = 800, glyphs = DEFAULT_GLYPHS, onDone } = options
  const motionEnabled = useHudMotionEnabled()

  const [display, setDisplay] = useState<string>(target)
  const [phase, setPhase] = useState<TextScramblePhase>('idle')

  // Bumping this ref re-runs the scrambling effect without touching `target`.
  const [restartKey, setRestartKey] = useState(0)

  // Latest callback refs so we never capture stale closures.
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    // If motion is off, show the final text immediately.
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

  const restart = () => setRestartKey((k) => k + 1)

  return { display, phase, restart }
}
