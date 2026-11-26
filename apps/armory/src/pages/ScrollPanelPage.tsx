import { ScrollPanel } from '@hud-ui/ui'

export function ScrollPanelPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>ScrollPanel</h1>
        <p>
          Keyboard-scrollable region with HUD scrollbar, fade edges, and corner brackets. Focus the
          body, then use arrows / Page / Home / End.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <div className="armory-demo">
          <ScrollPanel
            label="Mission log"
            kicker="LOG"
            style={{ height: 240 }}
            bodyStyle={{ height: 200 }}
          >
            {Array.from({ length: 24 }, (_, i) => (
              <p key={i} style={{ margin: '0 0 8px' }}>
                [{String(i + 1).padStart(2, '0')}] Telemetry packet received — sector{' '}
                {((i * 7) % 9) + 1}.
              </p>
            ))}
          </ScrollPanel>
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>label</dt>
          <dd>Required accessible region name.</dd>
          <dt>kicker / bar</dt>
          <dd>Top mono bar content.</dd>
          <dt>resetKey</dt>
          <dd>Changing this resets scroll to 0.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>↑ ↓</dt>
          <dd>~56px steps.</dd>
          <dt>PageUp / PageDown / Space</dt>
          <dd>Viewport pages (Shift+Space up).</dd>
          <dt>Home / End</dt>
          <dd>Jump to start / end.</dd>
        </dl>
      </section>
    </>
  )
}
