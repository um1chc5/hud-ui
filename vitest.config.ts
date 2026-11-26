import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.test.{ts,tsx}', 'apps/**/*.test.{ts,tsx}'],
    css: true,
    globals: false,
  },
  resolve: {
    alias: [
      {
        find: '@hud-ui/ui/styles/tokens.css',
        replacement: path.resolve(__dirname, 'packages/ui/src/styles/tokens.css'),
      },
      {
        find: '@hud-ui/ui/styles/hud.css',
        replacement: path.resolve(__dirname, 'packages/ui/src/styles/hud.css'),
      },
      { find: '@hud-ui/ui', replacement: path.resolve(__dirname, 'packages/ui/src') },
    ],
  },
})
