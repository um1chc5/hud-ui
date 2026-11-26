import { TextScramble } from '@hud-ui/ui'

export function HomePage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>
          <TextScramble text="HUD UI / ARMORY" duration={900} />
        </h1>
        <p>
          Private high-tech HUD kit — ownable source you copy into an app, shadcn-style. Flip
          palette / glow / motion / grid in the top bar. Every component page has a live demo and
          keyboard cheatsheet.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">What's inside</h2>
        <dl className="armory-props">
          <dt>tokens.css</dt>
          <dd>Four palettes (steel, teal, thermal, day), type, spacing, chamfer, motion.</dd>
          <dt>components/ui</dt>
          <dd>Dialog, Tabs, Toggle, Meter, TextScramble, ScrollPanel — Tailwind + react-aria.</dd>
          <dt>components/hud</dt>
          <dd>Decorative only: CornerBrackets, ChamferFrame, GridBg.</dd>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">Global keyboard</h2>
        <dl className="armory-props">
          <dt>Tab / Shift+Tab</dt>
          <dd>Move focus between interactive elements.</dd>
          <dt>Esc</dt>
          <dd>Close any open Dialog.</dd>
          <dt>Arrow keys</dt>
          <dd>Move within Tabs and inside a focused ScrollPanel.</dd>
        </dl>
      </section>
    </>
  )
}
