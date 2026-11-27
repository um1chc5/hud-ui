import { useState } from 'react'
import { Dialog, Toggle } from '@hud-ui/ui'
import dialogSource from '../../../../packages/ui/src/components/ui/Dialog.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Toggle } from '@/components/ui/Toggle'

export function BriefingModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Toggle isSelected={open} onChange={setOpen}>
        Open briefing
      </Toggle>
      <Dialog isOpen={open} onOpenChange={setOpen} title="Mission briefing">
        <p>Sector perimeter is green. Telemetry synchronized.</p>
      </Dialog>
    </>
  )
}`

export function DialogPage() {
  return (
    <ComponentDocShell
      title="Dialog"
      slug="dialog"
      category="UI Primitive"
      description="Modal dialog on react-aria overlays. Portals to document.body, locks scroll, traps focus, and returns focus on close. Chamfered panel + corner brackets + boot-style open."
      dependencies={['react-aria', 'react-stately']}
      demo={<DialogDemo />}
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/ui/Dialog.tsx', code: dialogSource }]}
      propsList={[
        {
          name: 'isOpen',
          type: 'boolean',
          description: 'Controlled visibility state. Required.',
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: 'Fired when the dialog requests open/close. Required.',
        },
        {
          name: 'title',
          type: 'string',
          description: 'Dialog heading and accessible name.',
        },
        {
          name: 'isDismissable',
          type: 'boolean',
          defaultValue: 'true',
          description: 'Allows clicking the scrim outside the panel to close.',
        },
        {
          name: 'isKeyboardDismissDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'When true, pressing Esc no longer closes the dialog.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Merged onto the dialog panel via cn().',
        },
      ]}
      keyboardList={[
        { keys: 'Esc', description: 'Closes the dialog unless isKeyboardDismissDisabled is true.' },
        { keys: 'Tab · Shift+Tab', description: 'Moves focus within the trapped dialog scope.' },
      ]}
    />
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle isSelected={open} onChange={setOpen} aria-label="Open dialog">
        {open ? 'Close dialog' : 'Open dialog'}
      </Toggle>
      <Dialog isOpen={open} onOpenChange={setOpen} title="Mission briefing">
        <p className="m-0 text-sm">
          Controlled modal. Focus starts on the first focusable element and returns to the opening
          Toggle on Esc or outside click.
        </p>
        <div className="flex justify-end gap-2 pt-2">
          <Toggle isSelected={false} onChange={() => setOpen(false)}>
            Acknowledge
          </Toggle>
        </div>
      </Dialog>
    </div>
  )
}
