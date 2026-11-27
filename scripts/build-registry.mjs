import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(ROOT, 'registry.json')
const OUT_DIR = path.join(ROOT, 'apps/armory/public/r')

const ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json'
const REGISTRY_SCHEMA = 'https://ui.shadcn.com/schema/registry.json'

/**
 * Rewrites monorepo-internal relative imports inside packages/ui/src so that
 * consumers installing via `shadcn add` resolve them through `@/` aliases.
 */
function rewriteImports(sourceContent) {
  return sourceContent
    .replaceAll("'../../lib/utils'", "'@/lib/utils'")
    .replaceAll('"../../lib/utils"', '"@/lib/utils"')
    .replaceAll("'../hud/CornerBrackets'", "'@/components/hud/CornerBrackets'")
    .replaceAll('"../hud/CornerBrackets"', '"@/components/hud/CornerBrackets"')
    .replaceAll("'../../hooks/useHudMotionEnabled'", "'@/hooks/useHudMotionEnabled'")
    .replaceAll('"../../hooks/useHudMotionEnabled"', '"@/hooks/useHudMotionEnabled"')
    .replaceAll("'./usePrefersReducedMotion'", "'@/hooks/usePrefersReducedMotion'")
    .replaceAll('"./usePrefersReducedMotion"', '"@/hooks/usePrefersReducedMotion"')
}

async function main() {
  const raw = await fs.readFile(MANIFEST_PATH, 'utf8')
  const manifest = JSON.parse(raw)

  await fs.mkdir(OUT_DIR, { recursive: true })

  const indexItems = []

  for (const item of manifest.items) {
    const resolvedFiles = []

    for (const fileSpec of item.files) {
      const absSource = path.join(ROOT, fileSpec.source)
      const rawContent = await fs.readFile(absSource, 'utf8')
      const content = fileSpec.source.endsWith('.css') ? rawContent : rewriteImports(rawContent)

      const fileEntry = {
        path: fileSpec.path,
        type: fileSpec.type,
        content,
      }
      if (fileSpec.target) {
        fileEntry.target = fileSpec.target
      }
      resolvedFiles.push(fileEntry)
    }

    const itemPayload = {
      $schema: ITEM_SCHEMA,
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      ...(item.dependencies ? { dependencies: item.dependencies } : {}),
      ...(item.registryDependencies ? { registryDependencies: item.registryDependencies } : {}),
      ...(item.docs ? { docs: item.docs } : {}),
      files: resolvedFiles,
    }

    const outPath = path.join(OUT_DIR, `${item.name}.json`)
    await fs.writeFile(outPath, JSON.stringify(itemPayload, null, 2) + '\n', 'utf8')

    indexItems.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      ...(item.dependencies ? { dependencies: item.dependencies } : {}),
      ...(item.registryDependencies ? { registryDependencies: item.registryDependencies } : {}),
      files: resolvedFiles.map(({ path: p, type: t, target }) => ({
        path: p,
        type: t,
        ...(target ? { target } : {}),
      })),
    })
  }

  const indexPayload = {
    $schema: REGISTRY_SCHEMA,
    name: manifest.name,
    homepage: manifest.homepage,
    items: indexItems,
  }

  await fs.writeFile(
    path.join(OUT_DIR, 'registry.json'),
    JSON.stringify(indexPayload, null, 2) + '\n',
    'utf8',
  )

  console.log(`Built ${indexItems.length} shadcn registry items -> ${path.relative(ROOT, OUT_DIR)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
