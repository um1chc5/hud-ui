import { useState } from 'react'
import { Toggle } from '@hud-ui/core'
import { SplitPreview } from '../SplitPreview'

export function TogglePage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>Toggle</h1>
        <p>
          ARIA toggle button via react-aria. Flips <code>aria-pressed</code> and
          <code>data-pressed</code>. The HUD skin fills the button with the accent colour and, when{' '}
          <code>data-hud-glow="on"</code>, adds an accent glow.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <SplitPreview render={() => <ToggleDemo />} />
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>isSelected · onChange · defaultSelected</dt>
          <dd>Controlled or uncontrolled pressed state.</dd>
          <dt>isDisabled</dt>
          <dd>Disables the button.</dd>
          <dt>aria-label / aria-labelledby</dt>
          <dd>Required when the children are purely iconographic.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>Space / Enter</dt>
          <dd>Flip the pressed state.</dd>
        </dl>
      </section>
    </>
  )
}

function ToggleDemo() {
  const [scanner, setScanner] = useState(true)
  const [recorder, setRecorder] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Toggle isSelected={scanner} onChange={setScanner}>
        Scanner
      </Toggle>
      <Toggle isSelected={recorder} onChange={setRecorder}>
        Recorder
      </Toggle>
      <Toggle defaultSelected isDisabled>
        Beacon (disabled)
      </Toggle>
    </div>
  )
}
