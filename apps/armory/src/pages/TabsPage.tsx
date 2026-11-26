import { Item, Tabs } from '@hud-ui/core'
import { SplitPreview } from '../SplitPreview'

export function TabsPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>Tabs</h1>
        <p>
          ARIA Tabs pattern via react-aria / react-stately. Roving tabindex, arrow-key
          navigation (horizontal or vertical), and Home / End jumps. Alias:{' '}
          <code>SegmentedControl</code>.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <SplitPreview render={() => <TabsDemo />} />
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>children</dt>
          <dd>
            One or more <code>&lt;Item key title&gt;</code> children. The <code>title</code> renders in
            the tab; the children render in the panel.
          </dd>
          <dt>defaultSelectedKey · selectedKey · onSelectionChange</dt>
          <dd>Controlled or uncontrolled selection.</dd>
          <dt>orientation</dt>
          <dd><code>"horizontal"</code> (default) or <code>"vertical"</code>.</dd>
          <dt>disabledKeys</dt>
          <dd>Iterable of keys that cannot be selected.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>ArrowLeft / ArrowRight (horizontal) or ArrowUp / ArrowDown (vertical)</dt>
          <dd>Move between tabs; activates on focus.</dd>
          <dt>Home / End</dt>
          <dd>Jump to first / last tab.</dd>
          <dt>Tab</dt>
          <dd>Leaves the tablist and moves into the panel.</dd>
        </dl>
      </section>
    </>
  )
}

function TabsDemo() {
  return (
    <Tabs aria-label="Status" defaultSelectedKey="signal">
      <Item key="signal" title="Signal">
        Signal integrity at 94%. Carrier wave stable across 3 relay nodes.
      </Item>
      <Item key="power" title="Power">
        Reactor at 72% output. Backup cells nominal.
      </Item>
      <Item key="comms" title="Comms">
        Voice uplink open. Burst packet queue empty.
      </Item>
    </Tabs>
  )
}
