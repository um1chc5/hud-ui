# hud-ui — The Contract

This library is a **headless** React component system with two swappable skins
(`hud` and `plain`). The contract below is the only thing that prevents the two
sides from drifting apart. Every rule here is enforced by code review.

## 1. `@hud-ui/core` — behaviour only

- Core components **never import CSS**.
- Core components **never set colours, sizes, radii, fonts, shadows, or
  animations** inline or through CSS-in-JS. Allowed inline styles:
  - a user-passed `style` prop (forwarded as-is); and
  - CSS custom properties that expose numeric state to skins
    (e.g. `--hud-meter-pct`), never literal colours or font values.
- Core components **never invent `className` values**. They may accept a `style`
  / `id` / `ref` prop and forward it, but they will not emit
  `className="hud-..."`.
- State is exposed **exclusively** through:
  - `data-*` attributes on the DOM nodes we render; and
  - ARIA attributes (`aria-expanded`, `aria-pressed`, `aria-selected`,
    `role="meter"`, …).
- Behaviour is backed by **standard hooks** (react-aria / react-stately) for
  anything that already has a solved a11y problem (dialog, tabs, toggle
  button). HUD-specific behaviour (scramble, scroll-panel metrics, motion
  gating) lives in `@hud-ui/core/hooks`.

## 2. Skins — looks only

Skins are **CSS files plus decorative React components**. They never touch
behaviour.

- Skin selectors are rooted at `[data-skin="hud"]` / `[data-skin="plain"]`.
- Palette, glow, grid and motion toggles are driven from the document root via
  `[data-hud-palette]`, `[data-hud-glow]`, `[data-hud-grid]`,
  `[data-hud-motion]`. Skins target these attributes directly.
- Skins style the core components by targeting the data attributes core emits:
  `[data-hud-dialog]`, `[data-hud-tabs]`, `[data-hud-tab]`,
  `[data-hud-toggle]`, `[data-hud-meter]`, `[data-hud-scroll-panel]`,
  `[data-hud-text-scramble]`. **Never** by class name on the core component.
- Decorative elements (corner brackets, chamfer helpers, scanline overlays) are
  slot-only React components exported from the skin. They are always rendered
  with `aria-hidden="true"` and `tabindex="-1"`.
- Pure visuals with no behaviour (e.g. `CornerBrackets`, `Chamfer`,
  `GlitchText` as a theme-wrapped variant of `TextScramble`) live in
  `@hud-ui/skin-hud` only — `@hud-ui/core` doesn't know they exist.

## 3. Motion & reduced motion

- The library respects `prefers-reduced-motion: reduce` **and** a user-level
  opt-out via `[data-hud-motion="off"]` on the document root.
- If either flag is on, animations collapse to instant state changes, and
  `TextScramble` renders its final text immediately with no scheduling.
- Core components expose `usePrefersReducedMotion()` and
  `useHudMotionEnabled()` so skins and apps stay consistent.

## 4. Animation discipline (hud skin)

The HUD skin learned these the hard way — they are not negotiable:

1. Never apply `transform: translateZ(...)` or `transform: scale(...)` to a
   layer that contains body text — subpixel anti-aliasing breaks.
2. Prefer animating **opacity**, **`clip-path`**, and the **individual
   `translate` property** (not the `transform` shorthand) on decorative
   layers.
3. Glow (`text-shadow` / `box-shadow`) is reserved for accent fills, meters,
   and iconography — **never** body text.
4. Body text must meet WCAG AA contrast on `--sheet` in every palette. Day
   palette has its own glow overrides that remove blurred shadows entirely.

## 5. Data-attribute catalogue

| Root attribute     | Values                                  | Meaning                     |
| ------------------ | --------------------------------------- | --------------------------- |
| `data-skin`        | `hud` \| `plain`                        | Which skin is active        |
| `data-hud-palette` | `steel` \| `teal` \| `thermal` \| `day` | Palette within the HUD skin |
| `data-hud-glow`    | `on` \| `off`                           | Accent/meter glow           |
| `data-hud-grid`    | `on` \| `off`                           | Background graph grid       |
| `data-hud-motion`  | `on` \| `off`                           | Motion opt-out              |

| Component attribute       | Component      | Meaning                                      |
| ------------------------- | -------------- | -------------------------------------------- |
| `data-hud-dialog`         | Dialog panel   | Marker the skin targets                      |
| `data-hud-dialog-overlay` | Dialog scrim   | Marker the skin targets                      |
| `data-state`              | Dialog, Toggle | `open` / `closed` or `pressed` / `unpressed` |
| `data-hud-tabs`           | TabList root   | Marker the skin targets                      |
| `data-hud-tab`            | Tab button     | Marker the skin targets                      |
| `data-selected`           | Tab button     | `true` / `false`                             |
| `data-orientation`        | TabList        | `horizontal` / `vertical`                    |
| `data-hud-toggle`         | Toggle button  | Marker the skin targets                      |
| `data-pressed`            | Toggle         | `true` / `false`                             |
| `data-hud-meter`          | Meter root     | Marker the skin targets                      |
| `data-variant`            | Meter          | `bar` / `ring` / `segments`                  |
| `data-value`              | Meter          | Normalised 0–100 (rounded)                   |
| `data-on`                 | Meter segment  | `true` / `false` per segment                 |
| `data-hud-text-scramble`  | TextScramble   | Marker the skin targets                      |
| `data-phase`              | TextScramble   | `idle` / `running` / `done`                  |
| `data-hud-scroll-panel`   | ScrollPanel    | Marker the skin targets                      |
| `data-scrollable`         | ScrollPanel    | `true` / `false`                             |
| `data-at-top`             | ScrollPanel    | `true` / `false`                             |
| `data-at-bottom`          | ScrollPanel    | `true` / `false`                             |
| `data-scroll-pct`         | ScrollPanel    | `0..100` integer                             |

## 6. Testing contract

Every component ships with a Vitest file that:

1. Renders the component under both `data-skin="hud"` and `data-skin="plain"`.
2. Exercises every documented keyboard interaction.
3. Runs `axe()` on the rendered tree and asserts no violations — in both skins.
4. TextScramble also covers: reduced motion → final text immediately; unmount
   mid-animation → no state-update warning; `text` prop change → clean abort.

## 7. Packaging

- Peer deps: `react ^19`, `react-dom ^19`.
- Library builds with `tsup`: ESM + `.d.ts`. React is external.
- `@hud-ui/core`: `"sideEffects": false`.
- `@hud-ui/tokens`, `@hud-ui/skin-hud`, `@hud-ui/skin-plain`:
  `"sideEffects": ["*.css"]`, and each exports both `.` (the TS entry) and
  `./styles.css`.
