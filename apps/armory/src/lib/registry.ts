export type PackageManager = 'pnpm' | 'npm' | 'bun'

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

export function getRegistryItemUrl(slug: string): string {
  return `${getRegistryBaseUrl()}/r/${slug}.json`
}

export function getInstallCommand(
  slug: string,
  pm: PackageManager,
  mode: 'namespace' | 'url' = 'namespace',
): string {
  const target = mode === 'namespace' ? `@hud/${slug}` : getRegistryItemUrl(slug)
  switch (pm) {
    case 'pnpm':
      return `pnpm dlx shadcn@latest add ${target}`
    case 'npm':
      return `npx shadcn@latest add ${target}`
    case 'bun':
      return `bunx --bun shadcn@latest add ${target}`
  }
}

export function getComponentsJsonSnippet(): string {
  return JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema.json',
      registries: {
        '@hud': `${getRegistryBaseUrl()}/r/{name}.json`,
      },
    },
    null,
    2,
  )
}
