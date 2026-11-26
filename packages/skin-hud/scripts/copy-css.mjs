import { cp, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(here, '..')

await mkdir(resolve(pkgRoot, 'dist'), { recursive: true })
await cp(resolve(pkgRoot, 'src/styles.css'), resolve(pkgRoot, 'dist/styles.css'))
