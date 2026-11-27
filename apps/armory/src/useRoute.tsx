import { useCallback, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

export type Route =
  | 'landing'
  | 'docs-getting-started'
  | 'docs-theming'
  | 'docs-motion'
  | 'component-dialog'
  | 'component-tabs'
  | 'component-toggle'
  | 'component-meter'
  | 'component-text-scramble'
  | 'component-scroll-panel'
  | 'component-chamfer-frame'
  | 'component-corner-brackets'
  | 'component-grid-bg'
  | 'playground'

const PATH_TO_ROUTE: Record<string, Route> = {
  '/': 'landing',
  '/docs': 'docs-getting-started',
  '/docs/getting-started': 'docs-getting-started',
  '/docs/theming': 'docs-theming',
  '/docs/motion': 'docs-motion',
  '/docs/components': 'component-dialog',
  '/docs/components/dialog': 'component-dialog',
  '/docs/components/tabs': 'component-tabs',
  '/docs/components/toggle': 'component-toggle',
  '/docs/components/meter': 'component-meter',
  '/docs/components/text-scramble': 'component-text-scramble',
  '/docs/components/scroll-panel': 'component-scroll-panel',
  '/docs/components/chamfer-frame': 'component-chamfer-frame',
  '/docs/components/corner-brackets': 'component-corner-brackets',
  '/docs/components/grid-bg': 'component-grid-bg',
  '/playground': 'playground',
}

export const ROUTE_TO_PATH: Record<Route, string> = {
  landing: '/',
  'docs-getting-started': '/docs/getting-started',
  'docs-theming': '/docs/theming',
  'docs-motion': '/docs/motion',
  'component-dialog': '/docs/components/dialog',
  'component-tabs': '/docs/components/tabs',
  'component-toggle': '/docs/components/toggle',
  'component-meter': '/docs/components/meter',
  'component-text-scramble': '/docs/components/text-scramble',
  'component-scroll-panel': '/docs/components/scroll-panel',
  'component-chamfer-frame': '/docs/components/chamfer-frame',
  'component-corner-brackets': '/docs/components/corner-brackets',
  'component-grid-bg': '/docs/components/grid-bg',
  playground: '/playground',
}

const NAV_EVENT = 'hud-armory:navigate'
const BASE_PREFIX = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')

export function withBase(to: string): string {
  const clean = normalizePath(to)
  if (!BASE_PREFIX) return clean
  return clean === '/' ? `${BASE_PREFIX}/` : `${BASE_PREFIX}${clean}`
}

function stripBase(pathname: string): string {
  if (BASE_PREFIX && pathname.startsWith(BASE_PREFIX)) {
    return normalizePath(pathname.slice(BASE_PREFIX.length) || '/')
  }
  return normalizePath(pathname)
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

function parseLocation(): Route {
  if (typeof window === 'undefined') return 'landing'
  const clean = stripBase(window.location.pathname)
  return PATH_TO_ROUTE[clean] ?? 'landing'
}

export function navigate(to: string) {
  if (typeof window === 'undefined') return
  const target = normalizePath(to)
  const fullTarget = withBase(target)
  if (normalizePath(window.location.pathname) !== normalizePath(fullTarget)) {
    window.history.pushState({}, '', fullTarget)
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
  window.dispatchEvent(new Event(NAV_EVENT))
}

export function useRoute(): { route: Route; pathname: string; navigate: (to: string) => void } {
  const [route, setRoute] = useState<Route>(parseLocation)
  const [pathname, setPathname] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : stripBase(window.location.pathname),
  )

  useEffect(() => {
    const sync = () => {
      setRoute(parseLocation())
      setPathname(stripBase(window.location.pathname))
    }
    window.addEventListener('popstate', sync)
    window.addEventListener(NAV_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(NAV_EVENT, sync)
    }
  }, [])

  const go = useCallback((to: string) => navigate(to), [])
  return { route, pathname, navigate: go }
}

export function isDocsRoute(route: Route): boolean {
  return route.startsWith('docs-') || route.startsWith('component-')
}

export function isComponentRoute(route: Route): boolean {
  return route.startsWith('component-')
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
}

export function Link({ to, onClick, target, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      target === '_blank' ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
  }

  return <a href={withBase(to)} target={target} onClick={handleClick} {...rest} />
}
