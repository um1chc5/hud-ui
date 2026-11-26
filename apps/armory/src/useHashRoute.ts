import { useEffect, useState } from 'react'

export type Route =
  | 'home'
  | 'dialog'
  | 'tabs'
  | 'toggle'
  | 'meter'
  | 'text-scramble'
  | 'scroll-panel'

const ROUTES = new Set<string>([
  'home',
  'dialog',
  'tabs',
  'toggle',
  'meter',
  'text-scramble',
  'scroll-panel',
])

function parse(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw || raw === 'home') return 'home'
  return ROUTES.has(raw) ? (raw as Route) : 'home'
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? 'home' : parse(),
  )
  useEffect(() => {
    const onHash = () => setRoute(parse())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}
