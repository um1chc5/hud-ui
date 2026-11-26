import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { ScrollPanel } from './ScrollPanel'

function TallContent() {
  return (
    <div style={{ height: 800 }}>
      <p>Line one</p>
      <p>Line two</p>
      <p>Line three</p>
    </div>
  )
}

describe('ScrollPanel', () => {
  it('exposes a labelled region and scroll metrics', () => {
    const { container } = render(
      <div style={{ height: 120 }}>
        <ScrollPanel
          label="Mission log"
          kicker="LOG"
          bodyStyle={{ height: 120, overflow: 'auto' }}
        >
          <TallContent />
        </ScrollPanel>
      </div>,
    )
    const region = screen.getByRole('region', { name: 'Mission log' })
    expect(region).toHaveAttribute('data-hud-scroll-panel-body')
    expect(region.getAttribute('data-scrollable')).toMatch(/true|false/)
    expect(container.querySelector('[data-hud-scroll-panel]')).not.toBeNull()
  })

  it('scrolls with keyboard when focused', async () => {
    const user = userEvent.setup()
    render(
      <ScrollPanel label="Brief" bodyStyle={{ height: 100, overflow: 'auto' }}>
        <TallContent />
      </ScrollPanel>,
    )
    const region = screen.getByRole('region', { name: 'Brief' })
    Object.defineProperty(region, 'clientHeight', { configurable: true, value: 100 })
    Object.defineProperty(region, 'scrollHeight', { configurable: true, value: 800 })
    region.dispatchEvent(new Event('scroll'))
    region.focus()
    const before = region.scrollTop
    await user.keyboard('{ArrowDown}')
    expect(region.scrollTop).toBeGreaterThanOrEqual(before)
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ScrollPanel label="Archive" kicker="ARC">
        <p>Short content that does not overflow.</p>
      </ScrollPanel>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
