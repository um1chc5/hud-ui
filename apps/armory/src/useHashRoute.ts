import { useEffect, useState } from 'react'

export type Route =
  | 'home'
  | 'dialog'
  | 'tabs'
  | 'toggle'
  | 'meter'
  | 'text-scramble'
  | 'scroll-panel'

const VALID: readonly Route[] = [
  'home',
  'dialog',
  'tabs',
  'toggle',
  'meter',
  'text-scramble',
  'scroll-panel',
]

function parse(): Route {
  if (typeof window === 'undefined') return 'home'
  const raw = window.location.hash.replace(/^#\/?/, '') || 'home'
  return (VALID as readonly string[]).includes(raw) ? (raw as Route) : 'home'
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parse)
  useEffect(() => {
    const onHash = () => setRoute(parse())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}
