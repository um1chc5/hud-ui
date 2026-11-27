import { Item, SegmentedControl, Tabs } from '@hud-ui/ui'
import tabsSource from '../../../../packages/ui/src/components/ui/Tabs.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { Item, SegmentedControl, Tabs } from '@/components/ui/Tabs'

export function TelemetryTabs() {
  return (
    <Tabs aria-label="Status" defaultSelectedKey="signal">
      <Item key="signal" title="Signal">
        Uplink stable. Latency 42ms.
      </Item>
      <Item key="power" title="Power">
        Cap banks at 78%. Thermal nominal.
      </Item>
    </Tabs>
  )
}`

export function TabsPage() {
  return (
    <ComponentDocShell
      title="Tabs"
      slug="tabs"
      category="UI Primitive"
      description="ARIA tabs via react-aria with roving tabindex, arrow-key navigation, and Home/End support. Also exports SegmentedControl and Tab aliases."
      dependencies={['react-aria', 'react-stately']}
      demo={
        <div className="flex flex-col gap-6">
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
      }
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/ui/Tabs.tsx', code: tabsSource }]}
      propsList={[
        {
          name: 'children',
          type: 'ReactElement | ReactElement[]',
          description: '<Item key="..." title="...">panel</Item> entries.',
        },
        {
          name: 'selectedKey',
          type: 'string | number',
          description: 'Controlled active tab key.',
        },
        {
          name: 'defaultSelectedKey',
          type: 'string | number',
          description: 'Initial active tab key for uncontrolled usage.',
        },
        {
          name: 'onSelectionChange',
          type: '(key: TabKey) => void',
          description: 'Called whenever the selected tab changes.',
        },
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          defaultValue: "'horizontal'",
          description: 'Layout and arrow-key direction.',
        },
      ]}
      keyboardList={[
        { keys: '← → / ↑ ↓', description: 'Moves tab selection (respects orientation).' },
        { keys: 'Home / End', description: 'Jumps to the first or last tab.' },
      ]}
    />
  )
}
