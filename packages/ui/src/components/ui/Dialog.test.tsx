import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Dialog } from './Dialog'

function Harness({ initial = false }: { initial?: boolean }) {
  const [open, setOpen] = useState(initial)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        open
      </button>
      <Dialog isOpen={open} onOpenChange={setOpen} title="Mission briefing">
        <p>Dialog body text for the assistive technology.</p>
        <button type="button" onClick={() => setOpen(false)}>
          dismiss
        </button>
      </Dialog>
    </>
  )
}

describe('Dialog', () => {
  it('opens on trigger and traps focus inside the panel', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: 'open' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('data-hud-dialog')
    expect(dialog).toHaveAttribute('data-state', 'open')
    expect(dialog.contains(document.activeElement)).toBe(true)
  })

  it('closes on Esc', async () => {
    const user = userEvent.setup()
    render(<Harness initial />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('has no axe violations when open', async () => {
    const { container } = render(<Harness initial />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
