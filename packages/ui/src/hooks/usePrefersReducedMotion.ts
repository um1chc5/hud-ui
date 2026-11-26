import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function readPrefersReduced(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia(QUERY).matches
}

/**
 * Returns `true` when the OS-level "reduce motion" preference is on.
 * SSR-safe: reads matchMedia on the client; defaults to `false` on the server.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(readPrefersReduced)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mql = window.matchMedia(QUERY)
    setReduced(mql.matches)
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches)
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
    mql.addListener(handler)
    return () => mql.removeListener(handler)
  }, [])

  return reduced
}
