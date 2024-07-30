import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'reactjs-video',
    environment: 'jsdom',
    setupFiles: './test-setup.ts',
  },
});
