import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/ReactVideo/index.tsx', 'src/useReactVideo/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
});
