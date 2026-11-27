import { useState } from 'react'
import {
  ChamferFrame,
  CornerBrackets,
  Dialog,
  GridBg,
  Item,
  Meter,
  ScrollPanel,
  SegmentedControl,
  TextScramble,
  Toggle,
  type HudPalette,
} from '@hud-ui/ui'
import { Link, ROUTE_TO_PATH, type Route } from '../useRoute'
import type { Appearance } from '../useAppearance'
import { InstallBar } from '../components/InstallBar'

type LandingPageProps = {
  appearance: Appearance
  onUpdateAppearance: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void
}

type PaletteMeta = {
  id: HudPalette
  name: string
  tagline: string
  paper: string
  sheet: string
  accent: string
  ink: string
}

const PALETTES: PaletteMeta[] = [
  {
    id: 'steel',
    name: 'Steel',
    tagline: 'Default orbital slate',
    paper: '#06090d',
    sheet: '#0e161e',
    accent: '#7fa7c4',
    ink: '#c3d0da',
  },
  {
    id: 'teal',
    name: 'Teal',
    tagline: 'Sub-surface tactical cyan',
    paper: '#050b0b',
    sheet: '#0a1817',
    accent: '#6fb5a6',
    ink: '#bfd6d0',
  },
  {
    id: 'thermal',
    name: 'Thermal',
    tagline: 'Amber optic telemetry',
    paper: '#0d0804',
    sheet: '#1c1107',
    accent: '#ffa526',
    ink: '#ffd9a0',
  },
  {
    id: 'day',
    name: 'Day',
    tagline: 'High-contrast daylight crisp',
    paper: '#e8edf1',
    sheet: '#f7f9fb',
    accent: '#2b668e',
    ink: '#14222d',
  },
]

type CatalogEntry = {
  route: Route
  name: string
  kind: 'UI Primitive' | 'HUD Chrome'
  summary: string
}

const CATALOG: CatalogEntry[] = [
  {
    route: 'component-dialog',
    name: 'Dialog',
    kind: 'UI Primitive',
    summary: 'Accessible modal overlay with focus trap, Esc close, and boot-style reveal.',
  },
  {
    route: 'component-tabs',
    name: 'Tabs',
    kind: 'UI Primitive',
    summary: 'Roving-tabindex tabs & SegmentedControl powered by react-aria.',
  },
  {
    route: 'component-toggle',
    name: 'Toggle',
    kind: 'UI Primitive',
    summary: 'Chamfered ARIA toggle button with crisp pressed accent state.',
  },
  {
    route: 'component-meter',
    name: 'Meter',
    kind: 'UI Primitive',
    summary: 'Scalar telemetry readout in bar, segmented, and ring variants.',
  },
  {
    route: 'component-text-scramble',
    name: 'TextScramble',
    kind: 'UI Primitive',
    summary: 'rAF glyph decoder that preserves screen-reader aria-label and motion opt-out.',
  },
  {
    route: 'component-scroll-panel',
    name: 'ScrollPanel',
    kind: 'UI Primitive',
    summary: 'Keyboard-navigable log & panel container with percentage readout and edge fades.',
  },
  {
    route: 'component-chamfer-frame',
    name: 'ChamferFrame',
    kind: 'HUD Chrome',
    summary: 'Clip-path octagonal container in sm, base, and lg chamfer sizes.',
  },
  {
    route: 'component-corner-brackets',
    name: 'CornerBrackets',
    kind: 'HUD Chrome',
    summary: 'Aria-hidden reticle corners built with two CSS pseudo-elements.',
  },
  {
    route: 'component-grid-bg',
    name: 'GridBg',
    kind: 'HUD Chrome',
    summary: 'Local 32px tactical graph-grid overlay for hero & instrument panels.',
  },
]

