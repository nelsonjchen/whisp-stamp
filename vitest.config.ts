import { defineConfig } from 'vitest/config';

// Minimal vitest config for Svelte component testing.
// Uses `happy-dom` to provide a browser-like environment for component tests.
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['test/**/*.test.{ts,js}'],
    setupFiles: 'test/setup.ts'
  }
});
// default Node-only config removed — using `happy-dom` above for component testing
