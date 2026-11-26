import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Toggle } from './Toggle'
import { SKINS, withSkin } from '../__tests__/skins'

function Harness() {
  const [on, setOn] = useState(false)
  return (
    <Toggle isSelected={on} onChange={setOn}>
      Scanner
    </Toggle>
  )
}

describe.each(SKINS)('Toggle [%s]', (skin) => {
  it('flips aria-pressed and data-pressed on click', async () => {
    const user = userEvent.setup()
    render(withSkin(skin, <Harness />))
    const btn = screen.getByRole('button', { name: 'Scanner' })
    expect(btn).toHaveAttribute('aria-pressed', 'false')
    expect(btn).toHaveAttribute('data-pressed', 'false')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-pressed', 'true')
    expect(btn).toHaveAttribute('data-pressed', 'true')
  })

  it('flips with Space and with Enter', async () => {
    const user = userEvent.setup()
    render(withSkin(skin, <Harness />))
    const btn = screen.getByRole('button', { name: 'Scanner' })
    btn.focus()
    await user.keyboard(' ')
    expect(btn).toHaveAttribute('aria-pressed', 'true')
    await user.keyboard('{Enter}')
    expect(btn).toHaveAttribute('aria-pressed', 'false')
  })

  it('has no axe violations', async () => {
    const { container } = render(withSkin(skin, <Harness />))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
