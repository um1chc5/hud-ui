# hud-ui

High-tech **HUD** UI kit — ownable source with its own CLI (`@hud-ui/cli`) and
Base UI (`@base-ui/react`) headless primitives. One visual system (chamfered
panels, corner brackets, mono labels, glow, grid, text scramble).

```
packages/ui/          tokens + components (copy into your app)
packages/cli/         @hud-ui/cli (init / add / list)
apps/armory/          Product site, docs, playground & /r/*.json registry
```

## Quick start

```bash
pnpm install
pnpm dev        # armory at http://localhost:5173
pnpm build
pnpm test
pnpm typecheck
pnpm lint
```

## Install into an app (`@hud-ui/cli`)

```bash
pnpm dlx @hud-ui/cli init
pnpm dlx @hud-ui/cli add dialog meter text-scramble
```

### Quick Agent Prompt (initialize into an existing project)

```text
Initialize hud-ui in this React + Tailwind v4 project using the registry at https://um1chc5.github.io/hud-ui/r:

1. Inspect package.json, tsconfig.json, and CSS entry files to detect our package manager and src/ alias paths.
2. Fetch https://um1chc5.github.io/hud-ui/r/registry.json and install hud-theme, utils, and the requested components (e.g. dialog, tabs, toggle, meter, text-scramble, scroll-panel).
3. Import hud-tokens.css and hud.css once at the app root (after Tailwind), and set data-hud-palette="steel" data-hud-glow="on" data-hud-motion="on" data-hud-grid="on" on <html>.
4. Follow the motion rules (opacity, clip-path, translate only — never transform/scale on body text), and verify typecheck, lint, and build pass.
```

Or copy files manually:

1. Ensure the app has Tailwind v4, React 19, and (for Dialog/Tabs/Toggle)
   `@base-ui/react`.
2. Copy `packages/ui/src/styles/tokens.css` and `hud.css`, then import them
   once at the app root.
3. Copy `lib/utils.ts` (`cn`) and any hooks the component needs.
4. Copy the component file(s) from `components/ui/` (and decorative parts
   from `components/hud/` if used).
5. Set appearance attrs on `<html>`:

```html
<html data-hud-palette="steel" data-hud-glow="on" data-hud-motion="on" data-hud-grid="on"></html>
```

Palettes: `steel` · `teal` · `thermal` · `day`.

Example after copy:

```tsx
import { Dialog, Meter, TextScramble } from './components/ui'

function App() {
  return (
    <>
      <TextScramble text="SYSTEM ONLINE" />
      <Meter value={62} label="Signal" variant="segments" />
    </>
  )
}
```

Or consume via the workspace package during monorepo development:

```tsx
import '@hud-ui/ui/styles/tokens.css'
import '@hud-ui/ui/styles/hud.css'
import { Dialog, Tabs, Toggle, Meter, TextScramble, ScrollPanel } from '@hud-ui/ui'
```

## Components (Phase 1)

| Component      | Behaviour      | A11y                                    |
| -------------- | -------------- | --------------------------------------- |
| `Dialog`       | Base UI Dialog | modal, focus trap, Esc, return focus    |
| `Tabs`         | Base UI Tabs   | roving tabindex, arrows                 |
| `Toggle`       | Base UI Toggle | `aria-pressed`                          |
| `Meter`        | native ARIA    | `role="meter"`                          |
| `TextScramble` | custom rAF     | final `aria-label`; reduced-motion safe |
| `ScrollPanel`  | custom         | `role="region"`, keyboard scroll        |

Decorative: `CornerBrackets`, `ChamferFrame`, `GridBg`.

## Motion rules (ported from the game HUD)

- Animate with **opacity**, **clip-path**, and the individual **`translate`**
  property — never `transform` / `translateZ` / `scale` on layers that hold
  body text.
- Every effect honours `prefers-reduced-motion` and `data-hud-motion="off"`.
- Glow on accents only. Day palette uses crisp outlines instead of blur glow.
- Body text WCAG AA (≥ 4.5:1) on panel fills in every palette.

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for what's next.
