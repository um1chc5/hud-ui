import { CornerBrackets } from '@hud-ui/ui'
import cornerBracketsSource from '../../../../packages/ui/src/components/hud/CornerBrackets.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { CornerBrackets } from '@/components/hud/CornerBrackets'

export function ReticleCard() {
  return (
    <div className="relative border border-[var(--line)] p-6">
      <CornerBrackets />
      Reticle-framed readout
    </div>
  )
}`

export function CornerBracketsPage() {
  return (
    <ComponentDocShell
      title="CornerBrackets"
      slug="corner-brackets"
      category="HUD Chrome"
      description="Decorative aria-hidden reticle brackets rendered with two pseudo-elements. Place inside any parent with position: relative."
      demo={
        <div className="relative border border-[var(--line)] bg-[var(--soft)] p-6">
          <CornerBrackets />
          <p className="m-0 font-[family-name:var(--hud-font-mono)] text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
            PARENT: POSITION RELATIVE
          </p>
          <p className="m-0 mt-1 text-sm text-[var(--muted)]">
            Top-left and bottom-right 14px accent brackets ignore pointer events and screen readers.
          </p>
        </div>
      }
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/hud/CornerBrackets.tsx', code: cornerBracketsSource }]}
      propsList={[
        {
          name: 'className',
          type: 'string',
          description: 'Optional extra utility classes merged via cn().',
        },
        {
          name: 'style',
          type: 'CSSProperties',
          description: 'Inline style overrides.',
        },
      ]}
      keyboardList={[
        { keys: '—', description: 'Always aria-hidden="true" and pointer-events-none.' },
      ]}
    />
  )
}
