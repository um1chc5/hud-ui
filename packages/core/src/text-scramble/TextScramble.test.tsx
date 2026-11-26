import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { TextScramble } from './TextScramble'
import { SKINS, withSkin } from '../__tests__/skins'

describe.each(SKINS)('TextScramble [%s]', (skin) => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-hud-motion', 'on')
  })

  afterEach(() => {
    document.documentElement.removeAttribute('data-hud-motion')
    vi.unstubAllGlobals()
  })

  it('keeps aria-label as the final text while scrambling', async () => {
    render(withSkin(skin, <TextScramble text="BRIEFING" duration={200} />))
    const el = screen.getByLabelText('BRIEFING')
    expect(el).toHaveAttribute('data-hud-text-scramble')
    await waitFor(() => expect(el).toHaveAttribute('data-phase', 'done'))
    expect(el).toHaveTextContent('BRIEFING')
  })

  it('shows the final text instantly when motion is off', () => {
    document.documentElement.setAttribute('data-hud-motion', 'off')
    render(withSkin(skin, <TextScramble text="READY" duration={2000} />))
    const el = screen.getByLabelText('READY')
    expect(el).toHaveAttribute('data-phase', 'done')
    expect(el).toHaveTextContent('READY')
  })

  it('shows the final text instantly under prefers-reduced-motion', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
    render(withSkin(skin, <TextScramble text="STATIC" duration={2000} />))
    const el = screen.getByLabelText('STATIC')
    expect(el).toHaveAttribute('data-phase', 'done')
    expect(el).toHaveTextContent('STATIC')
  })

  it('aborts cleanly when the text changes mid-animation', async () => {
    const { rerender } = render(withSkin(skin, <TextScramble text="ALPHA" duration={2000} />))
    const el = screen.getByLabelText('ALPHA')
    expect(el).toHaveAttribute('data-phase', 'running')
    rerender(withSkin(skin, <TextScramble text="BRAVO" duration={80} />))
    expect(screen.getByLabelText('BRAVO')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByLabelText('BRAVO')).toHaveAttribute('data-phase', 'done'))
    expect(screen.getByLabelText('BRAVO')).toHaveTextContent('BRAVO')
  })

  it('cancels the animation on unmount without throwing', () => {
    const { unmount } = render(withSkin(skin, <TextScramble text="ABORT" duration={2000} />))
    expect(screen.getByLabelText('ABORT')).toHaveAttribute('data-phase', 'running')
    expect(() => {
      act(() => {
        unmount()
      })
    }).not.toThrow()
  })

  it('has no axe violations', async () => {
    document.documentElement.setAttribute('data-hud-motion', 'off')
    const { container } = render(withSkin(skin, <TextScramble text="SCAN COMPLETE" />))
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
