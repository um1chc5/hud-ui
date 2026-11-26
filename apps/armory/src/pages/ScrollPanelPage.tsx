import { ScrollPanel } from '@hud-ui/core'
import { SplitPreview } from '../SplitPreview'

export function ScrollPanelPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>ScrollPanel</h1>
        <p>
          A headless scrollable region. Exposes <code>data-scrollable</code>,{' '}
          <code>data-at-top</code>, <code>data-at-bottom</code>, and <code>data-scroll-pct</code> so
          skins can draw edge fades and scrollbar chrome. Behaviour ported from the reference{' '}
          <code>HudScrollPanel</code>.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <SplitPreview render={() => <ScrollDemo />} />
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>label</dt>
          <dd>Accessible region label. Required.</dd>
          <dt>kicker</dt>
          <dd>Short header rendered at the top-left of the panel bar.</dd>
          <dt>bar</dt>
          <dd>Full override of the bar content.</dd>
          <dt>resetKey</dt>
          <dd>Changing this value resets scroll position to 0.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard (when the body is focused)</h2>
        <dl className="armory-props">
          <dt>ArrowUp / ArrowDown</dt>
          <dd>Scroll ~56px.</dd>
          <dt>PageUp / PageDown · Space · Shift+Space</dt>
          <dd>Scroll by one viewport.</dd>
          <dt>Home / End</dt>
          <dd>Jump to start / end.</dd>
        </dl>
      </section>
    </>
  )
}

function ScrollDemo() {
  return (
    <ScrollPanel label="Log feed" kicker="LOG" style={{ height: 240 }}>
      <ul style={{ margin: 0, padding: '0 0 0 18px', lineHeight: 1.6 }}>
        {Array.from({ length: 40 }, (_, i) => (
          <li key={i}>
            Entry {String(i + 1).padStart(3, '0')} — sensor sweep nominal, no anomalies.
          </li>
        ))}
      </ul>
    </ScrollPanel>
  )
}
