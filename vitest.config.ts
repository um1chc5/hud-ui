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
      // CSS sub-paths — exercise the shipping `./styles.css` export in tests.
      {
        find: '@hud-ui/tokens/styles.css',
        replacement: path.resolve(__dirname, 'packages/tokens/src/tokens.css'),
      },
      {
        find: '@hud-ui/skin-hud/styles.css',
        replacement: path.resolve(__dirname, 'packages/skin-hud/src/styles.css'),
      },
      {
        find: '@hud-ui/skin-plain/styles.css',
        replacement: path.resolve(__dirname, 'packages/skin-plain/src/styles.css'),
      },
      // Package entry points → source during dev + tests (no rebuild needed).
      { find: '@hud-ui/core', replacement: path.resolve(__dirname, 'packages/core/src') },
      { find: '@hud-ui/tokens', replacement: path.resolve(__dirname, 'packages/tokens/src') },
      { find: '@hud-ui/skin-hud', replacement: path.resolve(__dirname, 'packages/skin-hud/src') },
      {
        find: '@hud-ui/skin-plain',
        replacement: path.resolve(__dirname, 'packages/skin-plain/src'),
      },
    ],
  },
})