export function LandingPage({ appearance, onUpdateAppearance }: LandingPageProps) {
  const [heroScrambleKey, setHeroScrambleKey] = useState(0)
  const [scannerOn, setScannerOn] = useState(true)
  const [shieldBoost, setShieldBoost] = useState(false)
  const [briefingOpen, setBriefingOpen] = useState(false)
  const [sector, setSector] = useState('alpha')

  const signalValue = scannerOn ? 84 : 38
  const shieldValue = shieldBoost ? 96 : 68

  return (
    <div className="armory-landing">
      {/* Hero */}
      <section className="armory-hero" aria-label="Introduction">
        <GridBg />
        <CornerBrackets />
        <div className="armory-hero-grid">
          <div>
            <div className="armory-eyebrow-row">
              <span className="armory-eyebrow">SHADCN-COMPATIBLE REGISTRY</span>
              <span className="armory-dep-tag">React 19 · Tailwind v4 · react-aria</span>
            </div>
            <h1 className="armory-hero-title">
              <TextScramble key={heroScrambleKey} text="TACTICAL HUD UI KIT" duration={850} />
            </h1>
            <p className="armory-hero-lead">
              Ownable source components built for mission dashboards, developer tools, and sci-fi
              interfaces. Four WCAG AA palettes, zero blurry transforms on body text, and
              one-command <code>shadcn</code> registry installs.
            </p>
            <div className="armory-hero-actions">
              <Link to="/docs/getting-started" className="armory-btn armory-btn-primary">
                Get Started
              </Link>
              <Link to="/docs/components/dialog" className="armory-btn">
                Browse Components
              </Link>
              <Link to="/playground" className="armory-btn">
                Open Playground
              </Link>
              <button
                type="button"
                className="armory-btn"
                onClick={() => setHeroScrambleKey((k) => k + 1)}
              >
                Replay Boot
              </button>
            </div>
            <InstallBar slug="hud-theme" />
          </div>

          <ChamferFrame size="lg" className="relative p-5 bg-[var(--soft)]">
            <CornerBrackets />
            <div className="flex items-center justify-between gap-2 mb-4 font-[family-name:var(--hud-font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>LIVE TELEMETRY // {appearance.palette.toUpperCase()}</span>
              <span className="text-[var(--ok)]">LINK NOMINAL</span>
            </div>
            <div className="flex flex-col gap-4">
              <Meter label="Uplink Signal" value={signalValue} />
              <Meter label="Power Cells" value={shieldValue} variant="segments" segments={10} />
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <Meter label="Core Integrity" value={91} variant="ring" />
                <div className="flex flex-wrap gap-2">
                  <Toggle isSelected={scannerOn} onChange={setScannerOn}>
                    Scanner
                  </Toggle>
                  <Toggle isSelected={shieldBoost} onChange={setShieldBoost}>
                    Overdrive
                  </Toggle>
                </div>
              </div>
            </div>
          </ChamferFrame>
        </div>
      </section>

      {/* Interactive Cockpit Bento */}
      <section className="armory-section" aria-labelledby="bento-heading">
        <div className="armory-section-head">
          <div>
            <span className="armory-section-title">Live Composition</span>
            <h2 id="bento-heading">Built Entirely With @hud-ui/ui</h2>
            <p>Interactive primitives composed together — flip switches or open the modal below.</p>
          </div>
          <Link to="/playground" className="armory-btn armory-btn-sm">
            Customize in Playground →
          </Link>
        </div>

        <div className="armory-bento">
          <ChamferFrame className="armory-bento-card relative col-span-12 md:col-span-7">
            <CornerBrackets />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="armory-section-title" style={{ margin: 0 }}>
                Sector Control
              </span>
              <Toggle isSelected={briefingOpen} onChange={setBriefingOpen}>
                {briefingOpen ? 'Close Briefing' : 'Mission Briefing'}
              </Toggle>
            </div>
            <SegmentedControl
              aria-label="Sector telemetry"
              selectedKey={sector}
              onSelectionChange={(k) => setSector(String(k))}
            >
              <Item key="alpha" title="Sector Alpha">
                <div className="flex flex-col gap-3">
                  <p className="m-0 text-sm text-[var(--muted)]">
                    Atmospheric sensors calibrated. Keyboard focus moves cleanly across tabs with{' '}
                    <code>←</code> / <code>→</code>.
                  </p>
                  <Meter label="Orbital Sync" value={88} />
                </div>
              </Item>
              <Item key="bravo" title="Sector Bravo">
                <div className="flex flex-col gap-3">
                  <p className="m-0 text-sm text-[var(--muted)]">
                    Thermal array steady across all four palettes. Glow stays on accents only.
                  </p>
                  <Meter label="Thermal Load" value={54} variant="segments" segments={8} />
                </div>
              </Item>
              <Item key="charlie" title="Sector Charlie">
                <div className="flex flex-col gap-3">
                  <p className="m-0 text-sm text-[var(--muted)]">
                    Zero runtime lock-in: install via <code>shadcn add</code> and own the code.
                  </p>
                  <Meter label="Shield Reserve" value={76} variant="ring" />
                </div>
              </Item>
            </SegmentedControl>
          </ChamferFrame>

          <div className="col-span-12 md:col-span-5">
            <ScrollPanel
              label="Armory event stream"
              kicker="EVENT STREAM"
              style={{ height: 256 }}
              bodyStyle={{ height: 214 }}
            >
              {[
                'Registry manifest compiled — 12 items ready',
                'WCAG AA contrast verified on steel, teal, thermal, day',
                'react-aria focus trap active on Dialog overlay',
                'Motion guard listening to prefers-reduced-motion',
                'Chamfer polygons routed through --hud-chamfer-polygon',
                'Tab roving tabindex bound to ArrowLeft / ArrowRight',
                'TextScramble aria-label locked to settled string',
                'Keyboard scroll active on ScrollPanel region',
                'Tailwind v4 @theme variables synced with tokens.css',
              ].map((line, idx) => (
                <p
                  key={idx}
                  className="m-0 mb-2 font-[family-name:var(--hud-font-mono)] text-xs text-[var(--ink)]"
                >
                  <span className="text-[var(--accent)]">[{String(idx + 1).padStart(2, '0')}]</span>{' '}
                  {line}
                </p>
              ))}
            </ScrollPanel>
          </div>
        </div>

        <Dialog isOpen={briefingOpen} onOpenChange={setBriefingOpen} title="Mission Briefing">
          <p className="m-0 text-sm text-[var(--ink)]">
            This dialog uses <code>react-aria</code> overlays for focus containment, scroll lock,
            and <code>Esc</code> dismissal, styled with <code>CornerBrackets</code> and{' '}
            <code>clip-path</code> boot motion.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Toggle isSelected={false} onChange={() => setBriefingOpen(false)}>
              Acknowledge
            </Toggle>
          </div>
        </Dialog>
      </section>

      {/* Interactive Palette Switcher */}
      <section className="armory-section" aria-labelledby="palettes-heading">
        <div className="armory-section-head">
          <div>
            <span className="armory-section-title">Theming</span>
            <h2 id="palettes-heading">Four Calibrated Palettes</h2>
            <p>Click any palette card to live-theme the entire product site immediately.</p>
          </div>
          <Link to="/docs/theming" className="armory-btn armory-btn-sm">
            Token Reference →
          </Link>
        </div>

        <div className="armory-palette-grid">
          {PALETTES.map((p) => {
            const active = appearance.palette === p.id
            return (
              <button
                key={p.id}
                type="button"
                className="armory-palette-card"
                data-active={active ? 'true' : 'false'}
                onClick={() => onUpdateAppearance('palette', p.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-[family-name:var(--hud-font-display)] text-base font-semibold uppercase tracking-[0.06em] text-[var(--ink)]">
                    {p.name}
                  </span>
                  <span className="font-[family-name:var(--hud-font-mono)] text-[10.5px] uppercase text-[var(--accent)]">
                    {active ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
                <p className="m-0 text-xs text-[var(--muted)]">{p.tagline}</p>
                <div className="flex gap-1.5 pt-1" aria-hidden="true">
                  {[p.paper, p.sheet, p.accent, p.ink].map((hex) => (
                    <span
                      key={hex}
                      className="h-4 flex-1 border border-[var(--line)]"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Architecture Pillars */}
      <section className="armory-section" aria-labelledby="pillars-heading">
        <div className="armory-section-head">
          <div>
            <span className="armory-section-title">Engineering Rules</span>
            <h2 id="pillars-heading">Designed For Real Apps</h2>
          </div>
        </div>
        <div className="armory-catalog-grid">
          <div className="armory-catalog-card">
            <div>
              <span className="armory-eyebrow">01 · OWNABLE SOURCE</span>
              <h3>Shadcn Registry DX</h3>
              <p>
                Install individual primitives via <code>@hud/&lt;component&gt;</code> or copy files
                directly. No opaque package upgrades or runtime style lock-in.
              </p>
            </div>
          </div>
          <div className="armory-catalog-card">
            <div>
              <span className="armory-eyebrow">02 · SHARP TEXT</span>
              <h3>Strict Motion Discipline</h3>
              <p>
                Animations use only <code>opacity</code>, <code>clip-path</code>, and{' '}
                <code>translate</code> — never <code>scale</code> or <code>translateZ</code> over
                body copy — plus automatic <code>prefers-reduced-motion</code> support.
              </p>
            </div>
          </div>
          <div className="armory-catalog-card">
            <div>
              <span className="armory-eyebrow">03 · ACCESSIBLE</span>
              <h3>Keyboard &amp; WCAG AA</h3>
              <p>
                Interactive widgets wrap <code>react-aria</code> focus traps and roving tabindex,
                with verified WCAG AA text contrast across dark and daylight palettes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component Catalog */}
      <section className="armory-section" aria-labelledby="catalog-heading">
        <div className="armory-section-head">
          <div>
            <span className="armory-section-title">Catalog</span>
            <h2 id="catalog-heading">9 Components Ready To Install</h2>
            <p>
              Each doc page includes CLI install tabs, live preview, full source, and keyboard
              specs.
            </p>
          </div>
        </div>
        <div className="armory-catalog-grid">
          {CATALOG.map((item) => (
            <Link key={item.route} to={ROUTE_TO_PATH[item.route]} className="armory-catalog-card">
              <div>
                <span className="armory-eyebrow">{item.kind}</span>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </div>
              <span className="font-[family-name:var(--hud-font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]">
                Open Docs →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
