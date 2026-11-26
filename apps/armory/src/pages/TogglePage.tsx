import { useState } from 'react'
import { Toggle } from '@hud-ui/ui'

export function TogglePage() {
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)

  return (
    <>
      <header className="armory-page-header">
        <h1>Toggle</h1>
        <p>
          ARIA toggle button (<code>aria-pressed</code>). Space / Enter flip. Chamfered HUD chip
          with accent fill when pressed.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <div className="armory-demo" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Toggle isSelected={a} onChange={setA}>
            Scanner
          </Toggle>
          <Toggle isSelected={b} onChange={setB}>
            Night vision
          </Toggle>
          <Toggle isDisabled>Offline</Toggle>
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>isSelected / defaultSelected</dt>
          <dd>Controlled or uncontrolled pressed state.</dd>
          <dt>onChange</dt>
          <dd>
            <code>(isSelected: boolean) =&gt; void</code>
          </dd>
          <dt>isDisabled</dt>
          <dd>Blocks interaction.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>Space / Enter</dt>
          <dd>Toggle pressed state.</dd>
        </dl>
      </section>
    </>
  )
}
