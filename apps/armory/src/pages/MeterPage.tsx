import { useState } from 'react'
import { Meter } from '@hud-ui/ui'
import meterSource from '../../../../packages/ui/src/components/ui/Meter.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { Meter } from '@/components/ui/Meter'

export function TelemetryMeters() {
  return (
    <div className="space-y-4">
      <Meter label="Signal" value={72} />
      <Meter label="Ammo" value={40} variant="segments" segments={10} />
      <Meter label="Shield" value={86} variant="ring" />
    </div>
  )
}`

export function MeterPage() {
  return (
    <ComponentDocShell
      title="Meter"
      slug="meter"
      category="UI Primitive"
      description="Scalar readout with role='meter' in bar, segments, and ring variants. Glow applies strictly to active fills—never to label text."
      demo={<MeterDemo />}
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/ui/Meter.tsx', code: meterSource }]}
      propsList={[
        {
          name: 'value',
          type: 'number',
          description: 'Current numeric reading, clamped between min and max.',
        },
        {
          name: 'min / max',
          type: 'number',
          defaultValue: '0 / 100',
          description: 'Bounds for normalization and ARIA attributes.',
        },
        {
          name: 'label',
          type: 'ReactNode',
          description: 'Visible label and accessible name.',
        },
        {
          name: 'variant',
          type: "'bar' | 'segments' | 'ring'",
          defaultValue: "'bar'",
          description: 'Visual gauge presentation.',
        },
        {
          name: 'segments',
          type: 'number',
          defaultValue: '10',
          description: 'Cell count when variant="segments".',
        },
        {
          name: 'formatValue',
          type: '(value: number, normalized: number) => string',
          description: 'Customizes displayed text and aria-valuetext.',
        },
      ]}
      keyboardList={[
        { keys: '—', description: 'Read-only status indicator; focusable only if wrapped.' },
      ]}
    />
  )
}

function MeterDemo() {
  const [val, setVal] = useState(72)
  return (
    <div className="flex flex-col gap-4">
      <label className="armory-field">
        <span>Interactive Value ({val}%)</span>
        <input
          type="range"
          min={0}
          max={100}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="armory-range"
        />
      </label>
      <Meter label="Signal" value={val} />
      <Meter label="Ammo" value={val} variant="segments" segments={10} />
      <Meter label="Shield" value={val} variant="ring" />
    </div>
  )
}
