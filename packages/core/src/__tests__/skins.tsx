import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { type ReactElement, type ReactNode } from 'react'

export type SkinName = 'hud' | 'plain'

/**
 * Wrap a UI tree in a `data-skin` container so tests exercise each skin's
 * selectors. Each skin also gets a palette/motion default so component data
 * attributes make sense.
 */
export function withSkin(skin: SkinName, children: ReactNode): ReactElement {
  return (
    <div
      data-skin={skin}
      data-hud-palette={skin === 'hud' ? 'steel' : undefined}
      data-hud-glow={skin === 'hud' ? 'on' : undefined}
      data-hud-motion="on"
    >
      {children}
    </div>
  )
}

export function renderInSkin(skin: SkinName, ui: ReactNode, options?: RenderOptions): RenderResult {
  return render(withSkin(skin, ui), options)
}

export const SKINS: readonly SkinName[] = ['hud', 'plain']
