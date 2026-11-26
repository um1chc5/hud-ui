import type { CSSProperties, ReactNode } from 'react'

export type ChamferSize = 'sm' | 'base' | 'lg'

export type ChamferProps = {
  /** Which chamfer size to apply. Maps to `--hud-chamfer-{sm,base,lg}`. */
  size?: ChamferSize
  /** Pass-through inline styles. */
  style?: CSSProperties
  children?: ReactNode
}

const chamferVar: Record<ChamferSize, string> = {
  sm: 'var(--hud-chamfer-sm)',
  base: 'var(--hud-chamfer)',
  lg: 'var(--hud-chamfer-lg)',
}

/**
 * Wraps `children` in a span that applies the HUD chamfer clip-path. Purely
 * decorative — if the active skin is `plain`, the span simply has no effect
 * because the plain skin resets `clip-path`.
 */
export function Chamfer({ size = 'base', style, children }: ChamferProps) {
  return (
    <span
      data-hud-chamfer=""
      style={{
        display: 'inline-block',
        clipPath: `polygon(
          0 ${chamferVar[size]},
          ${chamferVar[size]} 0,
          calc(100% - ${chamferVar[size]}) 0,
          100% ${chamferVar[size]},
          100% calc(100% - ${chamferVar[size]}),
          calc(100% - ${chamferVar[size]}) 100%,
          ${chamferVar[size]} 100%,
          0 calc(100% - ${chamferVar[size]})
        )`,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
