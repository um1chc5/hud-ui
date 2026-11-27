import { execFileSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'

export const DEFAULT_REGISTRY = 'https://um1chc5.github.io/hud-ui/r'
export const CLI_VERSION = '0.1.0'

export const DEFAULT_CONFIG = {
  registry: DEFAULT_REGISTRY,
  importAlias: '@/',
  aliases: {
    ui: 'src/components/ui',
    components: 'src/components',
    lib: 'src/lib',
    hooks: 'src/hooks',
    styles: 'src/styles',
  },
}

function printHelp(log = console.log) {
  log(`hud-ui v${CLI_VERSION} — ownable HUD UI kit installer

Usage:
  hud-ui init [options]              Create hud.config.json and install base theme + utils
  hud-ui add <names...> [options]    Install component(s) and their registry dependencies
  hud-ui list [options]              List all available items in the registry

Options:
  --cwd <path>         Target project directory (default: current directory)
  --registry <url|dir> Override registry base URL or local directory
  --overwrite          Overwrite existing files
  --no-install         Skip automatic npm package installation
  --dry-run            Preview planned files and dependencies without writing
  -h, --help           Show help
  -v, --version        Show version`)
}

export function parseArgs(argv) {
  const positionals = []
  const flags = {
    cwd: process.cwd(),
    registry: undefined,
    overwrite: false,
    install: true,
    dryRun: false,
    help: false,
    version: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '-h' || arg === '--help') flags.help = true
    else if (arg === '-v' || arg === '--version') flags.version = true
    else if (arg === '--overwrite') flags.overwrite = true
    else if (arg === '--no-install') flags.install = false
    else if (arg === '--dry-run') flags.dryRun = true
    else if (arg === '--cwd' && argv[i + 1]) flags.cwd = path.resolve(argv[++i])
    else if (arg.startsWith('--cwd=')) flags.cwd = path.resolve(arg.slice('--cwd='.length))
    else if (arg === '--registry' && argv[i + 1]) flags.registry = argv[++i]
    else if (arg.startsWith('--registry=')) flags.registry = arg.slice('--registry='.length)
    else if (!arg.startsWith('-')) positionals.push(arg)
    else throw new Error(`Unknown flag: ${arg}`)
  }

  return { command: positionals[0] ?? 'help', targets: positionals.slice(1), flags }
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

export async function loadConfig(cwd) {
  const configPath = path.join(cwd, 'hud.config.json')
  if (await fileExists(configPath)) {
    const raw = await fs.readFile(configPath, 'utf8')
    const parsed = JSON.parse(raw)
    return {
      registry: parsed.registry || DEFAULT_REGISTRY,
      importAlias: parsed.importAlias || DEFAULT_CONFIG.importAlias,
      aliases: { ...DEFAULT_CONFIG.aliases, ...parsed.aliases },
    }
  }

  const shadcnPath = path.join(cwd, 'components.json')
  if (await fileExists(shadcnPath)) {
    const raw = await fs.readFile(shadcnPath, 'utf8')
    const parsed = JSON.parse(raw)
    const resolveAlias = (val, fallback) =>
      typeof val === 'string' && val.startsWith('@/') ? `src/${val.slice(2)}` : fallback
    return {
      registry: DEFAULT_REGISTRY,
      importAlias: '@/',
      aliases: {
        ui: resolveAlias(parsed.aliases?.ui, DEFAULT_CONFIG.aliases.ui),
        components: resolveAlias(parsed.aliases?.components, DEFAULT_CONFIG.aliases.components),
        lib: resolveAlias(parsed.aliases?.lib, DEFAULT_CONFIG.aliases.lib),
        hooks: resolveAlias(parsed.aliases?.hooks, DEFAULT_CONFIG.aliases.hooks),
        styles: DEFAULT_CONFIG.aliases.styles,
      },
    }
  }

  return structuredClone(DEFAULT_CONFIG)
}

async function fetchJson(registryBase, filename) {
  if (/^https?:\/\//i.test(registryBase)) {
    const url = `${registryBase.replace(/\/+$/, '')}/${filename}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url} (${res.status} ${res.statusText})`)
    }
    return res.json()
  }

  const localDir = registryBase.startsWith('file://')
    ? new URL(registryBase).pathname
    : registryBase
  const fullPath = path.join(localDir, filename)
  const raw = await fs.readFile(fullPath, 'utf8')
  return JSON.parse(raw)
}

export async function resolveItems(registryBase, names) {
  const visited = new Set()
  const items = []

  async function visit(name) {
    if (visited.has(name)) return
    visited.add(name)
    const item = await fetchJson(registryBase, `${name}.json`)
    if (Array.isArray(item.registryDependencies)) {
      for (const dep of item.registryDependencies) {
        await visit(dep)
      }
    }
    items.push(item)
  }

  for (const name of names) {
    await visit(name)
  }

  return items
}

export function resolveFileDestination(cwd, fileSpec, config) {
  const aliases = config.aliases
  const baseName = path.basename(fileSpec.path)

  switch (fileSpec.type) {
    case 'registry:ui':
      return path.join(cwd, aliases.ui, baseName)
    case 'registry:component':
      return path.join(cwd, aliases.components, fileSpec.path)
    case 'registry:lib':
      return path.join(cwd, aliases.lib, baseName)
    case 'registry:hook':
      return path.join(cwd, aliases.hooks, baseName)
    case 'registry:file': {
      const target = fileSpec.target || fileSpec.path
      if (target.startsWith('src/styles/')) {
        return path.join(cwd, aliases.styles, path.basename(target))
      }
      return path.join(cwd, target)
    }
    default:
      return path.join(cwd, fileSpec.target || fileSpec.path)
  }
}

