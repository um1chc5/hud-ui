import type { CSSProperties } from 'react'
import { cn } from '../../lib/utils'

export type GridBgProps = {
  className?: string
  style?: CSSProperties
}

/**
 * Decorative graph-grid layer. Prefer `data-hud-grid="on"` on `<html>` for
 * full-page grids; use this when you need a local panel grid.
 */
export function GridBg({ className, style }: GridBgProps) {
  return (
    <div
      aria-hidden="true"
      data-hud-grid-bg=""
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage:
          'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        ...style,
      }}
    />
  )
}
