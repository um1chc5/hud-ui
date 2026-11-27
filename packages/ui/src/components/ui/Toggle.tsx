import { forwardRef, type CSSProperties, type ReactNode } from 'react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
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

/**
 * Accessible Toggle button — powered by Base UI Toggle (`aria-pressed`).
 * Space / Enter flip state with chamfered HUD styling.
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    children,
    isSelected,
    defaultSelected,
    onChange,
    isDisabled = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    style,
    id,
    type = 'button',
  },
  forwardedRef,
) {
  return (
    <BaseToggle
      ref={forwardedRef}
      id={id}
      type={type}
      pressed={isSelected}
      defaultPressed={defaultSelected}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onPressedChange={(pressed) => onChange?.(pressed)}
      style={style}
      render={(renderProps, state) => (
        <button
          {...renderProps}
          data-hud-toggle=""
          data-pressed={state.pressed ? 'true' : 'false'}
          data-state={state.pressed ? 'pressed' : 'unpressed'}
          className={cn(
            'cursor-pointer appearance-none border border-[var(--line)] bg-transparent',
            'px-4 py-2 font-[family-name:var(--hud-font-mono)] text-xs uppercase tracking-[0.14em]',
            'text-[var(--muted)] hover:border-[var(--accent-d)] hover:text-[var(--ink)]',
            state.pressed &&
              'border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)] hover:border-[var(--accent)] hover:text-[var(--on-accent)]',
            state.disabled && 'cursor-not-allowed opacity-40',
            className,
          )}
        >
          {children}
        </button>
      )}
    />
  )
})