function rewriteImportAlias(content, importAlias) {
  if (!importAlias || importAlias === '@/') return content
  const normalized = importAlias.endsWith('/') ? importAlias : `${importAlias}/`
  return content.replaceAll("'@/", `'${normalized}`).replaceAll('"@/', `"${normalized}`)
}

export async function detectPackageManager(cwd) {
  if (await fileExists(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (await fileExists(path.join(cwd, 'bun.lockb'))) return 'bun'
  if (await fileExists(path.join(cwd, 'bun.lock'))) return 'bun'
  if (await fileExists(path.join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

async function getInstalledPackages(cwd) {
  const pkgPath = path.join(cwd, 'package.json')
  if (!(await fileExists(pkgPath))) return new Set()
  const raw = await fs.readFile(pkgPath, 'utf8')
  const pkg = JSON.parse(raw)
  return new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ])
}

function installPackages(cwd, pm, packages) {
  const args = pm === 'npm' ? ['install', ...packages] : ['add', ...packages]
  execFileSync(pm, args, { cwd, stdio: 'inherit' })
}

export async function runCli(argv, io = { log: console.log }) {
  const { command, targets, flags } = parseArgs(argv)

  if (flags.version) {
    io.log(CLI_VERSION)
    return { command: 'version' }
  }

  if (flags.help || command === 'help') {
    printHelp(io.log)
    return { command: 'help' }
  }

  const config = await loadConfig(flags.cwd)
  const registryBase = (flags.registry || process.env.HUD_REGISTRY_URL || config.registry).replace(
    /\/+$/,
    '',
  )

  if (command === 'list') {
    const index = await fetchJson(registryBase, 'registry.json')
    io.log(`hud-ui registry (${registryBase}):\n`)
    for (const item of index.items ?? []) {
      io.log(`  ${item.name.padEnd(18)} [${item.type}]  ${item.description ?? ''}`)
    }
    return { command: 'list', items: index.items ?? [] }
  }

  let requestedNames = targets
  if (command === 'init') {
    const configPath = path.join(flags.cwd, 'hud.config.json')
    const nextConfig = { ...config, registry: registryBase }
    if (!flags.dryRun && (flags.overwrite || !(await fileExists(configPath)))) {
      await fs.mkdir(flags.cwd, { recursive: true })
      await fs.writeFile(configPath, JSON.stringify(nextConfig, null, 2) + '\n', 'utf8')
      io.log(`Created ${path.relative(flags.cwd, configPath) || 'hud.config.json'}`)
    }
    requestedNames = targets.length > 0 ? targets : ['hud-theme', 'utils']
  } else if (command !== 'add') {
    throw new Error(`Unknown command "${command}". Run "hud-ui --help" for usage.`)
  }

  if (requestedNames.length === 0) {
    throw new Error('Specify at least one component name, e.g. "hud-ui add dialog meter".')
  }

  const items = await resolveItems(registryBase, requestedNames)
  const deps = new Set()
  const written = []
  const skipped = []

  for (const item of items) {
    for (const dep of item.dependencies ?? []) deps.add(dep)
    for (const fileSpec of item.files ?? []) {
      const dest = resolveFileDestination(flags.cwd, fileSpec, config)
      const rel = path.relative(flags.cwd, dest)
      const exists = await fileExists(dest)
      if (exists && !flags.overwrite) {
        skipped.push(rel)
        continue
      }
      if (!flags.dryRun) {
        await fs.mkdir(path.dirname(dest), { recursive: true })
        const content = fileSpec.path.endsWith('.css')
          ? fileSpec.content
          : rewriteImportAlias(fileSpec.content, config.importAlias)
        await fs.writeFile(dest, content, 'utf8')
      }
      written.push(rel)
    }
  }

  const installed = await getInstalledPackages(flags.cwd)
  const missingDeps = [...deps].filter((d) => !installed.has(d))

  if (written.length > 0) {
    io.log(`${flags.dryRun ? '[dry-run] Would write' : 'Installed'} ${written.length} file(s):`)
    for (const f of written) io.log(`  + ${f}`)
  }
  if (skipped.length > 0) {
    io.log(`Skipped ${skipped.length} existing file(s) (pass --overwrite to replace):`)
    for (const f of skipped) io.log(`  ~ ${f}`)
  }

  if (missingDeps.length > 0) {
    if (flags.install && !flags.dryRun) {
      const pm = await detectPackageManager(flags.cwd)
      io.log(`Installing npm dependencies with ${pm}: ${missingDeps.join(', ')}`)
      installPackages(flags.cwd, pm, missingDeps)
    } else {
      io.log(`Dependencies needed: ${missingDeps.join(', ')}`)
    }
  }

  if (command === 'init') {
    io.log(
      `\nNext: import hud-tokens.css + hud.css at your app root and set data-hud-* attrs on <html>.`,
    )
  }

  return { command, written, skipped, missingDeps }
}
