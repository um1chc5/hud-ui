import {
  forwardRef,
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react'
import {
  FocusScope,
  Overlay,
  mergeProps,
  useDialog,
  useModalOverlay,
  usePreventScroll,
} from 'react-aria'
import { useOverlayTriggerState } from 'react-stately'
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
 * Modal Dialog — focus trap, Esc, return focus, chamfered HUD panel.
 * Boot-open uses opacity / translate / clip-path (never transform).
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(props, forwardedRef) {
  const { isOpen, onOpenChange } = props
  const state = useOverlayTriggerState({ isOpen, onOpenChange })
  if (!state.isOpen) return null
  return <DialogImpl {...props} state={state} forwardedRef={forwardedRef} />
})

type DialogImplProps = DialogProps & {
  state: ReturnType<typeof useOverlayTriggerState>
  forwardedRef: Ref<HTMLDivElement>
}

function DialogImpl({
  state,
  title,
  children,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  className,
  overlayClassName,
  style,
  id,
  forwardedRef,
}: DialogImplProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable, isKeyboardDismissDisabled },
    state,
    ref,
  )
  const { dialogProps, titleProps } = useDialog({}, ref)
  usePreventScroll()

  const titleId = useId()

  const setRefs = (node: HTMLDivElement | null) => {
    ref.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <Overlay>
      <div
        {...underlayProps}
        data-hud-dialog-overlay=""
        data-state={state.isOpen ? 'open' : 'closed'}
        className={cn(
          'fixed inset-0 z-[100] grid place-items-center bg-[var(--scrim)] p-4',
          overlayClassName,
        )}
      >
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...mergeProps(modalProps, dialogProps)}
            ref={setRefs}
            id={id}
            aria-labelledby={titleId}
            data-hud-dialog=""
            data-state={state.isOpen ? 'open' : 'closed'}
            className={cn(
              'relative flex max-h-[86vh] min-w-[min(480px,100%)] max-w-[min(640px,100%)]',
              'flex-col gap-3 border border-[var(--line)] bg-[var(--sheet-solid)]',
              'p-5 pb-4 font-[family-name:var(--hud-font-body)] text-[var(--ink)]',
              className,
            )}
            style={style}
          >
            <CornerBrackets />
            <h2
              {...titleProps}
              id={titleId}
              data-hud-dialog-title=""
              className="m-0 font-[family-name:var(--hud-font-display)] text-lg font-semibold uppercase tracking-[0.08em] text-[var(--ink)]"
            >
              {title}
            </h2>
            {children}
          </div>
        </FocusScope>
      </div>
    </Overlay>
  )
}
