import { forwardRef, useRef, type CSSProperties, type ReactNode } from 'react'
import { mergeProps, useFocusRing, useToggleButton } from 'react-aria'
import { useToggleState } from 'react-stately'
import { cn } from '../../lib/utils'

export type ToggleProps = {
  children: ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
  style?: CSSProperties
  id?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(props, ref) {
  const { children, style, id, className } = props
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
      className={cn(
        'cursor-pointer appearance-none border border-[var(--line)] bg-transparent',
        'px-4 py-2 font-[family-name:var(--hud-font-mono)] text-xs uppercase tracking-[0.14em]',
        'text-[var(--muted)] hover:border-[var(--accent-d)] hover:text-[var(--ink)]',
        state.isSelected &&
          'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:border-[var(--accent)] hover:text-[var(--on-accent)]',
        props.isDisabled && 'cursor-not-allowed opacity-40',
        className,
      )}
      style={style}
    >
      {children}
    </button>
  )
})
