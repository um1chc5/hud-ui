import type { CSSProperties } from 'react'

export type CornerBracketsProps = {
  /** Optional inline style (positioning overrides, etc.). */
  style?: CSSProperties
}

/**
 * Decorative chamfered corner brackets. Always `aria-hidden`.
 *
 * Positioned absolutely by the skin CSS, so the parent needs
 * `position: relative`. Intended to be rendered inside a HUD panel such as
 * Dialog or ScrollPanel:
 *
 * ```tsx
 * <Dialog isOpen={open} onOpenChange={setOpen} title="Status">
 *   <CornerBrackets />
 *   …
 * </Dialog>
 * ```
 */
export function CornerBrackets({ style }: CornerBracketsProps) {
  return <span data-hud-corner-brackets="" aria-hidden="true" style={style} />
}
