import { useState } from 'react'
import { ChamferFrame, CornerBrackets, TextScramble, Toggle } from '@hud-ui/ui'
import type { Appearance } from '../useAppearance'

type DocsMotionPageProps = {
  appearance: Appearance
  onUpdateAppearance: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void
}

export function DocsMotionPage({ appearance, onUpdateAppearance }: DocsMotionPageProps) {
  const [scrambleKey, setScrambleKey] = useState(0)

  return (
    <article className="armory-guide">
      <header className="armory-page-header">
        <div className="armory-eyebrow-row">
          <span className="armory-eyebrow">Guide · 03</span>
        </div>
        <h1>Motion &amp; Accessibility</h1>
        <p>
          Every component follows strict rendering and accessibility invariants so text stays
          razor-sharp and keyboard users never get trapped.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Interactive Motion Test</h2>
        <ChamferFrame className="armory-stage relative">
          <CornerBrackets />
          <div className="flex flex-wrap items-center gap-3">
            <Toggle
              isSelected={appearance.motion === 'on'}
              onChange={(on) => onUpdateAppearance('motion', on ? 'on' : 'off')}
            >
              data-hud-motion=&quot;{appearance.motion}&quot;
            </Toggle>
            <button
              type="button"
              className="armory-btn"
              onClick={() => setScrambleKey((k) => k + 1)}
            >
              Test TextScramble
            </button>
          </div>
          <div className="pt-1 font-[family-name:var(--hud-font-mono)] text-lg">
            <TextScramble key={scrambleKey} text="MOTION CHECK // SHARP TEXT" duration={900} />
          </div>
        </ChamferFrame>
      </section>

      <section>
        <h2 className="armory-section-title">Motion Invariants</h2>
        <dl className="armory-props">
          <div className="armory-prop-row">
            <dt>Allowed properties</dt>
            <dd>
              Animate with <code>opacity</code>, <code>clip-path</code>, and the individual{' '}
              <code>translate</code> property only.
            </dd>
          </div>
          <div className="armory-prop-row">
            <dt>No blurry text</dt>
            <dd>
              Never apply CSS <code>transform</code>, <code>translateZ</code>, or <code>scale</code>{' '}
              to layers containing body text.
            </dd>
          </div>
          <div className="armory-prop-row">
            <dt>Reduced motion</dt>
            <dd>
              Honours both OS <code>prefers-reduced-motion: reduce</code> and{' '}
              <code>&lt;html data-hud-motion=&quot;off&quot;&gt;</code> via{' '}
              <code>useHudMotionEnabled()</code>.
            </dd>
          </div>
          <div className="armory-prop-row">
            <dt>Accent-only glow</dt>
            <dd>
              Glow never wraps body text. In <code>day</code> palette, blur glow is replaced with
              crisp solid borders.
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Global Keyboard Contract</h2>
        <dl className="armory-props">
          <div className="armory-prop-row">
            <dt>Tab / Shift+Tab</dt>
            <dd>Move focus across interactive controls; trapped inside open Dialogs.</dd>
          </div>
          <div className="armory-prop-row">
            <dt>Esc</dt>
            <dd>Dismiss open Dialog and restore focus to the trigger element.</dd>
          </div>
          <div className="armory-prop-row">
            <dt>Arrow keys / Home / End</dt>
            <dd>Navigate Tabs and scroll focused ScrollPanel containers.</dd>
          </div>
          <div className="armory-prop-row">
            <dt>Space / Enter</dt>
            <dd>Activate or flip Toggle buttons; page down/up inside ScrollPanel.</dd>
          </div>
        </dl>
      </section>
    </article>
  )
}
