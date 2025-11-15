# Whisp Stamp

Whisp Stamp converts Replicate's "incredibly-fast-whisper" transcription JSON into readable, timestamped transcript lines.
Paste the Replicate JSON into the input box and the app will format each chunk into a timestamped line you can copy or search.

Live demo: https://whisp-stamp.mindflakes.com/

Model: https://replicate.com/vaibhavs10/incredibly-fast-whisper

## Why this tool
- Readable timestamps from Replicate chunked output
- Fast copy/paste for SRT-like timestamps and in-page searching

## Key features
- Converts per-chunk timestamps into HH:MM:SS.mmm ranges
- Ignores empty chunks
- Robust error handling for invalid JSON

## Quick example

Input (from `docs/sample-replicate.json`):

```json
{
  "text": " Hi guys, welcome back...",
  "timestamp": [0, 7.68]
}
```

Output

```
[00:00:00.000 --> 00:00:07.680]   Hi guys, welcome back...
```

The sample JSON used for development is at `docs/sample-replicate.json` and a copy is also reachable at `static/docs/sample-replicate.json` when the app is running.

## Getting started (local)

Prerequisites: Node.js 18+ and npm

Install dependencies

```
npm install
```

Start dev server (hot reload)

```
npm run dev -- --open
```

Run tests (unit tests use Vitest):

```
npm test
```

Run tests in watch mode:

```
npm run test:watch
```

Show coverage

```
npm run test:coverage
```

Build for production

```
npm run build
```

Preview production build

```
npm run preview
```

## Cloudflare deployment (wrangler v4)

This project uses `@sveltejs/adapter-cloudflare`. The SvelteKit adapter builds a worker and static assets into `.svelte-kit/cloudflare`.

Important wrangler settings
- `assets.directory = ".svelte-kit/cloudflare"` — so static assets are available to the Worker
- `compatibility_flags = ["nodejs_compat"]` — permits some Node builtin polyfills required by SvelteKit internals

Install wrangler locally (recommended):

```
npm install --save-dev wrangler@^4
```

Login and confirm account:

```
npx wrangler login
npx wrangler whoami
```

Build and deploy:

```
npm run build
npx wrangler deploy
```

Dry run (safe):

```
npm run deploy:dry-run
```

Helper npm scripts
- `npm run deploy` — build + deploy
- `npm run deploy:dry-run` — build + deploy --dry-run
- `npm run deploy:dev` — run the worker locally with `wrangler dev`
- `npm run deploy:pages` — build and deploy to Cloudflare Pages

## Development notes
- `src/lib/transform.ts` contains `jsonToTranscript` (the main transformer) and is covered by unit tests at `test/transform.test.ts`.
- Use `npx npm-check-updates` to check available package updates.

## Testing and quality gates
- Unit tests: `npm test` (Vitest)
- Typecheck: `npm run check` (svelte-check)
- Build: `npm run build`

## License

MIT — see `LICENSE` in this repository for full text.