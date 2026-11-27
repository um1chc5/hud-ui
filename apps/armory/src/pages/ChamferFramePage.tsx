import { ChamferFrame, CornerBrackets } from '@hud-ui/ui'
import chamferSource from '../../../../packages/ui/src/components/hud/ChamferFrame.tsx?raw'
import { ComponentDocShell } from '../components/ComponentDocShell'

const USAGE_CODE = `import { ChamferFrame } from '@/components/hud/ChamferFrame'

export function TelemetryContainer() {
  return (
    <ChamferFrame size="lg" className="p-6">
      Octagonal clip-path surface without transform blur.
    </ChamferFrame>
  )
}`

export function ChamferFramePage() {
  return (
    <ComponentDocShell
      title="ChamferFrame"
      slug="chamfer-frame"
      category="HUD Chrome"
      description="Chamfered panel surface using CSS clip-path polygons only—never transform—so inner body copy stays sharp in every palette."
      demo={
        <div className="grid sm:grid-cols-3 gap-4">
          {(['sm', 'base', 'lg'] as const).map((size) => (
            <ChamferFrame key={size} size={size} className="relative p-5 bg-[var(--soft)]">
              <CornerBrackets />
              <div className="font-[family-name:var(--hud-font-mono)] text-xs uppercase text-[var(--accent)]">
                size=&quot;{size}&quot;
              </div>
              <p className="m-0 mt-1 text-sm text-[var(--muted)]">
                Clip-path corner cut ({size === 'sm' ? '6px' : size === 'base' ? '10px' : '14px'}).
              </p>
            </ChamferFrame>
          ))}
        </div>
      }
      usageCode={USAGE_CODE}
      sources={[{ filename: 'components/hud/ChamferFrame.tsx', code: chamferSource }]}
      propsList={[
        {
          name: 'size',
          type: "'sm' | 'base' | 'lg'",
          defaultValue: "'base'",
          description: 'Controls the --hud-chamfer corner cut size (6px, 10px, or 14px).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Merged via cn() onto the outer div.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Panel content.',
        },
      ]}
      keyboardList={[{ keys: '—', description: 'Purely presentational surface wrapper.' }]}
    />
  )
}
