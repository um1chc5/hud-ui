# hud-ui

Private high-tech **HUD** UI kit — ownable source, shadcn-style. One visual
system (chamfered panels, corner brackets, mono labels, glow, grid, text
scramble). Not a multi-package headless library.

```
packages/ui/          tokens + components (copy into your app)
apps/armory/          Vite playground
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

## Copy a component into another app

1. Ensure the app has Tailwind v4, React 19, and (for Dialog/Tabs/Toggle)
   `react-aria` + `react-stately`.
2. Copy `packages/ui/src/styles/tokens.css` and `hud.css`, then import them
   once at the app root.
3. Copy `lib/utils.ts` (`cn`) and any hooks the component needs.
4. Copy the component file(s) from `components/ui/` (and decorative parts
   from `components/hud/` if used).
5. Set appearance attrs on `<html>`:

```html
<html
  data-hud-palette="steel"
  data-hud-glow="on"
  data-hud-motion="on"
  data-hud-grid="on"
></html>
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

| Component      | Behaviour              | A11y                                      |
| -------------- | ---------------------- | ----------------------------------------- |
| `Dialog`       | react-aria overlay     | modal, focus trap, Esc, return focus      |
| `Tabs`         | react-aria tabs        | roving tabindex, arrows                   |
| `Toggle`       | react-aria toggle btn  | `aria-pressed`                            |
| `Meter`        | native ARIA            | `role="meter"`                            |
| `TextScramble` | custom rAF             | final `aria-label`; reduced-motion safe   |
| `ScrollPanel`  | custom                 | `role="region"`, keyboard scroll          |

Decorative: `CornerBrackets`, `ChamferFrame`, `GridBg`.

## Motion rules (ported from the game HUD)

- Animate with **opacity**, **clip-path**, and the individual **`translate`**
  property — never `transform` / `translateZ` / `scale` on layers that hold
  body text.
- Every effect honours `prefers-reduced-motion` and `data-hud-motion="off"`.
- Glow on accents only. Day palette uses crisp outlines instead of blur glow.
- Body text WCAG AA (≥ 4.5:1) on panel fills in every palette.

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for what's next.
