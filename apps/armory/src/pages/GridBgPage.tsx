import { CornerBrackets, GridBg } from '@hud-ui/ui'
import gridBgSource from '../../../../packages/ui/src/components/hud/GridBg.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { GridBg } from '@/components/hud/GridBg'

export function TacticalPanel() {
  return (
    <section className="relative overflow-hidden border border-[var(--line)] p-8">
      <GridBg />
      <div className="relative z-10">Foreground content</div>
    </section>
  )
}`

export function GridBgPage() {
  return (
    <ComponentDocShell
      title="GridBg"
      slug="grid-bg"
      category="HUD Chrome"
      description="Local 32px graph-grid backdrop using --grid-color. Prefer <html data-hud-grid='on'> for full-page grids; use GridBg inside isolated cards or hero sections."
      demo={
        <div className="relative h-44 overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-6">
          <GridBg />
          <CornerBrackets />
          <div className="relative z-10">
            <span className="armory-eyebrow">LOCAL 32PX GRID</span>
            <p className="m-0 mt-2 text-sm text-[var(--ink)]">
              Adapts automatically to steel, teal, thermal, and day palettes.
            </p>
          </div>
        </div>
      }
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/hud/GridBg.tsx', code: gridBgSource }]}
      propsList={[
        {
          name: 'className',
          type: 'string',
          description: 'Optional classes to customize background positioning or opacity.',
        },
        {
          name: 'style',
          type: 'CSSProperties',
          description: 'Override backgroundSize or grid gradients.',
        },
      ]}
      keyboardList={[{ keys: '—', description: 'Decorative backdrop; always aria-hidden="true".' }]}
    />
  )
}
