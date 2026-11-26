import { useState } from 'react'
import { TextScramble, Toggle } from '@hud-ui/ui'

export function TextScramblePage() {
  const [key, setKey] = useState(0)
  const [text, setText] = useState('SYSTEM ONLINE')

  return (
    <>
      <header className="armory-page-header">
        <h1>TextScramble</h1>
        <p>
          Glyph scramble toward final text. <code>aria-label</code> always holds the settled
          string. Reduced motion / motion-off → instant final. Aborts on unmount or text change.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <div className="armory-demo">
          <TextScramble key={key} text={text} duration={900} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Toggle
              isSelected={false}
              onChange={() => {
                setText('SYSTEM ONLINE')
                setKey((k) => k + 1)
              }}
            >
              Replay boot
            </Toggle>
            <Toggle
              isSelected={false}
              onChange={() => {
                setText('CHANNEL LOCKED')
                setKey((k) => k + 1)
              }}
            >
              Swap text
            </Toggle>
          </div>
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>text</dt>
          <dd>Final (and accessible) string.</dd>
          <dt>duration</dt>
          <dd>Scramble length in ms. Default 800.</dd>
          <dt>as</dt>
          <dd>
            Element tag. Default <code>span</code>.
          </dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>—</dt>
          <dd>Decorative; screen readers hear the final label only.</dd>
        </dl>
      </section>
    </>
  )
}
