import { forwardRef, useRef, type CSSProperties, type ReactNode } from 'react'
import { mergeProps, useFocusRing, useToggleButton } from 'react-aria'
import { useToggleState } from 'react-stately'

export type ToggleProps = {
  children: ReactNode
  /** Controlled pressed state. */
  isSelected?: boolean
  /** Uncontrolled default. */
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  style?: CSSProperties
  id?: string
  /** Optional type override — defaults to `"button"`. */
  type?: 'button' | 'submit' | 'reset'
}

/**
 * Headless Toggle (ARIA toggle button).
 *
 * Powered by react-aria's `useToggleButton` and `useToggleState`:
 *   - `aria-pressed="true"|"false"`.
 *   - Space / Enter to flip.
 *   - Disabled state handled.
 *
 * Data attributes (skins target these):
 *   - `[data-hud-toggle]`
 *   - `[data-pressed="true"|"false"]`
 *   - `[data-focus-visible="true"|"false"]`
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(props, ref) {
  const { children, style, id } = props
  const state = useToggleState(props)
  const internalRef = useRef<HTMLButtonElement>(null)
  const { buttonProps, isPressed } = useToggleButton(props, state, internalRef)
  const { isFocusVisible, focusProps } = useFocusRing()

  const setRefs = (node: HTMLButtonElement | null) => {
    internalRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={setRefs}
      id={id}
      data-hud-toggle=""
      data-pressed={state.isSelected ? 'true' : 'false'}
      data-active={isPressed ? 'true' : 'false'}
      data-focus-visible={isFocusVisible ? 'true' : 'false'}
      data-state={state.isSelected ? 'pressed' : 'unpressed'}
      style={style}
    >
      {children}
    </button>
  )
})
