import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@hud-ui/ui/styles/tokens.css',
        replacement: path.resolve(root, '../../packages/ui/src/styles/tokens.css'),
      },
      {
        find: '@hud-ui/ui/styles/hud.css',
        replacement: path.resolve(root, '../../packages/ui/src/styles/hud.css'),
      },
      { find: '@hud-ui/ui', replacement: path.resolve(root, '../../packages/ui/src') },
    ],
  },
  server: {
    port: 5173,
  },
})
