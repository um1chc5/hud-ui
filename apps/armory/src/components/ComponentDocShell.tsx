import type { ReactNode } from 'react'
import { ChamferFrame, CornerBrackets, Item, Tabs, cn } from '@hud-ui/ui'
import { InstallBar } from './InstallBar'
import { CodeBlock } from './CodeBlock'

export type PropDoc = {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export type KeyDoc = {
  keys: string
  description: string
}

export type SourceFileDoc = {
  filename: string
  code: string
}

type ComponentDocShellProps = {
  title: string
  slug: string
  category: 'UI Primitive' | 'HUD Chrome'
  description: string
  dependencies?: string[]
  demo: ReactNode
  demoClassName?: string
  usageCode: string
  sources: SourceFileDoc[]
  propsList: PropDoc[]
  keyboardList: KeyDoc[]
  notes?: ReactNode
}

export function ComponentDocShell({
  title,
  slug,
  category,
  description,
  dependencies,
  demo,
  demoClassName,
  usageCode,
  sources,
  propsList,
  keyboardList,
  notes,
}: ComponentDocShellProps) {
  return (
    <article className="armory-doc">
      <header className="armory-page-header">
        <div className="armory-eyebrow-row">
          <span className="armory-eyebrow">{category}</span>
          {dependencies && dependencies.length > 0 ? (
            <span className="armory-dep-tag">deps: {dependencies.join(', ')}</span>
          ) : (
            <span className="armory-dep-tag">zero external runtime deps</span>
          )}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <section aria-labelledby="install-heading">
        <h2 id="install-heading" className="armory-section-title">
          Install via shadcn registry
        </h2>
        <InstallBar slug={slug} />
      </section>

      <section aria-labelledby="preview-heading">
        <h2 id="preview-heading" className="armory-section-title">
          Preview &amp; Source
        </h2>
        <Tabs aria-label={`${title} preview and code`} defaultSelectedKey="preview">
          <Item key="preview" title="Preview">
            <ChamferFrame className={cn('armory-stage', demoClassName)}>
              <CornerBrackets />
              {demo}
            </ChamferFrame>
          </Item>
          <Item key="usage" title="Usage">
            <CodeBlock code={usageCode} title={`${title}Example.tsx`} lang="tsx" />
          </Item>
          <Item key="source" title="Source">
            <div className="armory-source-stack">
              {sources.map((file) => (
                <CodeBlock
                  key={file.filename}
                  code={file.code}
                  title={file.filename}
                  lang={file.filename.endsWith('.css') ? 'css' : 'tsx'}
                />
              ))}
            </div>
          </Item>
        </Tabs>
      </section>

      <section aria-labelledby="props-heading">
        <h2 id="props-heading" className="armory-section-title">
          API / Props
        </h2>
        <div className="armory-table-wrap">
          <table className="armory-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {propsList.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>
                    <code className="armory-type-code">{prop.type}</code>
                  </td>
                  <td>{prop.defaultValue ? <code>{prop.defaultValue}</code> : '—'}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="keyboard-heading">
        <h2 id="keyboard-heading" className="armory-section-title">
          Keyboard &amp; Accessibility
        </h2>
        <dl className="armory-props">
          {keyboardList.map((entry) => (
            <div key={entry.keys} className="armory-prop-row">
              <dt>{entry.keys}</dt>
              <dd>{entry.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      {notes ? (
        <section aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="armory-section-title">
            Design Notes
          </h2>
          <div className="armory-note">{notes}</div>
        </section>
      ) : null}
    </article>
  )
}
