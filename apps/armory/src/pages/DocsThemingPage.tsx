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

type ContrastRow = {
  pair: string
  ratio: string
  level: 'AAA' | 'AA' | 'AA-Large / UI' | 'Hairline'
}

const CONTRAST_BY_PALETTE: Record<HudPalette, ContrastRow[]> = {
  steel: [
    { pair: '--ink on --paper / --sheet-solid', ratio: '12.69:1 / 11.59:1', level: 'AAA' },
    { pair: '--muted on --paper / --sheet-solid', ratio: '6.77:1 / 6.18:1', level: 'AA' },
    { pair: '--accent on --sheet-solid', ratio: '7.14:1', level: 'AAA' },
    { pair: '--on-accent on --accent', ratio: '7.74:1', level: 'AAA' },
    {
      pair: '--ok / --bad / --mark on --sheet-solid',
      ratio: '9.11:1 / 5.07:1 / 9.06:1',
      level: 'AA',
    },
    {
      pair: '--accent-d on --sheet-solid (interactive border)',
      ratio: '3.61:1',
      level: 'AA-Large / UI',
    },
  ],
  teal: [
    { pair: '--ink on --paper / --sheet-solid', ratio: '12.98:1 / 11.89:1', level: 'AAA' },
    { pair: '--muted on --paper / --sheet-solid', ratio: '6.62:1 / 6.06:1', level: 'AA' },
    { pair: '--accent on --sheet-solid', ratio: '7.64:1', level: 'AAA' },
    { pair: '--on-accent on --accent', ratio: '8.09:1', level: 'AAA' },
    {
      pair: '--ok / --bad / --mark on --sheet-solid',
      ratio: '10.00:1 / 5.24:1 / 9.29:1',
      level: 'AA',
    },
    {
      pair: '--accent-d on --sheet-solid (interactive border)',
      ratio: '3.87:1',
      level: 'AA-Large / UI',
    },
  ],
  thermal: [
    { pair: '--ink on --paper / --sheet-solid', ratio: '14.89:1 / 13.85:1', level: 'AAA' },
    { pair: '--muted on --paper / --sheet-solid', ratio: '6.79:1 / 6.32:1', level: 'AA' },
    { pair: '--accent on --sheet-solid', ratio: '9.41:1', level: 'AAA' },
    { pair: '--on-accent on --accent', ratio: '9.63:1', level: 'AAA' },
    {
      pair: '--ok / --bad / --mark on --sheet-solid',
      ratio: '11.12:1 / 5.61:1 / 12.84:1',
      level: 'AA',
    },
    {
      pair: '--accent-d on --sheet-solid (interactive border)',
      ratio: '4.51:1',
      level: 'AA' as 'AA',
    },
  ],
  day: [
    { pair: '--ink on --paper / --sheet-solid', ratio: '13.74:1 / 15.35:1', level: 'AAA' },
    { pair: '--muted on --paper / --sheet-solid', ratio: '5.22:1 / 5.83:1', level: 'AA' },
    { pair: '--accent on --sheet-solid', ratio: '5.86:1', level: 'AA' },
    { pair: '--on-accent on --accent', ratio: '6.19:1', level: 'AA' },
    {
      pair: '--ok / --bad / --mark on --sheet-solid',
      ratio: '5.94:1 / 6.10:1 / 6.33:1',
      level: 'AA',
    },
    { pair: '--accent-d on --sheet-solid (interactive border)', ratio: '9.02:1', level: 'AAA' },
  ],
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
        <h2 className="armory-section-title">
          WCAG 2.1 Contrast Verification ({appearance.palette})
        </h2>
        <div className="armory-table-wrap">
          <table className="armory-table">
            <thead>
              <tr>
                <th>Token Pair</th>
                <th>Ratio</th>
                <th>Standard</th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST_BY_PALETTE[appearance.palette].map((row) => (
                <tr key={row.pair}>
                  <td>
                    <code>{row.pair}</code>
                  </td>
                  <td>
                    <code>{row.ratio}</code>
                  </td>
                  <td>
                    <span className="armory-eyebrow">{row.level}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">
          Note: structural hairline dividers (<code>--line</code>) sit around 1.54:1–1.95:1
          intentionally; interactive hover/focus states use <code>--accent-d</code> /{' '}
          <code>--accent</code> (≥ 3.6:1).
        </p>
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
