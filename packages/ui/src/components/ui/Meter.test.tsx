import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { Meter } from './Meter'

describe('Meter', () => {
  it('exposes ARIA meter values and data-value', () => {
    render(<Meter label="Signal" value={72} min={0} max={100} />)
    const meter = screen.getByRole('meter', { name: 'Signal' })
    expect(meter).toHaveAttribute('aria-valuenow', '72')
    expect(meter).toHaveAttribute('aria-valuemin', '0')
    expect(meter).toHaveAttribute('aria-valuemax', '100')
    expect(meter).toHaveAttribute('aria-valuetext', '72%')
    expect(meter).toHaveAttribute('data-value', '72')
    expect(meter).toHaveAttribute('data-variant', 'bar')
  })

  it('renders segment children with data-on for the segments variant', () => {
    const { container } = render(
      <Meter label="Ammo" value={40} variant="segments" segments={5} />,
    )
    const segments = container.querySelectorAll('[data-hud-meter-segment]')
    expect(segments).toHaveLength(5)
    const onCount = [...segments].filter((el) => el.getAttribute('data-on') === 'true').length
    expect(onCount).toBeGreaterThan(0)
    expect(onCount).toBeLessThan(5)
  })

  it('has no axe violations for bar, segments, and ring', async () => {
    const { container } = render(
      <>
        <Meter label="Bar" value={50} />
        <Meter label="Seg" value={60} variant="segments" />
        <Meter label="Ring" value={80} variant="ring" />
      </>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
