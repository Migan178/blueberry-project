import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts', 'src/commands/**/*.ts', 'src/listeners/*.ts'],
  skipNodeModulesBundle: true,
  format: ['esm'],
  minify: true,
})
