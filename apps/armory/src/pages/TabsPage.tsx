import { Item, SegmentedControl, Tabs } from '@hud-ui/ui'

export function TabsPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>Tabs</h1>
        <p>
          ARIA tabs via react-aria — roving tabindex, arrow keys, Home/End. Alias{' '}
          <code>SegmentedControl</code> for the same component.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <div className="armory-demo">
          <Tabs aria-label="Status" defaultSelectedKey="signal">
            <Item key="signal" title="Signal">
              Uplink stable. Latency 42ms.
            </Item>
            <Item key="power" title="Power">
              Cap banks at 78%. Thermal nominal.
            </Item>
            <Item key="comms" title="Comms">
              Encrypted channel open.
            </Item>
          </Tabs>
          <SegmentedControl aria-label="View mode" defaultSelectedKey="grid">
            <Item key="grid" title="Grid">
              Grid layout active.
            </Item>
            <Item key="list" title="List">
              List layout active.
            </Item>
          </SegmentedControl>
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>children</dt>
          <dd>
            <code>&lt;Item key title&gt;panel&lt;/Item&gt;</code>
          </dd>
          <dt>selectedKey / defaultSelectedKey</dt>
          <dd>Controlled or uncontrolled selection.</dd>
          <dt>orientation</dt>
          <dd>
            <code>horizontal</code> (default) or <code>vertical</code>.
          </dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>← → / ↑ ↓</dt>
          <dd>Move selection (respects orientation).</dd>
          <dt>Home / End</dt>
          <dd>First / last tab.</dd>
        </dl>
      </section>
    </>
  )
}
