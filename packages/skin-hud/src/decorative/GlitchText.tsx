import { TextScramble, type TextScrambleProps } from '@hud-ui/core'

/**
 * `GlitchText` is a theme-wrapped alias around `TextScramble`. It exists in
 * `@hud-ui/skin-hud` only — the core library stays visual-neutral.
 *
 * It behaves identically to `TextScramble`; the HUD skin's CSS already gives
 * `data-hud-text-scramble` a mono glyph and accent colour while scrambling.
 */
export function GlitchText(props: TextScrambleProps) {
  return <TextScramble {...props} />
}

export type GlitchTextProps = TextScrambleProps
