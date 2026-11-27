import { forwardRef, type CSSProperties, type ReactNode } from 'react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cn } from '../../lib/utils'
import { CornerBrackets } from '../hud/CornerBrackets'

export type DialogProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  isDismissable?: boolean
  isKeyboardDismissDisabled?: boolean
  className?: string
  overlayClassName?: string
  style?: CSSProperties
  id?: string
}

/**
 * Modal Dialog — powered by Base UI Dialog with focus trap, Esc, scroll lock,
 * return focus, and chamfered HUD panel.
 * Boot-open uses opacity / translate / clip-path (never transform).
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    isOpen,
    onOpenChange,
    title,
    children,
    isDismissable = true,
    isKeyboardDismissDisabled = false,
    className,
    overlayClassName,
    style,
    id,
  },
  forwardedRef,
) {
  return (
    <BaseDialog.Root
      open={isOpen}
      modal={true}
      disablePointerDismissal={!isDismissable}
      onOpenChange={(nextOpen, details) => {
        if (!nextOpen && isKeyboardDismissDisabled && details.reason === 'escape-key') {
          details.cancel()
          return
        }
        onOpenChange(nextOpen)
      }}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          data-hud-dialog-overlay=""
          data-state={isOpen ? 'open' : 'closed'}
          className={cn('fixed inset-0 z-[100] bg-[var(--scrim)]', overlayClassName)}
        />
        <BaseDialog.Viewport className="fixed inset-0 z-[100] grid place-items-center p-4">
          <BaseDialog.Popup
            ref={forwardedRef}
            id={id}
            data-hud-dialog=""
            data-state={isOpen ? 'open' : 'closed'}
            className={cn(
              'relative flex max-h-[86vh] min-w-[min(480px,100%)] max-w-[min(640px,100%)]',
              'flex-col gap-3 border border-[var(--line)] bg-[var(--sheet-solid)]',
              'p-5 pb-4 font-[family-name:var(--hud-font-body)] text-[var(--ink)] outline-none',
              className,
            )}
            style={style}
          >
            <CornerBrackets />
            <BaseDialog.Title
              data-hud-dialog-title=""
              className="m-0 font-[family-name:var(--hud-font-display)] text-lg font-semibold uppercase tracking-[0.08em] text-[var(--ink)]"
            >
              {title}
            </BaseDialog.Title>
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
})
