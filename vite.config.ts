import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Vitest-friendly test setup: use `happy-dom` for Svelte component tests in the
// browser-like environment. Keep a minimal `setupFiles` to polyfill `matchMedia`.
export default defineConfig({
  plugins: [sveltekit()],
  // vitest config moved to `vitest.config.ts` to avoid TypeScript overload
  // problems with Vite's config type in TS — see `vitest.config.ts`.
});
