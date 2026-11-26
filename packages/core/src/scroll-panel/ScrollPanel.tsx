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

export type ScrollPanelProps = {
  /** Accessible region label. Required. */
  label: string
  /** Optional short kicker string shown at the top-left of the panel bar. */
  kicker?: ReactNode
  /** Full override for the bar content. Takes precedence over `kicker`. */
  bar?: ReactNode
  /**
   * Changing this value resets the panel scroll position to 0. Useful for
   * navigation between screens that share the same panel.
   */
  resetKey?: string | number
  /** Pass-through style for the outer panel. */
  style?: CSSProperties
  /** Pass-through style for the scrollable body. */
  bodyStyle?: CSSProperties
  /** Panel content. */
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

/**
 * Headless scrollable region.
 *
 * Ported from the reference `HudScrollPanel`; this version has zero
 * className/CSS footprint and exposes everything through data attributes.
 *
 * Keyboard (when the body is focused):
 *   - ArrowUp / ArrowDown — scroll ~56px
 *   - PageUp / PageDown — scroll one viewport
 *   - Space / Shift+Space — scroll one viewport
 *   - Home / End — jump to start / end
 *
 * Data attributes:
 *   - `[data-hud-scroll-panel]` on the outer frame
 *   - `[data-hud-scroll-panel-bar]` on the bar when rendered
 *   - `[data-hud-scroll-panel-kicker]` on the default kicker span
 *   - `[data-hud-scroll-panel-readout]` on the default scroll readout
 *   - `[data-hud-scroll-panel-body]` on the scrollable region (role="region")
 *   - `[data-scrollable][data-at-top][data-at-bottom][data-scroll-pct]` on the body
 */
export const ScrollPanel = forwardRef<HTMLDivElement, ScrollPanelProps>(function ScrollPanel(
  { label, kicker, bar, resetKey, style, bodyStyle, children, id },
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

  // Reset scroll position when `resetKey` changes.
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    el.scrollTop = 0
    measure()
  }, [resetKey, measure])

  // Observe resize + children height changes.
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
    <div ref={forwardedRef} id={id} data-hud-scroll-panel="" style={style}>
      {showBar ? (
        <div data-hud-scroll-panel-bar="">
          {bar !== undefined ? (
            bar
          ) : (
            <>
              {kicker !== undefined ? (
                <span data-hud-scroll-panel-kicker="">{kicker}</span>
              ) : (
                <span />
              )}
              {metrics.canScroll ? (
                <span data-hud-scroll-panel-readout="" aria-hidden="true">
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
        style={bodyStyle}
      >
        {children}
      </div>
    </div>
  )
})
