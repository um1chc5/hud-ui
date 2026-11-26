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

export type DialogProps = {
  /** Controlled visibility. */
  isOpen: boolean
  /** Called when the user tries to open (always via the caller) or close. */
  onOpenChange: (open: boolean) => void
  /** Visible, required title; also read as the dialog's accessible name. */
  title: string
  /** Panel content. */
  children: ReactNode
  /** When `true` (default), clicking the scrim closes the dialog. */
  isDismissable?: boolean
  /**
   * When `true`, pressing Esc does **not** close the dialog.
   * Default `false` (Esc dismisses).
   */
  isKeyboardDismissDisabled?: boolean
  /** Optional pass-through style for the dialog panel. */
  style?: CSSProperties
  /** Optional id for the dialog panel element. */
  id?: string
}

/**
 * Headless modal Dialog.
 *
 * Behaviour:
 * - Portals to `document.body` via react-aria's `Overlay`.
 * - Locks page scroll while open (`usePreventScroll`).
 * - Traps focus and restores it on close (`FocusScope`).
 * - Esc closes (unless `isKeyboardDismissDisabled`).
 * - Click on scrim closes when `isDismissable`.
 *
 * Data attributes (skins target these):
 * - `[data-hud-dialog-overlay][data-state="open"|"closed"]` on the scrim
 * - `[data-hud-dialog][data-state="open"|"closed"]` on the panel
 * - `[data-hud-dialog-title]` on the heading
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
      >
        <FocusScope contain restoreFocus autoFocus>
          <div
            {...mergeProps(modalProps, dialogProps)}
            ref={setRefs}
            id={id}
            aria-labelledby={titleId}
            data-hud-dialog=""
            data-state={state.isOpen ? 'open' : 'closed'}
            style={style}
          >
            <h2 {...titleProps} id={titleId} data-hud-dialog-title="">
              {title}
            </h2>
            {children}
          </div>
        </FocusScope>
      </div>
    </Overlay>
  )
}
