import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import { runCli } from './cli.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LOCAL_REGISTRY = path.resolve(__dirname, '../../../apps/armory/public/r')

const tempDirs: string[] = []

async function makeTempProject() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'hud-ui-cli-test-'))
  tempDirs.push(dir)
  await fs.writeFile(
    path.join(dir, 'package.json'),
    JSON.stringify({ name: 'test-consumer', private: true, dependencies: {} }, null, 2),
    'utf8',
  )
  return dir
}

afterEach(async () => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) await fs.rm(dir, { recursive: true, force: true })
  }
})

describe('@hud-ui/cli', () => {
  it('lists items from a registry directory', async () => {
    const lines: string[] = []
    const res = await runCli(['list', '--registry', LOCAL_REGISTRY], {
      log: (msg) => lines.push(msg),
    })
    expect(res.command).toBe('list')
    expect(lines.join('\n')).toContain('dialog')
    expect(lines.join('\n')).toContain('hud-theme')
  })

  it('initializes hud.config.json and installs base theme + utils', async () => {
    const cwd = await makeTempProject()
    const res = await runCli(['init', '--cwd', cwd, '--registry', LOCAL_REGISTRY, '--no-install'], {
      log: () => {},
    })
    expect(res.written).toContain('src/styles/hud-tokens.css')
    expect(res.written).toContain('src/styles/hud.css')
    expect(res.written).toContain('src/lib/utils.ts')
    const cfg = JSON.parse(await fs.readFile(path.join(cwd, 'hud.config.json'), 'utf8'))
    expect(cfg.aliases.ui).toBe('src/components/ui')
  })

  it('adds dialog with its transitive registryDependencies and Base UI dep', async () => {
    const cwd = await makeTempProject()
    const res = await runCli(
      ['add', 'dialog', '--cwd', cwd, '--registry', LOCAL_REGISTRY, '--no-install'],
      { log: () => {} },
    )
    expect(res.written).toContain('src/components/ui/Dialog.tsx')
    expect(res.written).toContain('src/components/hud/CornerBrackets.tsx')
    expect(res.written).toContain('src/lib/utils.ts')
    expect(res.written).toContain('src/styles/hud-tokens.css')
    expect(res.missingDeps).toContain('@base-ui/react')
    expect(res.missingDeps).toContain('clsx')
    expect(res.missingDeps).toContain('tailwind-merge')

    const dialogCode = await fs.readFile(path.join(cwd, 'src/components/ui/Dialog.tsx'), 'utf8')
    expect(dialogCode).toContain("from '@base-ui/react/dialog'")
    expect(dialogCode).toContain("from '@/components/hud/CornerBrackets'")
  })
})
