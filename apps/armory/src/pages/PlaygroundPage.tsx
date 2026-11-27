import { useState } from 'react'
import {
  ChamferFrame,
  CornerBrackets,
  Dialog,
  GridBg,
  HUD_PALETTES,
  Item,
  Meter,
  ScrollPanel,
  Tabs,
  TextScramble,
  Toggle,
  type ChamferSize,
  type HudPalette,
  type MeterVariant,
} from '@hud-ui/ui'
import type { Appearance } from '../useAppearance'
import { CodeBlock } from '../components/CodeBlock'

type PlaygroundPageProps = {
  appearance: Appearance
  onUpdateAppearance: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void
}

type PresetId = 'telemetry' | 'scramble' | 'dialog'

export function PlaygroundPage({ appearance, onUpdateAppearance }: PlaygroundPageProps) {
  const [preset, setPreset] = useState<PresetId>('telemetry')
  const [chamferSize, setChamferSize] = useState<ChamferSize>('base')
  const [showBrackets, setShowBrackets] = useState(true)
  const [showLocalGrid, setShowLocalGrid] = useState(true)

  // Telemetry state
  const [meterValue, setMeterValue] = useState(74)
  const [meterVariant, setMeterVariant] = useState<MeterVariant>('segments')
  const [meterSegments, setMeterSegments] = useState(10)
  const [meterLabel, setMeterLabel] = useState('SIGNAL')

  // Scramble state
  const [scrambleText, setScrambleText] = useState('ARMORY // ONLINE')
  const [scrambleDuration, setScrambleDuration] = useState(850)
  const [scrambleKey, setScrambleKey] = useState(0)

  // Dialog state
  const [dialogTitle, setDialogTitle] = useState('MISSION BRIEFING')
  const [dialogDismissable, setDialogDismissable] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  const htmlAttrsSnippet = `<html
  lang="en"
  data-hud-palette="${appearance.palette}"
  data-hud-glow="${appearance.glow}"
  data-hud-motion="${appearance.motion}"
  data-hud-grid="${appearance.grid}"
>`

  const jsxSnippet = buildJsxSnippet({
    preset,
    chamferSize,
    showBrackets,
    showLocalGrid,
    meterValue,
    meterVariant,
    meterSegments,
    meterLabel,
    scrambleText,
    scrambleDuration,
    dialogTitle,
    dialogDismissable,
  })

  return (
    <div className="armory-playground">
      <header className="armory-page-header">
        <div className="armory-eyebrow-row">
          <span className="armory-eyebrow">Interactive Studio</span>
          <span className="armory-dep-tag">Live Props + Appearance Tokens</span>
        </div>
        <h1>Playground</h1>
        <p>
          Configure components and root <code>data-hud-*</code> attributes in real time, then copy
          the exact JSX and HTML setup into your app.
        </p>
      </header>

      <div className="armory-playground-grid">
        {/* Live Canvas */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="armory-section-title" style={{ margin: 0 }}>
              Live Canvas
            </span>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'telemetry', label: 'Meter + Panel' },
                  { id: 'scramble', label: 'TextScramble' },
                  { id: 'dialog', label: 'Dialog + Frame' },
                ] as const
              ).map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setPreset(entry.id)}
                  className={
                    preset === entry.id
                      ? 'armory-btn armory-btn-sm armory-btn-primary'
                      : 'armory-btn armory-btn-sm'
                  }
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>

          <ChamferFrame size={chamferSize} className="relative overflow-hidden p-6 min-h-[280px]">
            {showLocalGrid ? <GridBg /> : null}
            {showBrackets ? <CornerBrackets /> : null}
            <div className="relative z-10 flex flex-col gap-4">
              {preset === 'telemetry' ? (
                <>
                  <Meter
                    label={meterLabel || 'SIGNAL'}
                    value={meterValue}
                    variant={meterVariant}
                    segments={meterSegments}
                  />
                  <ScrollPanel
                    label="Live telemetry feed"
                    kicker="STREAM"
                    style={{ height: 150 }}
                    bodyStyle={{ height: 112 }}
                  >
                    <p className="m-0 mb-1.5 text-xs">
                      [01] Palette active: <code>{appearance.palette}</code>
                    </p>
                    <p className="m-0 mb-1.5 text-xs">
                      [02] Meter variant: <code>{meterVariant}</code> ({meterValue}%)
                    </p>
                    <p className="m-0 mb-1.5 text-xs">
                      [03] Chamfer cut: <code>{chamferSize}</code>
                    </p>
                    <p className="m-0 mb-1.5 text-xs">
                      [04] Glow: <code>{appearance.glow}</code> · Motion:{' '}
                      <code>{appearance.motion}</code>
                    </p>
                  </ScrollPanel>
                </>
              ) : null}

              {preset === 'scramble' ? (
                <div className="flex flex-col gap-4 py-4">
                  <div className="font-[family-name:var(--hud-font-mono)] text-2xl">
                    <TextScramble
                      key={scrambleKey}
                      text={scrambleText || 'ARMORY // ONLINE'}
                      duration={scrambleDuration}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="armory-btn armory-btn-primary"
                      onClick={() => setScrambleKey((k) => k + 1)}
                    >
                      Replay Scramble
                    </button>
                  </div>
                </div>
              ) : null}

              {preset === 'dialog' ? (
                <div className="flex flex-col gap-4 py-4">
                  <p className="m-0 text-sm text-[var(--muted)]">
                    Launch the modal inside this chamfered container to inspect focus trapping,
                    scrim dimming, and corner-bracket framing.
                  </p>
                  <div>
                    <Toggle isSelected={dialogOpen} onChange={setDialogOpen}>
                      {dialogOpen ? 'Close Dialog' : 'Open Dialog'}
                    </Toggle>
                  </div>
                  <Dialog
                    isOpen={dialogOpen}
                    onOpenChange={setDialogOpen}
                    title={dialogTitle || 'MISSION BRIEFING'}
                    isDismissable={dialogDismissable}
                  >
                    <p className="m-0 text-sm">
                      Dialog active under <code>{appearance.palette}</code> palette. Press{' '}
                      <code>Esc</code> or toggle below to close.
                    </p>
                    <div className="flex justify-end pt-2">
                      <Toggle isSelected={false} onChange={() => setDialogOpen(false)}>
                        Confirm
                      </Toggle>
                    </div>
                  </Dialog>
                </div>
              ) : null}
            </div>
          </ChamferFrame>

          <Tabs aria-label="Generated code" defaultSelectedKey="jsx">
            <Item key="jsx" title="Generated JSX">
              <CodeBlock code={jsxSnippet} title="PlaygroundSnippet.tsx" lang="tsx" />
            </Item>
            <Item key="html" title="HTML Root Attrs">
              <CodeBlock code={htmlAttrsSnippet} title="index.html" lang="html" />
            </Item>
          </Tabs>
        </div>

        {/* Control Panel */}
        <ChamferFrame className="relative p-5 bg-[var(--sheet-solid)]">
          <CornerBrackets />
          <h2 className="armory-section-title">Appearance &amp; Props</h2>

          <div className="armory-controls-grid mb-5">
            <label className="armory-field">
              <span>Palette</span>
              <select
                className="armory-select"
                value={appearance.palette}
                onChange={(e) => onUpdateAppearance('palette', e.target.value as HudPalette)}
              >
                {HUD_PALETTES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <label className="armory-field">
              <span>Glow</span>
              <select
                className="armory-select"
                value={appearance.glow}
                onChange={(e) => onUpdateAppearance('glow', e.target.value as 'on' | 'off')}
              >
                <option value="on">on</option>
                <option value="off">off</option>
              </select>
            </label>

            <label className="armory-field">
              <span>Motion</span>
              <select
                className="armory-select"
                value={appearance.motion}
                onChange={(e) => onUpdateAppearance('motion', e.target.value as 'on' | 'off')}
              >
                <option value="on">on</option>
                <option value="off">off</option>
              </select>
            </label>

            <label className="armory-field">
              <span>Chamfer Size</span>
              <select
                className="armory-select"
                value={chamferSize}
                onChange={(e) => setChamferSize(e.target.value as ChamferSize)}
              >
                <option value="sm">sm</option>
                <option value="base">base</option>
                <option value="lg">lg</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <Toggle isSelected={showBrackets} onChange={setShowBrackets}>
              CornerBrackets
            </Toggle>
            <Toggle isSelected={showLocalGrid} onChange={setShowLocalGrid}>
              GridBg
            </Toggle>
          </div>

          {preset === 'telemetry' ? (
            <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-4">
              <label className="armory-field">
                <span>Meter Label</span>
                <input
                  type="text"
                  className="armory-input"
                  value={meterLabel}
                  onChange={(e) => setMeterLabel(e.target.value)}
                />
              </label>
              <label className="armory-field">
                <span>Variant</span>
                <select
                  className="armory-select"
                  value={meterVariant}
                  onChange={(e) => setMeterVariant(e.target.value as MeterVariant)}
                >
                  <option value="bar">bar</option>
                  <option value="segments">segments</option>
                  <option value="ring">ring</option>
                </select>
              </label>
              <label className="armory-field">
                <span>Value ({meterValue}%)</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="armory-range"
                  value={meterValue}
                  onChange={(e) => setMeterValue(Number(e.target.value))}
                />
              </label>
              {meterVariant === 'segments' ? (
                <label className="armory-field">
                  <span>Segments ({meterSegments})</span>
                  <input
                    type="range"
                    min={4}
                    max={16}
                    className="armory-range"
                    value={meterSegments}
                    onChange={(e) => setMeterSegments(Number(e.target.value))}
                  />
                </label>
              ) : null}
            </div>
          ) : null}

          {preset === 'scramble' ? (
            <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-4">
              <label className="armory-field">
                <span>Text</span>
                <input
                  type="text"
                  className="armory-input"
                  value={scrambleText}
                  onChange={(e) => setScrambleText(e.target.value)}
                />
              </label>
              <label className="armory-field">
                <span>Duration ({scrambleDuration}ms)</span>
                <input
                  type="range"
                  min={200}
                  max={2000}
                  step={50}
                  className="armory-range"
                  value={scrambleDuration}
                  onChange={(e) => setScrambleDuration(Number(e.target.value))}
                />
              </label>
            </div>
          ) : null}

          {preset === 'dialog' ? (
            <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-4">
              <label className="armory-field">
                <span>Dialog Title</span>
                <input
                  type="text"
                  className="armory-input"
                  value={dialogTitle}
                  onChange={(e) => setDialogTitle(e.target.value)}
                />
              </label>
              <Toggle isSelected={dialogDismissable} onChange={setDialogDismissable}>
                isDismissable
              </Toggle>
            </div>
          ) : null}
        </ChamferFrame>
      </div>
    </div>
  )
}

