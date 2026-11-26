import { useState } from 'react'
import { Dialog, Toggle } from '@hud-ui/core'
import { CornerBrackets } from '@hud-ui/skin-hud'
import { SplitPreview } from '../SplitPreview'

export function DialogPage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>Dialog</h1>
        <p>
          Modal dialog built on react-aria overlays. Portals to{' '}
          <code>document.body</code>, locks page scroll, traps focus, and returns focus to the
          trigger on close. Skins target <code>[data-hud-dialog]</code> and{' '}
          <code>[data-hud-dialog-overlay]</code>.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live</h2>
        <SplitPreview render={(skin) => <DialogDemo skin={skin} />} />
      </section>

      <section>
        <h2 className="armory-section-title">Props</h2>
        <dl className="armory-props">
          <dt>isOpen · onOpenChange</dt>
          <dd>Controlled visibility. Required.</dd>
          <dt>title</dt>
          <dd>Rendered as the dialog heading and used for the accessible name.</dd>
          <dt>isDismissable</dt>
          <dd>Click on scrim closes. Default <code>true</code>.</dd>
          <dt>isKeyboardDismissDisabled</dt>
          <dd>When <code>true</code>, Esc no longer closes.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Keyboard</h2>
        <dl className="armory-props">
          <dt>Esc</dt>
          <dd>Close.</dd>
          <dt>Tab · Shift+Tab</dt>
          <dd>Move focus inside the dialog (focus is trapped).</dd>
        </dl>
      </section>
    </>
  )
}

function DialogDemo({ skin }: { skin: 'hud' | 'plain' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Toggle isSelected={open} onChange={setOpen} aria-label={`Open ${skin} dialog`}>
        {open ? 'Close dialog' : 'Open dialog'}
      </Toggle>
      <Dialog isOpen={open} onOpenChange={setOpen} title="Mission briefing">
        {skin === 'hud' ? <CornerBrackets /> : null}
        <p>
          A controlled modal dialog. Focus starts on the first focusable element inside the
          panel and returns to the opening Toggle when you press Esc or click outside.
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
