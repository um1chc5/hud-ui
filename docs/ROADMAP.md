# hud-ui — Roadmap

## Phase 1 — shipped (this cut)

- Tokens: steel / teal / thermal / day palettes, surfaces, type, motion,
  chamfer, spacing. Exported as a CSS file plus TS constants.
- Core components (headless):
  - `Dialog` (react-aria overlay, portal, focus trap, scroll lock, Esc).
  - `Tabs` (react-aria tabs — roving tabindex, arrow keys).
  - `Toggle` (react-aria toggle button).
  - `Meter` (ARIA meter — `bar`, `ring`, `segments` variants).
  - `TextScramble` + `useTextScramble` (rAF, motion-safe, abortable).
  - `ScrollPanel` (headless scrollable region with keyboard + metrics).
- Core hooks: `usePrefersReducedMotion`, `useHudMotionEnabled`.
- Skins:
  - `@hud-ui/skin-hud` — chamfered panels, corner brackets, accent glow,
    segmented meter, custom scrollbar, boot animation.
  - `@hud-ui/skin-plain` — neutral baseline that proves the headless split.
- Armory app: live demos, props notes, keyboard cheatsheet, both skins
  rendered side by side, global palette/glow/motion/skin switcher persisted
  to `localStorage`.
- Tests: keyboard + `axe` for every component in both skins; TextScramble
  reduced-motion, unmount-abort, text-change-abort.

## Phase 2 — next

- `RadioGroup` (react-aria `useRadioGroup`) with HUD segmented look.
- `Countdown` headless timer component — `data-phase="warning|critical"` at
  configurable thresholds, aria-live polite.
- `LiveLog` scrolling log region with sticky-bottom toggle and
  `aria-live="polite"`, powered by `ScrollPanel`.
- `Toast` / `Alert` queue — react-aria `useToastRegion` + headless API.
- `CommandPalette` headless + HUD skin.
- `FocusDim` (dim the rest of the UI around a focus target).
- `TiltStage` (pointer-driven parallax wrapper — hud only, aria-hidden).
- `Radar` SVG component — decorative, `role="img"` with `aria-label`.

## Phase 3 — later

- SSR hardening (ids from `useId`, no `document` at import).
- A `@hud-ui/themes` package where consumers can register additional
  palettes without forking the HUD skin.
- Visual regression suite in the armory (Playwright + per-skin snapshots).
- Publish to npm — pick between a single meta-package and the current split.
