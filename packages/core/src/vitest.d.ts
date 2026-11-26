/// <reference types="vitest" />
// Pulls jest-dom + vitest-axe matcher augmentations into the project's type
// space so `expect(...).toHaveAttribute(...)` / `toBeInTheDocument()` /
// `toHaveNoViolations()` are typed during `tsc --noEmit`.
import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'

// vitest-axe 0.1.0 augments the old `Vi.Assertion` namespace, which Vitest 3
// no longer merges into its public Assertion interface. Patch directly.
declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): unknown
  }
}
