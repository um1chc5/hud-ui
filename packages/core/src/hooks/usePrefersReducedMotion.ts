import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Returns `true` when the user's OS-level "reduce motion" preference is on.
 * SSR-safe: starts as `false` and syncs after mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mql = window.matchMedia(QUERY)
    setReduced(mql.matches)
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches)
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
    // Safari fallback.
    mql.addListener(handler)
    return () => mql.removeListener(handler)
  }, [])

  return reduced
}
