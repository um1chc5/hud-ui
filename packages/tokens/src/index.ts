/**
 * @hud-ui/tokens
 *
 * TS-side mirror of the CSS custom properties defined in `tokens.css`.
 * Consumers import the CSS once at the app root:
 *
 *   import '@hud-ui/tokens/styles.css'
 *
 * …and then use these constants when they need the token names at runtime
 * (e.g. the armory palette switcher, or a theme serialiser).
 */

export const HUD_PALETTES = ['steel', 'teal', 'thermal', 'day'] as const
export type HudPalette = (typeof HUD_PALETTES)[number]

export const HUD_SKINS = ['hud', 'plain'] as const
export type HudSkin = (typeof HUD_SKINS)[number]

export const HUD_ON_OFF = ['on', 'off'] as const
export type HudOnOff = (typeof HUD_ON_OFF)[number]

/** Motion durations in milliseconds, matching `--hud-duration-*` tokens. */
export const HUD_DURATIONS = {
  fast: 160,
  base: 280,
  slow: 480,
} as const
export type HudDurationKey = keyof typeof HUD_DURATIONS

/** Chamfer sizes in pixels, matching `--hud-chamfer*` tokens. */
export const HUD_CHAMFERS = {
  sm: 6,
  base: 10,
  lg: 14,
} as const
export type HudChamferKey = keyof typeof HUD_CHAMFERS

/** Spacing scale in pixels, matching `--hud-space-*` tokens. */
export const HUD_SPACING = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
} as const

/** Standard HUD easing curve, matches `--hud-ease`. */
export const HUD_EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)' as const

/**
 * Names of the CSS custom properties shipped by this package. Exposed as a
 * record so skin/theme code can introspect without duplicating strings.
 */
export const HUD_CSS_VARS = {
  paper: '--paper',
  sheet: '--sheet',
  sheetSolid: '--sheet-solid',
  soft: '--soft',
  line: '--line',
  ink: '--ink',
  muted: '--muted',
  accent: '--accent',
  accentD: '--accent-d',
  onAccent: '--on-accent',
  ok: '--ok',
  okD: '--ok-d',
  bad: '--bad',
  badD: '--bad-d',
  mark: '--mark',
  markD: '--mark-d',
  glowColor: '--glow-color',
  gridColor: '--grid-color',
  fontDisplay: '--hud-font-display',
  fontBody: '--hud-font-body',
  fontMono: '--hud-font-mono',
  chamfer: '--hud-chamfer',
  durationFast: '--hud-duration-fast',
  duration: '--hud-duration',
  durationSlow: '--hud-duration-slow',
  ease: '--hud-ease',
} as const
export type HudCssVar = (typeof HUD_CSS_VARS)[keyof typeof HUD_CSS_VARS]
