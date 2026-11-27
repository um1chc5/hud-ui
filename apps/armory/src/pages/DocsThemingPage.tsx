import {
  ChamferFrame,
  CornerBrackets,
  HUD_CSS_VARS,
  HUD_PALETTES,
  type HudPalette,
} from '@hud-ui/ui'
import type { Appearance } from '../useAppearance'
import { CodeBlock } from '../components/CodeBlock'

type DocsThemingPageProps = {
  appearance: Appearance
  onUpdateAppearance: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void
}

const PALETTE_NOTES: Record<HudPalette, string> = {
  steel: 'Default orbital dark slate with cool ice-blue accents (#7fa7c4).',
  teal: 'Sub-surface tactical cyan on deep sea-green panels (#6fb5a6).',
  thermal: 'High-visibility amber instrumentation on warm obsidian (#ffa526).',
  day: 'Light mode with crisp outlines and zero blur glow (#2b668e).',
}

const CSS_OVERRIDE_SNIPPET = `/* Override any token after importing hud-tokens.css */
:root[data-hud-palette='steel'] {
  --accent: #8cb8ff;
  --hud-chamfer: 12px;
}`

export function DocsThemingPage({ appearance, onUpdateAppearance }: DocsThemingPageProps) {
  return (
    <article className="armory-guide">
      <header className="armory-page-header">
        <div className="armory-eyebrow-row">
          <span className="armory-eyebrow">Guide · 02</span>
        </div>
        <h1>Theming &amp; Palettes</h1>
        <p>
          All colors, typography, chamfer geometry, and motion durations live on <code>:root</code>{' '}
          CSS custom properties controlled by four <code>data-hud-*</code> attributes.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Live Palette Switcher</h2>
        <ChamferFrame className="armory-stage relative">
          <CornerBrackets />
          <div className="flex flex-wrap gap-2">
            {HUD_PALETTES.map((palette) => (
              <button
                key={palette}
                type="button"
                onClick={() => onUpdateAppearance('palette', palette)}
                className={
                  appearance.palette === palette ? 'armory-btn armory-btn-primary' : 'armory-btn'
                }
              >
                {palette}
              </button>
            ))}
          </div>
          <p className="m-0 text-sm text-[var(--muted)]">
            Active: <code>{appearance.palette}</code> — {PALETTE_NOTES[appearance.palette]}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'paper', cssVar: 'var(--paper)' },
              { label: 'sheet-solid', cssVar: 'var(--sheet-solid)' },
              { label: 'accent', cssVar: 'var(--accent)' },
              { label: 'ok', cssVar: 'var(--ok)' },
              { label: 'bad', cssVar: 'var(--bad)' },
              { label: 'mark', cssVar: 'var(--mark)' },
              { label: 'ink', cssVar: 'var(--ink)' },
              { label: 'line', cssVar: 'var(--line)' },
            ].map((swatch) => (
              <div
                key={swatch.label}
                className="flex items-center gap-2.5 border border-[var(--line)] bg-[var(--soft)] p-2"
              >
                <span
                  className="h-6 w-6 shrink-0 border border-[var(--line)]"
                  style={{ backgroundColor: swatch.cssVar }}
                />
                <span className="font-[family-name:var(--hud-font-mono)] text-[11px] text-[var(--ink)]">
                  --{swatch.label}
                </span>
              </div>
            ))}
          </div>
        </ChamferFrame>
      </section>

      <section>
        <h2 className="armory-section-title">Root Attributes</h2>
        <dl className="armory-props">
          <div className="armory-prop-row">
            <dt>data-hud-palette</dt>
            <dd>
              <code>steel</code> (default) · <code>teal</code> · <code>thermal</code> ·{' '}
              <code>day</code>
            </dd>
          </div>
          <div className="armory-prop-row">
            <dt>data-hud-glow</dt>
            <dd>
              <code>on</code> | <code>off</code> — accent borders, active tabs, and meter fills glow
              in dark palettes; <code>day</code> automatically disables blur glow.
            </dd>
          </div>
          <div className="armory-prop-row">
            <dt>data-hud-motion</dt>
            <dd>
              <code>on</code> | <code>off</code> — disables transitions and{' '}
              <code>TextScramble</code> animations when <code>off</code>.
            </dd>
          </div>
          <div className="armory-prop-row">
            <dt>data-hud-grid</dt>
            <dd>
              <code>on</code> | <code>off</code> — toggles the 32px graph grid on <code>body</code>.
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Token Map (HUD_CSS_VARS)</h2>
        <div className="armory-table-wrap">
          <table className="armory-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>CSS Variable</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(HUD_CSS_VARS).map(([key, cssVar]) => (
                <tr key={key}>
                  <td>
                    <code>{key}</code>
                  </td>
                  <td>
                    <code>{cssVar}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Customizing Tokens</h2>
        <CodeBlock code={CSS_OVERRIDE_SNIPPET} title="app.css" lang="css" />
      </section>
    </article>
  )
}
