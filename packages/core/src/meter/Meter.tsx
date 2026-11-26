import { forwardRef, useId, type CSSProperties, type ReactNode } from 'react'

export type MeterVariant = 'bar' | 'ring' | 'segments'

export type MeterProps = {
  /** Current value. Will be clamped into `[min, max]`. */
  value: number
  min?: number
  max?: number
  /** Visible label. Also used as the accessible name. */
  label: ReactNode
  /**
   * How to display the numeric readout. Defaults to `"{round(0..100)}%"`.
   * The returned string is also passed to `aria-valuetext`.
   */
  formatValue?: (value: number, normalized: number) => string
  variant?: MeterVariant
  /** For `variant="segments"` — how many segment children to render. Default 10. */
  segments?: number
  style?: CSSProperties
  id?: string
}

/**
 * Headless Meter.
 *
 * Uses the native ARIA `role="meter"` pattern — not a progressbar, because
 * meters represent a scalar value within a known range (signal strength,
 * ammo, battery).
 *
 * Data attributes (skins target these):
 *   - `[data-hud-meter][data-variant="bar"|"ring"|"segments"]`
 *   - `[data-value]` — normalised 0..100 integer
 *   - `[data-hud-meter-track]`, `[data-hud-meter-fill]`
 *   - `[data-hud-meter-segment][data-on="true"|"false"]` for segment children
 *   - `[data-hud-meter-ring]` for the SVG wrapper
 */
export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  { value, min = 0, max = 100, label, formatValue, variant = 'bar', segments = 10, style, id },
  ref,
) {
  const safeMin = Number.isFinite(min) ? min : 0
  const safeMax = Number.isFinite(max) ? max : 100
  const span = safeMax - safeMin || 1
  const clamped = Math.min(safeMax, Math.max(safeMin, value))
  const normalized = ((clamped - safeMin) / span) * 100
  const normalizedInt = Math.round(normalized)

  const text = formatValue ? formatValue(clamped, normalized) : `${normalizedInt}%`

  const labelId = useId()
  const valueId = useId()

  return (
    <div
      ref={ref}
      id={id}
      role="meter"
      aria-valuemin={safeMin}
      aria-valuemax={safeMax}
      aria-valuenow={clamped}
      aria-valuetext={text}
      aria-labelledby={labelId}
      data-hud-meter=""
      data-variant={variant}
      data-value={normalizedInt}
      style={style}
    >
      <span id={labelId} data-hud-meter-label="">
        {label}
      </span>
      <span id={valueId} data-hud-meter-value="" aria-hidden="true">
        {text}
      </span>
      {variant === 'segments' ? (
        <div data-hud-meter-track="" aria-hidden="true">
          {Array.from({ length: segments }, (_, i) => {
            const threshold = ((i + 1) / segments) * 100
            const on = normalized >= threshold - 100 / segments / 2
            return <span key={i} data-hud-meter-segment="" data-on={on ? 'true' : 'false'} />
          })}
        </div>
      ) : variant === 'ring' ? (
        <div data-hud-meter-track="" aria-hidden="true">
          <MeterRing normalized={normalized} />
        </div>
      ) : (
        <div data-hud-meter-track="" aria-hidden="true">
          {/* Skins size the fill via --hud-meter-pct; core never sets colours/sizes. */}
          <span
            data-hud-meter-fill=""
            style={{ ['--hud-meter-pct' as string]: `${normalized}%` }}
          />
        </div>
      )}
    </div>
  )
})

function MeterRing({ normalized }: { normalized: number }) {
  // Unitless SVG geometry only — skins own stroke colour / size via CSS.
  const r = 22
  return (
    <svg data-hud-meter-ring="" viewBox="0 0 48 48" role="presentation" focusable="false">
      <circle data-role="track" cx="24" cy="24" r={r} fill="none" pathLength={100} />
      <circle
        data-role="fill"
        cx="24"
        cy="24"
        r={r}
        fill="none"
        pathLength={100}
        strokeDasharray={`${normalized} ${100 - normalized}`}
        transform="rotate(-90 24 24)"
      />
    </svg>
  )
}
