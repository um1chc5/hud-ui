import { forwardRef, type CSSProperties } from 'react'
import { useTextScramble, type UseTextScrambleOptions } from './useTextScramble'

export type TextScrambleProps = UseTextScrambleOptions & {
  /** The final (and accessible) text. */
  text: string
  /** Rendered element. Defaults to `"span"`. */
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  style?: CSSProperties
  id?: string
  /** Override accessible label. Defaults to `text`. */
  'aria-label'?: string
}

/**
 * Headless TextScramble.
 *
 * Visible text scrambles toward `text` while `aria-label` always holds the
 * final string, so screen readers never hear the random glyphs.
 *
 * Data attributes (skins target these):
 *   - `[data-hud-text-scramble]`
 *   - `[data-phase="idle"|"running"|"done"]`
 */
export const TextScramble = forwardRef<HTMLElement, TextScrambleProps>(function TextScramble(
  { text, as: Tag = 'span', style, id, 'aria-label': ariaLabel, duration, glyphs, onDone },
  ref,
) {
  const options: UseTextScrambleOptions = {}
  if (duration !== undefined) options.duration = duration
  if (glyphs !== undefined) options.glyphs = glyphs
  if (onDone !== undefined) options.onDone = onDone
  const { display, phase } = useTextScramble(text, options)
  // Bare <span>/<div> may not carry aria-label (axe aria-prohibited-attr).
  // role="group" is a valid host for the accessible name while the visible
  // glyphs stay aria-hidden so AT never hears the scramble.
  const needsRole = Tag === 'span' || Tag === 'div'
  return (
    <Tag
      // forwardRef with a dynamic tag loses the inferred type; cast at the boundary.
      ref={ref as never}
      id={id}
      role={needsRole ? 'group' : undefined}
      aria-label={ariaLabel ?? text}
      data-hud-text-scramble=""
      data-phase={phase}
      style={style}
    >
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
})
