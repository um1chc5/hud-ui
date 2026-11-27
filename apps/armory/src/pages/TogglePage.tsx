import { useState } from 'react'
import { Toggle } from '@hud-ui/ui'
import toggleSource from '../../../../packages/ui/src/components/ui/Toggle.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { useState } from 'react'
import { Toggle } from '@/components/ui/Toggle'

export function ScannerSwitch() {
  const [active, setActive] = useState(true)

  return (
    <Toggle isSelected={active} onChange={setActive}>
      Scanner {active ? 'ON' : 'OFF'}
    </Toggle>
  )
}`

export function TogglePage() {
  return (
    <ComponentDocShell
      title="Toggle"
      slug="toggle"
      category="UI Primitive"
      description="ARIA toggle button (aria-pressed) powered by Base UI Toggle. Chamfered HUD chip with solid accent fill and optional glow when pressed."
      dependencies={['@base-ui/react']}
      demo={<ToggleDemo />}
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/ui/Toggle.tsx', code: toggleSource }]}
      propsList={[
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Button label content.',
        },
        {
          name: 'isSelected',
          type: 'boolean',
          description: 'Controlled pressed state.',
        },
        {
          name: 'defaultSelected',
          type: 'boolean',
          description: 'Initial pressed state for uncontrolled usage.',
        },
        {
          name: 'onChange',
          type: '(isSelected: boolean) => void',
          description: 'Fired when toggled.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables pointer and keyboard activation.',
        },
      ]}
      keyboardList={[{ keys: 'Space / Enter', description: 'Flips the pressed state.' }]}
    />
  )
}

function ToggleDemo() {
  const [a, setA] = useState(false)
  const [b, setB] = useState(true)
  return (
    <div className="flex flex-wrap gap-3">
      <Toggle isSelected={a} onChange={setA}>
        Scanner
      </Toggle>
      <Toggle isSelected={b} onChange={setB}>
        Night vision
      </Toggle>
      <Toggle isDisabled>Offline</Toggle>
    </div>
  )
}
