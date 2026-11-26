# hud-ui

Headless React component library with two interchangeable skins — a dense
mission-control **HUD** skin and a neutral **plain** skin that proves the
split works.

```
packages/
  tokens/      CSS custom properties + TS constants
  core/        headless hooks + unstyled components (behaviour only)
  skin-hud/    chamfered HUD skin + decorative parts
  skin-plain/  minimal neutral CSS that targets the same selectors
apps/
  armory/      Vite playground with every component in both skins
```

See [`docs/RULES.md`](./docs/RULES.md) for the contract that keeps `core` and
the skins separated, and [`docs/ROADMAP.md`](./docs/ROADMAP.md) for what's
next.

## Quick start

```bash
pnpm install
pnpm dev        # starts the armory at http://localhost:5173
pnpm build      # builds every package + the armory
pnpm test       # Vitest (keyboard + axe, both skins)
pnpm typecheck  # tsc --noEmit across all workspaces
pnpm lint       # oxlint
```

## Using the library

```tsx
import '@hud-ui/tokens/styles.css'
import '@hud-ui/skin-hud/styles.css' // or '@hud-ui/skin-plain/styles.css'

import { Dialog, Tabs, Toggle, Meter, TextScramble, ScrollPanel } from '@hud-ui/core'
import { CornerBrackets, GlitchText } from '@hud-ui/skin-hud'

function App() {
  return (
    <div data-skin="hud" data-hud-palette="steel" data-hud-glow="on" data-hud-motion="on">
      <TextScramble text="SYSTEM ONLINE" />
      <Meter value={62} label="Signal" variant="segments" />
    </div>
  )
}
```

Switch skins by changing `data-skin` on `<html>` (or any ancestor). The core
components don't care — they only emit data attributes; the active skin's CSS
picks them up.

## Components (Phase 1)

| Component       | Behaviour backend       | A11y surface                       |
| --------------- | ----------------------- | ---------------------------------- |
| `Dialog`        | react-aria overlay      | `role="dialog"`, modal, focus trap |
| `Tabs`          | react-aria tabs         | Roving tabindex, arrows            |
| `Toggle`        | react-aria toggle btn   | `aria-pressed`                     |
| `Meter`         | native ARIA             | `role="meter"`, valuemin/now/text  |
| `TextScramble`  | custom rAF hook         | `aria-label` + reduced-motion safe |
| `ScrollPanel`   | custom hook             | `role="region"`, keyboard scroll   |

Every component has a dedicated page in the armory with a props cheatsheet
and keyboard shortcuts, rendered in the HUD skin and the plain skin side by
side.
