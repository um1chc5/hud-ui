import type { ReactNode } from 'react'

export type SplitPreviewProps = {
  /** Called twice: once per skin. Receives the active skin so demos can tweak copy. */
  render: (skin: 'hud' | 'plain') => ReactNode
}

/**
 * Renders the same demo twice side by side, each half wrapped in its own
 * `data-skin` container so the two skins coexist on one page.
 *
 * The hud half inherits the active global `data-hud-palette` / glow / motion
 * attributes from `<html>`, so palette changes instantly show up in the demo.
 */
export function SplitPreview({ render }: SplitPreviewProps) {
  return (
    <div className="armory-split">
      <div className="armory-split-side" data-skin="hud">
        <span className="armory-split-label">data-skin="hud"</span>
        {render('hud')}
      </div>
      <div className="armory-split-side" data-skin="plain">
        <span className="armory-split-label">data-skin="plain"</span>
        {render('plain')}
      </div>
    </div>
  )
}
