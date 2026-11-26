import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Item, Tabs } from './Tabs'

function Harness() {
  return (
    <Tabs aria-label="Status" defaultSelectedKey="signal">
      <Item key="signal" title="Signal">
        Signal panel
      </Item>
      <Item key="power" title="Power">
        Power panel
      </Item>
      <Item key="comms" title="Comms">
        Comms panel
      </Item>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('renders the default selected tab', () => {
    render(<Harness />)
    const first = screen.getByRole('tab', { name: 'Signal' })
    expect(first).toHaveAttribute('aria-selected', 'true')
    expect(first).toHaveAttribute('data-selected', 'true')
    expect(screen.getByText('Signal panel')).toBeVisible()
  })

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const first = screen.getByRole('tab', { name: 'Signal' })
    first.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Power' })).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Comms' })).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Home}')
    expect(screen.getByRole('tab', { name: 'Signal' })).toHaveAttribute('aria-selected', 'true')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Harness />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
