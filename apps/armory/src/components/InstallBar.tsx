import { useState } from 'react'
import { getInstallCommand, getRegistryItemUrl, type PackageManager } from '../lib/registry'
import { CopyButton } from './CopyButton'

type InstallBarProps = {
  slug: string
}

const PMS: PackageManager[] = ['pnpm', 'npm', 'bun']

export function InstallBar({ slug }: InstallBarProps) {
  const [pm, setPm] = useState<PackageManager>('pnpm')
  const [mode, setMode] = useState<'namespace' | 'url'>('namespace')
  const command = getInstallCommand(slug, pm, mode)

  return (
    <div className="armory-install" role="region" aria-label={`Install ${slug}`}>
      <div className="armory-install-head">
        <div className="armory-install-tabs" role="tablist" aria-label="Package manager">
          {PMS.map((entry) => (
            <button
              key={entry}
              type="button"
              role="tab"
              aria-selected={pm === entry}
              onClick={() => setPm(entry)}
              className="armory-tab-chip"
              data-active={pm === entry ? 'true' : 'false'}
            >
              {entry}
            </button>
          ))}
        </div>
        <div className="armory-install-mode">
          <button
            type="button"
            onClick={() => setMode((m) => (m === 'namespace' ? 'url' : 'namespace'))}
            className="armory-mode-toggle"
            title="Switch between @hud namespace and direct registry URL"
          >
            {mode === 'namespace' ? '@hud alias' : 'direct URL'}
          </button>
          <a
            href={getRegistryItemUrl(slug)}
            target="_blank"
            rel="noreferrer"
            className="armory-mode-toggle"
          >
            /r/{slug}.json ↗
          </a>
        </div>
      </div>
      <div className="armory-install-cmd">
        <code>
          <span className="armory-prompt">$</span> {command}
        </code>
        <CopyButton value={command} label="COPY" />
      </div>
    </div>
  )
}
