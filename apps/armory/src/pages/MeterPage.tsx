import { Meter } from '@hud-ui/ui'

export function MeterPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>Meter</h1>
        <p>
          Scalar readout with <code>role=&quot;meter&quot;</code>. Variants: bar, segments, ring.
          Glow on the fill only — never on the label text.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <div className="armory-demo">
          <Meter label="Signal" value={72} />
          <Meter label="Ammo" value={40} variant="segments" segments={10} />
          <Meter label="Shield" value={86} variant="ring" />
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>value · min · max</dt>
          <dd>Clamped into range; drives ARIA valuemin/now/max.</dd>
          <dt>label</dt>
          <dd>Visible + accessible name.</dd>
          <dt>variant</dt>
          <dd>
            <code>bar</code> | <code>segments</code> | <code>ring</code>
          </dd>
          <dt>formatValue</dt>
          <dd>Custom readout + aria-valuetext.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>—</dt>
          <dd>Read-only. Focusable only if you wrap it.</dd>
        </dl>
      </section>
    </>
  )
}
