import { forwardRef, type CSSProperties } from 'react'
import { cn } from '../../lib/utils'
import { useTextScramble, type UseTextScrambleOptions } from './useTextScramble'

export type TextScrambleProps = UseTextScrambleOptions & {
  text: string
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  className?: string
  style?: CSSProperties
  id?: string
  'aria-label'?: string
}

/**
 * Visible glyphs scramble; `aria-label` always holds the final string.
 * Reduced motion → instant final text.
 */
export const TextScramble = forwardRef<HTMLElement, TextScrambleProps>(function TextScramble(
  {
    text,
    as: Tag = 'span',
    className,
    style,
    id,
    'aria-label': ariaLabel,
    duration,
    glyphs,
    onDone,
  },
  ref,
) {
  const options: UseTextScrambleOptions = {}
  if (duration !== undefined) options.duration = duration
  if (glyphs !== undefined) options.glyphs = glyphs
  if (onDone !== undefined) options.onDone = onDone
  const { display, phase } = useTextScramble(text, options)
  const needsRole = Tag === 'span' || Tag === 'div'

  return (
    <Tag
      ref={ref as never}
      id={id}
      role={needsRole ? 'group' : undefined}
      aria-label={ariaLabel ?? text}
      data-hud-text-scramble=""
      data-phase={phase}
      className={cn(
        'whitespace-pre font-[family-name:var(--hud-font-mono)] tracking-[0.12em]',
        'text-[var(--ink)] [font-variant-numeric:tabular-nums]',
        className,
      )}
      style={style}
    >
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
})
