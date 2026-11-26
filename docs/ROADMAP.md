# hud-ui — Roadmap

## Phase 1 — this cut

- Tokens: steel / teal / thermal / day on `:root` (no dual skin).
- Ownable `@hud-ui/ui` source: Dialog, Tabs / SegmentedControl, Toggle, Meter,
  TextScramble, ScrollPanel + decorative CornerBrackets / ChamferFrame / GridBg.
- Tailwind v4 + CSS variables; `cn()` for class merging.
- Armory playground: palette / glow / motion / grid toggles (localStorage),
  boot home, one page per component, keyboard cheatsheets.
- Tests: keyboard + axe; TextScramble reduced-motion / abort.

## Phase 2 — next

- `RadioGroup` with HUD segmented look.
- `Countdown` with `data-phase="warning|critical"`, aria-live polite.
- `LiveLog` sticky-bottom log on ScrollPanel.
- `Toast` / `Alert` queue.
- `CommandPalette`.
- `FocusDim`, `TiltStage` (decorative), `Radar` SVG.

## Phase 3 — later

- SSR hardening.
- Visual regression in the armory (Playwright).
- Optional registry CLI for copy-into-app (true shadcn DX).
- Game / portfolio drop-in recipes (still no npm publish required).
