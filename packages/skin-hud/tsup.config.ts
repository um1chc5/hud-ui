import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: false,
  target: 'es2022',
  external: ['react', 'react-dom', '@hud-ui/core'],
})
