import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, vi } from 'vitest'
import { toHaveNoViolations } from 'vitest-axe/matchers'

expect.extend({ toHaveNoViolations })

afterEach(() => {
  cleanup()
})

// axe-core probes canvas for colour contrast; jsdom has no real canvas.
HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never
