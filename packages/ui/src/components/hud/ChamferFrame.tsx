import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type ChamferSize = 'sm' | 'base' | 'lg'

export type ChamferFrameProps = {
  size?: ChamferSize
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** Chamfered frame wrapper — clip-path only, no transform. */
export function ChamferFrame({
  size = 'base',
  className,
  style,
  children,
}: ChamferFrameProps) {
  return (
    <div
      data-hud-chamfer=""
      data-size={size}
      className={cn('relative border border-[var(--line)] bg-[var(--sheet-solid)]', className)}
      style={style}
    >
      {children}
    </div>
  )
}
