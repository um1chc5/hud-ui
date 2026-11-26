import { forwardRef, useId, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type MeterVariant = 'bar' | 'ring' | 'segments'

export type MeterProps = {
  value: number
  min?: number
  max?: number
  label: ReactNode
  formatValue?: (value: number, normalized: number) => string
  variant?: MeterVariant
  segments?: number
  className?: string
  style?: CSSProperties
  id?: string
}

export const Meter = forwardRef<HTMLDivElement, MeterProps>(function Meter(
  {
    value,
    min = 0,
    max = 100,
    label,
    formatValue,
    variant = 'bar',
    segments = 10,
    className,
    style,
    id,
  },
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
      className={cn(
        'grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1',
        'font-[family-name:var(--hud-font-mono)] text-[11.5px] tracking-[0.12em] text-[var(--muted)]',
        variant === 'ring' && 'grid-cols-[auto_1fr] grid-rows-[auto_auto]',
        className,
      )}
      style={style}
    >
      <span
        id={labelId}
        data-hud-meter-label=""
        className={cn('col-start-1 uppercase', variant === 'ring' && 'col-start-2 row-start-1')}
      >
        {label}
      </span>
      <span
        id={valueId}
        data-hud-meter-value=""
        aria-hidden="true"
        className={cn(
          'col-start-2 text-[var(--accent)] [font-variant-numeric:tabular-nums]',
          variant === 'ring' && 'col-start-2 row-start-2 justify-self-start',
        )}
      >
        {text}
      </span>
      {variant === 'segments' ? (
        <div
          data-hud-meter-track=""
          aria-hidden="true"
          className="col-span-full grid h-3.5 auto-cols-fr grid-flow-col gap-[3px] border-0 bg-transparent"
        >
          {Array.from({ length: segments }, (_, i) => {
            const threshold = ((i + 1) / segments) * 100
            const on = normalized >= threshold - 100 / segments / 2
            return (
              <span
                key={i}
                data-hud-meter-segment=""
                data-on={on ? 'true' : 'false'}
                className={cn(
                  'border border-[var(--line)] bg-[var(--soft)]',
                  on && 'border-[var(--accent)] bg-[var(--accent)]',
                )}
              />
            )
          })}
        </div>
      ) : variant === 'ring' ? (
        <div
          data-hud-meter-track=""
          aria-hidden="true"
          className="col-start-1 row-span-2 row-start-1 h-14 w-14 border-0 bg-transparent"
        >
          <MeterRing normalized={normalized} />
        </div>
      ) : (
        <div
          data-hud-meter-track=""
          aria-hidden="true"
          className="relative col-span-full h-2 overflow-hidden border border-[var(--line)] bg-[var(--soft)]"
        >
          <span
            data-hud-meter-fill=""
            className="absolute inset-y-0 left-0 bg-[var(--accent)]"
            style={{ ['--hud-meter-pct' as string]: `${normalized}%` }}
          />
        </div>
      )}
    </div>
  )
})

function MeterRing({ normalized }: { normalized: number }) {
  const r = 22
  return (
    <svg
      data-hud-meter-ring=""
      viewBox="0 0 48 48"
      role="presentation"
      focusable="false"
      className="block h-full w-full"
    >
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
