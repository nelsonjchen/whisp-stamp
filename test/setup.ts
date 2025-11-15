// Minimal setup for vitest happy-dom environment.
// Svelte component tests often need a small polyfill for window.matchMedia.
if (!('matchMedia' in window)) {
  // minimal implementation that returns the expected interface
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    })
  });
}

export {};