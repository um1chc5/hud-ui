import { useState } from 'react'
import { TextScramble, Toggle } from '@hud-ui/core'
import { SplitPreview } from '../SplitPreview'

const SAMPLES = ['SYSTEM ONLINE', 'TARGET LOCKED', 'STANDBY', 'DOSSIER / 0042']

export function TextScramblePage() {
  const [index, setIndex] = useState(0)
  const text = SAMPLES[index] ?? SAMPLES[0]!

  return (
    <>
      <header className="armory-page-header">
        <h1>TextScramble</h1>
        <p>
          rAF-driven character scramble. The accessible name (<code>aria-label</code>) always
          holds the final text, so screen readers never hear random glyphs. Reduced motion or{' '}
          <code>data-hud-motion="off"</code> snaps straight to the final string.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <SplitPreview render={() => <ScrambleDemo text={text} />} />
        <div style={{ marginTop: 12 }}>
          <Toggle onChange={() => setIndex((i) => (i + 1) % SAMPLES.length)}>
            Next phrase
          </Toggle>
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>text</dt>
          <dd>Final text. Changing this value starts a new scramble toward the new target.</dd>
          <dt>duration</dt>
          <dd>Total scramble time in ms. Default <code>800</code>.</dd>
          <dt>glyphs</dt>
          <dd>Custom glyph pool.</dd>
          <dt>onDone</dt>
          <dd>Called when the scramble resolves (fires immediately under reduced motion).</dd>
        </dl>
      </section>
    </>
  )
}

function ScrambleDemo({ text }: { text: string }) {
  return (
    <div style={{ fontSize: 28, letterSpacing: '0.12em' }}>
      <TextScramble text={text} as="div" />
    </div>
  )
}
