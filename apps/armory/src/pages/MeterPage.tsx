import { useEffect, useState } from 'react'
import { Meter } from '@hud-ui/core'
import { SplitPreview } from '../SplitPreview'

export function MeterPage() {
  const [value, setValue] = useState(42)
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => Math.min(100, Math.max(0, v + (Math.random() * 20 - 10))))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <header className="armory-page-header">
        <h1>Meter</h1>
        <p>
          Native ARIA <code>role="meter"</code>. Three variants —{' '}
          <code>"bar"</code>, <code>"ring"</code>, <code>"segments"</code> — all share the same
          data contract so skins can style each form independently.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <SplitPreview render={() => <MeterDemo value={value} />} />
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>value · min · max</dt>
          <dd>Numeric range. <code>value</code> is clamped into <code>[min, max]</code>.</dd>
          <dt>label</dt>
          <dd>Visible label and accessible name.</dd>
          <dt>variant</dt>
          <dd><code>"bar"</code> (default) · <code>"ring"</code> · <code>"segments"</code>.</dd>
          <dt>segments</dt>
          <dd>Segment count when <code>variant="segments"</code>. Default 10.</dd>
          <dt>formatValue</dt>
          <dd>
            Override the numeric readout. The returned string is also used for{' '}
            <code>aria-valuetext</code>.
          </dd>
        </dl>
      </section>
    </>
  )
}

function MeterDemo({ value }: { value: number }) {
  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <Meter value={value} label="Signal" variant="bar" />
      <Meter value={value} label="Energy" variant="segments" segments={12} />
      <Meter
        value={value}
        label="Shield"
        variant="ring"
        formatValue={(_v: number, n: number) => `${Math.round(n)}%`}
      />
    </div>
  )
}
