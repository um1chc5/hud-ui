import type { CSSProperties } from 'react'
import { cn } from '../../lib/utils'

export type CornerBracketsProps = {
  className?: string
  style?: CSSProperties
}

/** Decorative corner brackets. Always `aria-hidden`. Parent needs `relative`. */
export function CornerBrackets({ className, style }: CornerBracketsProps) {
  return (
    <span
      data-hud-corner-brackets=""
      aria-hidden="true"
      className={cn(className)}
      style={style}
    />
  )
}
