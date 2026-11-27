export type PackageManager = 'pnpm' | 'npm' | 'bun'
export type InstallerCli = 'hud-ui' | 'shadcn'

const BASE_PREFIX = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')

export function getRegistryBaseUrl(): string {
  const envUrl = import.meta.env.VITE_REGISTRY_URL as string | undefined
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '')
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${BASE_PREFIX}`
  }
  return 'https://um1chc5.github.io/hud-ui'
}

export function getRegistryRootUrl(): string {
  return `${getRegistryBaseUrl()}/r`
}

export function getRegistryItemUrl(slug: string): string {
  return `${getRegistryRootUrl()}/${slug}.json`
}

export function getInstallCommand(
  slug: string,
  pm: PackageManager,
  cli: InstallerCli = 'hud-ui',
): string {
  const target = cli === 'hud-ui' ? slug : getRegistryItemUrl(slug)
  const runner =
    cli === 'hud-ui'
      ? { pnpm: 'pnpm dlx @hud-ui/cli', npm: 'npx @hud-ui/cli', bun: 'bunx @hud-ui/cli' }
      : {
          pnpm: 'pnpm dlx shadcn@latest',
          npm: 'npx shadcn@latest',
          bun: 'bunx --bun shadcn@latest',
        }
  return `${runner[pm]} add ${target}`
}

export function getHudConfigSnippet(): string {
  return JSON.stringify(
    {
      registry: getRegistryRootUrl(),
      importAlias: '@/',
      aliases: {
        ui: 'src/components/ui',
        components: 'src/components',
        lib: 'src/lib',
        hooks: 'src/hooks',
        styles: 'src/styles',
      },
    },
    null,
    2,
  )
}

export function getComponentsJsonSnippet(): string {
  return JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema.json',
      registries: {
        '@hud': `${getRegistryRootUrl()}/{name}.json`,
      },
    },
    null,
    2,
  )
}

export function getAgentInitPrompt(
  components: string[] = ['dialog', 'tabs', 'toggle', 'meter', 'text-scramble', 'scroll-panel'],
): string {
  const registryRoot = getRegistryRootUrl()
  const list = components.join(' ')
  return `Initialize hud-ui in this React + Tailwind v4 project using the registry at ${registryRoot}:

1. Inspect package.json, tsconfig.json, and CSS entry files to detect our package manager and src/ alias paths.
2. Fetch ${registryRoot}/registry.json and install hud-theme, utils, and these components: ${list}
   - Either run: npx @hud-ui/cli init --registry ${registryRoot} && npx @hud-ui/cli add ${list} --registry ${registryRoot}
   - Or fetch each ${registryRoot}/<name>.json directly, resolve its registryDependencies, write its files (mapping @/ to our tsconfig path alias), and install any listed npm dependencies (e.g. @base-ui/react, clsx, tailwind-merge).
3. Import hud-tokens.css and hud.css once at the app root (after Tailwind), and set data-hud-palette="steel" data-hud-glow="on" data-hud-motion="on" data-hud-grid="on" on <html>.
4. Keep motion strict (opacity, clip-path, translate only — never transform/scale on body text), and verify typecheck, lint, and build pass.`
}
