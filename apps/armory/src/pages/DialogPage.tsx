import { useState } from 'react'
import { Dialog, Toggle } from '@hud-ui/ui'

export function DialogPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>Dialog</h1>
        <p>
          Modal dialog on react-aria overlays. Portals to <code>document.body</code>, locks scroll,
          traps focus, returns focus on close. Chamfered panel + corner brackets + boot-style open
          (opacity / translate / clip-path).
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <div className="armory-demo">
          <DialogDemo />
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>isOpen · onOpenChange</dt>
          <dd>Controlled visibility. Required.</dd>
          <dt>title</dt>
          <dd>Dialog heading and accessible name.</dd>
          <dt>isDismissable</dt>
          <dd>
            Scrim click closes. Default <code>true</code>.
          </dd>
          <dt>isKeyboardDismissDisabled</dt>
          <dd>
            When <code>true</code>, Esc no longer closes.
          </dd>
          <dt>className</dt>
          <dd>Merged onto the panel via <code>cn()</code>.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>Esc</dt>
          <dd>Close.</dd>
          <dt>Tab · Shift+Tab</dt>
          <dd>Move focus inside the dialog (trapped).</dd>
        </dl>
      </section>
    </>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Toggle isSelected={open} onChange={setOpen} aria-label="Open dialog">
        {open ? 'Close dialog' : 'Open dialog'}
      </Toggle>
      <Dialog isOpen={open} onOpenChange={setOpen} title="Mission briefing">
        <p>
          Controlled modal. Focus starts on the first focusable element and returns to the opening
          Toggle on Esc or outside click.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Toggle isSelected={false} onChange={() => setOpen(false)}>
            Acknowledge
          </Toggle>
        </div>
      </Dialog>
    </>
  )
}
