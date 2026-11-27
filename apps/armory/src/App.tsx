import { HUD_PALETTES, type HudPalette } from '@hud-ui/ui'
import { getRegistryItemUrl } from './lib/registry'
import { useAppearance } from './useAppearance'
import {
  isComponentRoute,
  isDocsRoute,
  Link,
  ROUTE_TO_PATH,
  useRoute,
  type Route,
} from './useRoute'
import { LandingPage } from './pages/LandingPage'
import { DocsGettingStartedPage } from './pages/DocsGettingStartedPage'
import { DocsThemingPage } from './pages/DocsThemingPage'
import { DocsMotionPage } from './pages/DocsMotionPage'
import { DialogPage } from './pages/DialogPage'
import { TabsPage } from './pages/TabsPage'
import { TogglePage } from './pages/TogglePage'
import { MeterPage } from './pages/MeterPage'
import { TextScramblePage } from './pages/TextScramblePage'
import { ScrollPanelPage } from './pages/ScrollPanelPage'
import { ChamferFramePage } from './pages/ChamferFramePage'
import { CornerBracketsPage } from './pages/CornerBracketsPage'
import { GridBgPage } from './pages/GridBgPage'
import { PlaygroundPage } from './pages/PlaygroundPage'

type NavEntry = { route: Route; label: string }

const GUIDE_NAV: NavEntry[] = [
  { route: 'docs-getting-started', label: 'Getting Started' },
  { route: 'docs-theming', label: 'Theming & Palettes' },
  { route: 'docs-motion', label: 'Motion & A11y' },
]

const UI_NAV: NavEntry[] = [
  { route: 'component-dialog', label: 'Dialog' },
  { route: 'component-tabs', label: 'Tabs' },
  { route: 'component-toggle', label: 'Toggle' },
  { route: 'component-meter', label: 'Meter' },
  { route: 'component-text-scramble', label: 'TextScramble' },
  { route: 'component-scroll-panel', label: 'ScrollPanel' },
]

const HUD_NAV: NavEntry[] = [
  { route: 'component-chamfer-frame', label: 'ChamferFrame' },
  { route: 'component-corner-brackets', label: 'CornerBrackets' },
  { route: 'component-grid-bg', label: 'GridBg' },
]

export function App() {
  const { appearance, update } = useAppearance()
  const { route } = useRoute()
  const showSidebar = isDocsRoute(route)

  return (
    <div className="armory-shell" data-layout={showSidebar ? 'docs' : 'wide'}>
      <header className="armory-topbar">
        <div className="armory-topbar-left">
          <Link to="/" className="armory-brand">
            <span className="armory-brand-dot" aria-hidden="true" />
            HUD-UI
          </Link>
          <nav className="armory-topnav" aria-label="Primary">
            <Link to="/" aria-current={route === 'landing' ? 'page' : undefined}>
              Overview
            </Link>
            <Link
              to="/docs/getting-started"
              aria-current={route.startsWith('docs-') ? 'page' : undefined}
            >
              Docs
            </Link>
            <Link
              to="/docs/components/dialog"
              aria-current={isComponentRoute(route) ? 'page' : undefined}
            >
              Components
            </Link>
            <Link to="/playground" aria-current={route === 'playground' ? 'page' : undefined}>
              Playground
            </Link>
          </nav>
        </div>

        <div className="armory-toggles" role="group" aria-label="Appearance">
          <label>
            palette
            <select
              value={appearance.palette}
              onChange={(e) => update('palette', e.target.value as HudPalette)}
            >
              {HUD_PALETTES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label>
            glow
            <select
              value={appearance.glow}
              onChange={(e) => update('glow', e.target.value as 'on' | 'off')}
            >
              <option value="on">on</option>
              <option value="off">off</option>
            </select>
          </label>
          <label>
            motion
            <select
              value={appearance.motion}
              onChange={(e) => update('motion', e.target.value as 'on' | 'off')}
            >
              <option value="on">on</option>
              <option value="off">off</option>
            </select>
          </label>
          <label>
            grid
            <select
              value={appearance.grid}
              onChange={(e) => update('grid', e.target.value as 'on' | 'off')}
            >
              <option value="on">on</option>
              <option value="off">off</option>
            </select>
          </label>
        </div>
      </header>

      {showSidebar ? (
        <div className="armory-docs-layout">
          <aside className="armory-sidebar" aria-label="Documentation">
            <NavGroup title="Guides" items={GUIDE_NAV} current={route} />
            <NavGroup title="UI Components" items={UI_NAV} current={route} />
            <NavGroup title="HUD Chrome" items={HUD_NAV} current={route} />
          </aside>
          <main className="armory-docs-main">{renderRoute(route, appearance, update)}</main>
        </div>
      ) : (
        <main className="armory-wide-main">{renderRoute(route, appearance, update)}</main>
      )}

      <footer className="armory-footer">
        <div className="armory-footer-inner">
          <div className="armory-footer-left">
            <span className="armory-brand">HUD-UI // ARMORY</span>
            <span className="armory-footer-meta">
              Ownable React 19 + Tailwind v4 + react-aria HUD kit
            </span>
          </div>
          <div className="armory-footer-links">
            <Link to="/docs/getting-started">Docs</Link>
            <Link to="/docs/components/dialog">Components</Link>
            <Link to="/playground">Playground</Link>
            <a href={getRegistryItemUrl('registry')} target="_blank" rel="noreferrer">
              Registry JSON ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavGroup({ title, items, current }: { title: string; items: NavEntry[]; current: Route }) {
  return (
    <div className="armory-nav-group">
      <h3>{title}</h3>
      {items.map((item) => (
        <Link
          key={item.route}
          to={ROUTE_TO_PATH[item.route]}
          aria-current={current === item.route ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function renderRoute(
  route: Route,
  appearance: ReturnType<typeof useAppearance>['appearance'],
  update: ReturnType<typeof useAppearance>['update'],
) {
  switch (route) {
    case 'landing':
      return <LandingPage appearance={appearance} onUpdateAppearance={update} />
    case 'docs-getting-started':
      return <DocsGettingStartedPage />
    case 'docs-theming':
      return <DocsThemingPage appearance={appearance} onUpdateAppearance={update} />
    case 'docs-motion':
      return <DocsMotionPage appearance={appearance} onUpdateAppearance={update} />
    case 'component-dialog':
      return <DialogPage />
    case 'component-tabs':
      return <TabsPage />
    case 'component-toggle':
      return <TogglePage />
    case 'component-meter':
      return <MeterPage />
    case 'component-text-scramble':
      return <TextScramblePage />
    case 'component-scroll-panel':
      return <ScrollPanelPage />
    case 'component-chamfer-frame':
      return <ChamferFramePage />
    case 'component-corner-brackets':
      return <CornerBracketsPage />
    case 'component-grid-bg':
      return <GridBgPage />
    case 'playground':
      return <PlaygroundPage appearance={appearance} onUpdateAppearance={update} />
  }
}
