import { CodeBlock } from '../components/CodeBlock'
import { InstallBar } from '../components/InstallBar'
import {
  getAgentInitPrompt,
  getComponentsJsonSnippet,
  getHudConfigSnippet,
  getRegistryRootUrl,
} from '../lib/registry'
import { Link } from '../useRoute'

const INIT_CMD = `pnpm dlx @hud-ui/cli init`

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
  const registryRoot = getRegistryRootUrl()

  return (
    <article className="armory-guide">
      <header className="armory-page-header">
        <div className="armory-eyebrow-row">
          <span className="armory-eyebrow">Guide · 01</span>
        </div>
        <h1>Getting Started</h1>
        <p>
          Install <code>hud-ui</code> components directly into your React 19 + Tailwind v4 app using
          our own <code>@hud-ui/cli</code> (or the compatible <code>shadcn</code> CLI), or copy
          files straight from the docs.
        </p>
      </header>

      <section>
        <h2 className="armory-section-title">Quick Agent Prompt (Copy &amp; Paste)</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Paste this into your coding agent (Antigravity, Claude Code, Cursor) to wire{' '}
          <code>hud-ui</code> into an existing React + Tailwind v4 codebase automatically:
        </p>
        <CodeBlock code={getAgentInitPrompt()} title="AGENT_INIT_PROMPT.txt" lang="text" />
      </section>

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
            <dt>Node.js</dt>
            <dd>Node 20+ for `@hud-ui/cli`.</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="armory-section-title">2. Initialize with @hud-ui/cli</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Run <code>init</code> to create <code>hud.config.json</code> and install the base tokens,
          chrome CSS, and <code>cn()</code> utility from <code>{registryRoot}</code>:
        </p>
        <div className="flex flex-col gap-3">
          <CodeBlock code={INIT_CMD} title="Terminal" lang="bash" />
          <CodeBlock code={getHudConfigSnippet()} title="hud.config.json" lang="json" />
        </div>
      </section>

      <section>
        <h2 className="armory-section-title">3. Add Components</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Add any component by name — dependencies like <code>@base-ui/react</code>,{' '}
          <code>CornerBrackets</code>, and <code>hud-theme</code> resolve automatically:
        </p>
        <div className="flex flex-col gap-3">
          <InstallBar slug="dialog" />
          <InstallBar slug="meter" />
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
        <h2 className="armory-section-title">Optional: Using the shadcn CLI instead</h2>
        <p className="text-sm text-[var(--muted)] mb-3">
          Our registry endpoint also matches the official <code>shadcn</code> registry schema. If
          your project already uses <code>components.json</code>, add the <code>@hud</code>{' '}
          namespace:
        </p>
        <CodeBlock code={getComponentsJsonSnippet()} title="components.json" lang="json" />
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
