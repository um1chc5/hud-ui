import { ScrollPanel } from '@hud-ui/ui'
import scrollPanelSource from '../../../../packages/ui/src/components/ui/ScrollPanel.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { ScrollPanel } from '@/components/ui/ScrollPanel'

export function TelemetryFeed() {
  return (
    <ScrollPanel label="Mission log" kicker="LOG" style={{ height: 220 }}>
      {Array.from({ length: 16 }, (_, i) => (
        <p key={i}>[{String(i + 1).padStart(2, '0')}] Packet received</p>
      ))}
    </ScrollPanel>
  )
}`

export function ScrollPanelPage() {
  return (
    <ComponentDocShell
      title="ScrollPanel"
      slug="scroll-panel"
      category="UI Primitive"
      description="Keyboard-scrollable region with HUD scrollbar, dynamic top/bottom fade masks, live scroll-percentage readout, and corner brackets."
      demo={
        <ScrollPanel
          label="Mission log"
          kicker="LOG"
          style={{ height: 240 }}
          bodyStyle={{ height: 200 }}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <p key={i} className="m-0 mb-2 text-sm">
              [{String(i + 1).padStart(2, '0')}] Telemetry packet received — sector{' '}
              {((i * 7) % 9) + 1}.
            </p>
          ))}
        </ScrollPanel>
      }
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/ui/ScrollPanel.tsx', code: scrollPanelSource }]}
      propsList={[
        {
          name: 'label',
          type: 'string',
          description: 'Required accessible region name.',
        },
        {
          name: 'kicker / bar',
          type: 'ReactNode',
          description: 'Left kicker label or custom header bar content.',
        },
        {
          name: 'resetKey',
          type: 'string | number',
          description: 'Changing this value resets scrollTop back to 0.',
        },
        {
          name: 'bodyClassName / bodyStyle',
          type: 'string / CSSProperties',
          description: 'Targets the inner scrollable region.',
        },
      ]}
      keyboardList={[
        { keys: '↑ ↓', description: 'Scrolls in ~56px increments when the region is focused.' },
        {
          keys: 'PageUp / PageDown / Space',
          description: 'Scrolls by ~85% viewport height (Shift+Space scrolls up).',
        },
        { keys: 'Home / End', description: 'Jumps directly to the top or bottom.' },
      ]}
    />
  )
}
