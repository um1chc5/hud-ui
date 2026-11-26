import { TextScramble } from '@hud-ui/core'

export function HomePage() {
  return (
    <>
      <header className="armory-page-header">
        <h1>
          <TextScramble text="HUD UI / ARMORY" duration={900} />
        </h1>
        <p>
          A live playground for every component in <code>@hud-ui/core</code>. Pick a component
          on the left. Flip the global skin / palette / glow / motion toggles in the top bar —
          every page re-renders in both skins side by side so you can see the contract hold.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">What's inside</h2>
        <dl className="armory-props">
          <dt>@hud-ui/tokens</dt>
          <dd>CSS custom properties + TS constants for palettes, spacing, motion, chamfer.</dd>
          <dt>@hud-ui/core</dt>
          <dd>Headless hooks and components. No CSS, no classNames.</dd>
          <dt>@hud-ui/skin-hud</dt>
          <dd>Chamfered panels, corner brackets, accent glow, custom scrollbar.</dd>
          <dt>@hud-ui/skin-plain</dt>
          <dd>Neutral baseline that proves the headless split works.</dd>
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
