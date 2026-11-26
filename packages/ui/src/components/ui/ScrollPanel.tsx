import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export type ScrollPanelProps = {
  label: string
  kicker?: ReactNode
  bar?: ReactNode
  resetKey?: string | number
  className?: string
  bodyClassName?: string
  style?: CSSProperties
  bodyStyle?: CSSProperties
  children: ReactNode
  id?: string
}

type Metrics = {
  canScroll: boolean
  atTop: boolean
  atBottom: boolean
  pct: number
}

const INITIAL: Metrics = { canScroll: false, atTop: true, atBottom: true, pct: 0 }

export const ScrollPanel = forwardRef<HTMLDivElement, ScrollPanelProps>(function ScrollPanel(
  {
    label,
    kicker,
    bar,
    resetKey,
    className,
    bodyClassName,
    style,
    bodyStyle,
    children,
    id,
  },
  forwardedRef,
) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState<Metrics>(INITIAL)

  const measure = useCallback(() => {
    const el = bodyRef.current
    if (!el) return
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight)
    const canScroll = maxScroll > 2
    const top = el.scrollTop
    const atTop = !canScroll || top <= 2
    const atBottom = !canScroll || top >= maxScroll - 2
    const pct = canScroll ? Math.min(100, Math.max(0, Math.round((top / maxScroll) * 100))) : 0
    setMetrics((prev) =>
      prev.canScroll === canScroll &&
      prev.atTop === atTop &&
      prev.atBottom === atBottom &&
      prev.pct === pct
        ? prev
        : { canScroll, atTop, atBottom, pct },
    )
  }, [])

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    el.scrollTop = 0
    measure()
  }, [resetKey, measure])

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    measure()
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure())
      ro.observe(el)
      if (el.firstElementChild) ro.observe(el.firstElementChild)
    }
    const onWin = () => measure()
    window.addEventListener('resize', onWin)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', onWin)
    }
  }, [measure, children])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    const el = bodyRef.current
    if (!el) return
    const step = 56
    const page = Math.max(120, el.clientHeight * 0.85)
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        el.scrollTop += step
        break
      case 'ArrowUp':
        e.preventDefault()
        el.scrollTop -= step
        break
      case 'PageDown':
        e.preventDefault()
        el.scrollTop += page
        break
      case 'PageUp':
        e.preventDefault()
        el.scrollTop -= page
        break
      case ' ':
        e.preventDefault()
        el.scrollTop += e.shiftKey ? -page : page
        break
      case 'Home':
        e.preventDefault()
        el.scrollTop = 0
        break
      case 'End':
        e.preventDefault()
        el.scrollTop = el.scrollHeight
        break
    }
  }

  const showBar = bar !== undefined || kicker !== undefined || metrics.canScroll

  return (
    <div
      ref={forwardedRef}
      id={id}
      data-hud-scroll-panel=""
      className={cn(
        'relative flex min-h-0 flex-col border border-[var(--line)]',
        'bg-[color-mix(in_srgb,var(--sheet-solid)_78%,transparent)]',
        className,
      )}
      style={style}
    >
      {showBar ? (
        <div
          data-hud-scroll-panel-bar=""
          className="flex min-h-6 flex-none items-center justify-between gap-2 px-3.5 pb-0.5 pt-1.5"
        >
          {bar !== undefined ? (
            bar
          ) : (
            <>
              {kicker !== undefined ? (
                <span
                  data-hud-scroll-panel-kicker=""
                  className="font-[family-name:var(--hud-font-mono)] text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]"
                >
                  {kicker}
                </span>
              ) : (
                <span />
              )}
              {metrics.canScroll ? (
                <span
                  data-hud-scroll-panel-readout=""
                  aria-hidden="true"
                  className="font-[family-name:var(--hud-font-mono)] text-[11px] font-bold tracking-[0.1em] text-[var(--accent)] [font-variant-numeric:tabular-nums]"
                >
                  ▼ {metrics.pct}%
                </span>
              ) : null}
            </>
          )}
        </div>
      ) : null}
      <div
        ref={bodyRef}
        data-hud-scroll-panel-body=""
        tabIndex={metrics.canScroll ? 0 : -1}
        role="region"
        aria-label={label}
        data-scrollable={metrics.canScroll ? 'true' : 'false'}
        data-at-top={metrics.atTop ? 'true' : 'false'}
        data-at-bottom={metrics.atBottom ? 'true' : 'false'}
        data-scroll-pct={metrics.pct}
        onScroll={measure}
        onKeyDown={onKeyDown}
        className={cn(
          'min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pb-4 pt-3 outline-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]',
          bodyClassName,
        )}
        style={bodyStyle}
      >
        {children}
      </div>
    </div>
  )
})
