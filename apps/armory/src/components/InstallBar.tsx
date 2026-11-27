import { useState } from 'react'
import {
  getInstallCommand,
  getRegistryItemUrl,
  type InstallerCli,
  type PackageManager,
} from '../lib/registry'
import { CopyButton } from './CopyButton'

type InstallBarProps = {
  slug: string
}

const PMS: PackageManager[] = ['pnpm', 'npm', 'bun']

export function InstallBar({ slug }: InstallBarProps) {
  const [pm, setPm] = useState<PackageManager>('pnpm')
  const [cli, setCli] = useState<InstallerCli>('hud-ui')
  const command = getInstallCommand(slug, pm, cli)

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
            onClick={() => setCli((c) => (c === 'hud-ui' ? 'shadcn' : 'hud-ui'))}
            className="armory-mode-toggle"
            title="Switch between @hud-ui/cli and shadcn CLI"
          >
            {cli === 'hud-ui' ? 'hud-ui CLI' : 'shadcn URL'}
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
