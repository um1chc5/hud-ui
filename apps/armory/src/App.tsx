import { useAppearance } from './useAppearance'
import { useHashRoute, type Route } from './useHashRoute'
import { HUD_PALETTES, type HudPalette } from '@hud-ui/tokens'
import { HomePage } from './pages/HomePage'
import { DialogPage } from './pages/DialogPage'
import { TabsPage } from './pages/TabsPage'
import { TogglePage } from './pages/TogglePage'
import { MeterPage } from './pages/MeterPage'
import { TextScramblePage } from './pages/TextScramblePage'
import { ScrollPanelPage } from './pages/ScrollPanelPage'

type NavEntry = { route: Route; label: string }

const NAV: NavEntry[] = [
  { route: 'home', label: 'Home' },
  { route: 'dialog', label: 'Dialog' },
  { route: 'tabs', label: 'Tabs' },
  { route: 'toggle', label: 'Toggle' },
  { route: 'meter', label: 'Meter' },
  { route: 'text-scramble', label: 'TextScramble' },
  { route: 'scroll-panel', label: 'ScrollPanel' },
]

export function App() {
  const { appearance, update } = useAppearance()
  const route = useHashRoute()

  return (
    <div className="armory">
      <header className="armory-topbar">
        <span className="armory-brand">hud-ui · armory</span>
        <div className="armory-toggles" role="group" aria-label="Appearance">
          <label>
            skin
            <select
              value={appearance.skin}
              onChange={(e) => update('skin', e.target.value as 'hud' | 'plain')}
            >
              <option value="hud">hud</option>
              <option value="plain">plain</option>
            </select>
          </label>
          <label>
            palette
            <select
              value={appearance.palette}
              onChange={(e) => update('palette', e.target.value as typeof appearance.palette)}
              disabled={appearance.skin !== 'hud'}
            >
              {HUD_PALETTES.map((p: HudPalette) => (
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
        </div>
      </header>

      <nav className="armory-nav" aria-label="Component index">
        <h3>Components</h3>
        {NAV.map((item) => (
          <a
            key={item.route}
            href={`#/${item.route === 'home' ? '' : item.route}`}
            aria-current={route === item.route ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main className="armory-main">
        {route === 'home' && <HomePage />}
        {route === 'dialog' && <DialogPage />}
        {route === 'tabs' && <TabsPage />}
        {route === 'toggle' && <TogglePage />}
        {route === 'meter' && <MeterPage />}
        {route === 'text-scramble' && <TextScramblePage />}
        {route === 'scroll-panel' && <ScrollPanelPage />}
      </main>
    </div>
  )
}
