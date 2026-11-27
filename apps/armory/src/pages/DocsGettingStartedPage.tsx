import { CodeBlock } from '../components/CodeBlock'
import { InstallBar } from '../components/InstallBar'
import { getComponentsJsonSnippet, getRegistryBaseUrl } from '../lib/registry'
import { Link } from '../useRoute'

const ROOT_IMPORTS = `import './styles/hud-tokens.css'
import './styles/hud.css'`

const HTML_ATTRS = `<html
  lang="en"
  data-hud-palette="steel"
  data-hud-glow="on"
  data-hud-motion="on"
  data-hud-grid="on"
>`

const USAGE_SNIPPET = `import { Dialog } from '@/components/ui/Dialog'
import { Meter } from '@/components/ui/Meter'
import { TextScramble } from '@/components/ui/TextScramble'

export function TelemetryCard() {
  return (
    <div className="space-y-4">
      <TextScramble text="SYSTEM ONLINE" />
      <Meter label="Signal" value={76} variant="segments" />
    </div>
  )
}`

export function DocsGettingStartedPage() {
  const baseUrl = getRegistryBaseUrl()

  return (
    <article className="armory-guide">
      <header className="armory-page-header">
        <div className="armory-eyebrow-row">
          <span className="armory-eyebrow">Guide · 01</span>
        </div>
        <h1>Getting Started</h1>
        <p>
          Install <code>hud-ui</code> components directly into your React 19 + Tailwind v4 app using
          the official <code>shadcn</code> CLI, or copy files directly from the docs.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">1. Prerequisites</h2>
        <dl className="armory-props">
          <div className="armory-prop-row">
            <dt>React</dt>
            <dd>React 19 (`^19.0.0`) with TypeScript.</dd>
          </div>
          <div className="armory-prop-row">
            <dt>Tailwind CSS</dt>
            <dd>Tailwind v4 (`@import &quot;tailwindcss&quot;;`) configured in your app.</dd>
          </div>
          <div className="armory-prop-row">
            <dt>shadcn CLI</dt>
            <dd>Any project initialized with `shadcn@latest init` (`components.json`).</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">2. Configure the @hud Registry Namespace</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Add the <code>@hud</code> namespace to your app&apos;s <code>components.json</code> so you
          can install any item cleanly with <code>@hud/&lt;name&gt;</code>:
        </p>
        <CodeBlock code={getComponentsJsonSnippet()} title="components.json" lang="json" />
        <p className="text-xs text-[var(--muted)] mt-3">
          Prefer zero configuration? Switch any install bar to <code>direct URL</code> mode to pass{' '}
          <code>{baseUrl}/r/&lt;name&gt;.json</code> directly to <code>shadcn add</code>.
        </p>
      </section>

      <section>
        <h2 className="armory-section-title">3. Install Theme Tokens &amp; Components</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Install the base theme once (components also declare <code>hud-theme</code> as a registry
          dependency automatically):
        </p>
        <div className="flex flex-col gap-3">
          <InstallBar slug="hud-theme" />
          <InstallBar slug="dialog" />
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">4. Wire Styles &amp; Root Attributes</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Import the CSS files once at your app entry and set the four appearance attributes on{' '}
          <code>&lt;html&gt;</code>:
        </p>
        <div className="flex flex-col gap-3">
          <CodeBlock code={ROOT_IMPORTS} title="src/main.tsx" lang="ts" />
          <CodeBlock code={HTML_ATTRS} title="index.html" lang="html" />
          <CodeBlock code={USAGE_SNIPPET} title="TelemetryCard.tsx" lang="tsx" />
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">Next Steps</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/docs/theming" className="armory-btn">
            Explore Palettes &amp; Tokens →
          </Link>
          <Link to="/docs/components/dialog" className="armory-btn armory-btn-primary">
            Browse Components →
          </Link>
        </div>
      </section>
    </article>
  )
}
