import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const here = import.meta.dirname
const r = (p: string) => path.resolve(here, p)

// Point workspace packages to their sources so `pnpm dev` works without a prior build.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@hud-ui/tokens/styles.css', replacement: r('../../packages/tokens/src/tokens.css') },
      {
        find: '@hud-ui/skin-hud/styles.css',
        replacement: r('../../packages/skin-hud/src/styles.css'),
      },
      {
        find: '@hud-ui/skin-plain/styles.css',
        replacement: r('../../packages/skin-plain/src/styles.css'),
      },
      { find: '@hud-ui/core', replacement: r('../../packages/core/src') },
      { find: '@hud-ui/tokens', replacement: r('../../packages/tokens/src') },
      { find: '@hud-ui/skin-hud', replacement: r('../../packages/skin-hud/src') },
      { find: '@hud-ui/skin-plain', replacement: r('../../packages/skin-plain/src') },
    ],
  },
})