function buildJsxSnippet(opts: {
  preset: PresetId
  chamferSize: ChamferSize
  showBrackets: boolean
  showLocalGrid: boolean
  meterValue: number
  meterVariant: MeterVariant
  meterSegments: number
  meterLabel: string
  scrambleText: string
  scrambleDuration: number
  dialogTitle: string
  dialogDismissable: boolean
}): string {
  const frameOpen = `<ChamferFrame size="${opts.chamferSize}" className="relative overflow-hidden p-6">`
  const layers = [
    opts.showLocalGrid ? '  <GridBg />' : null,
    opts.showBrackets ? '  <CornerBrackets />' : null,
  ]
    .filter(Boolean)
    .join('\n')

  if (opts.preset === 'telemetry') {
    const segAttr = opts.meterVariant === 'segments' ? ` segments={${opts.meterSegments}}` : ''
    return `${frameOpen}
${layers ? layers + '\n' : ''}  <Meter label="${opts.meterLabel}" value={${opts.meterValue}} variant="${opts.meterVariant}"${segAttr} />
</ChamferFrame>`
  }

  if (opts.preset === 'scramble') {
    return `${frameOpen}
${layers ? layers + '\n' : ''}  <TextScramble text="${opts.scrambleText}" duration={${opts.scrambleDuration}} />
</ChamferFrame>`
  }

  return `${frameOpen}
${layers ? layers + '\n' : ''}  <Dialog isOpen={open} onOpenChange={setOpen} title="${opts.dialogTitle}" isDismissable={${opts.dialogDismissable}}>
    <p>Telemetry confirmed.</p>
  </Dialog>
</ChamferFrame>`
}
