# Whisp Stamp

This is an online web tool to process a copy pasted JSON with from incredibly-fast-whisper on replicate.com.

There is a sample input in `doc/sample-replicate.json` that would be pasted into the tool.

Here is a snippet of that JSON:

```
{
        "text": " Hi guys, welcome back. I hope everyone enjoyed lunch. Our next presenter is George Hott.",
        "timestamp": [
          0,
          7.68
        ]
      },
      {
        "text": " So please gather around and we're very excited to bring you the second half of the talks.",
        "timestamp": [
          7.8,
          12.9
        ]
      },
      {
        "text": " Welcome George.",
        "timestamp": [
          13.36,
          14.42
        ]
      },
```

The output above would be transformed into:

```
[00:00:00.000 --> 00:00:07.680]   Hi guys, welcome back. I hope everyone enjoyed lunch. Our next presenter is George Hott.
[00:00:07.800 --> 00:00:12.900]   So please gather around and we're very excited to bring you the second half of the talks.
[00:00:13.360 --> 00:00:14.420]   Welcome George.
```

The vision is that the tool would take the JSON input in a text area and produce the output in another text area for easy copy-pasting or in page searching.

## Local development

Install dependencies:

  npm install --legacy-peer-deps

Start the dev server:

  npm run dev -- --open

Run tests:

  npm test

Run tests in watch mode for iterative development:

  npm run test:watch

Show coverage after running tests:

  npm run test:coverage

Build for production (Vite):

  npm run build

Preview a production build:

  npm run preview

## Cloudflare deployment (wrangler v4)

This project uses `@sveltejs/adapter-cloudflare` and includes a sample `wrangler.toml` configured to point at the Cloudflare adapter output. Important: set the `assets.directory` to `.svelte-kit/cloudflare` in `wrangler.toml` so the worker can locate static assets created by the SvelteKit adapter.

Install wrangler locally (recommended) or use `npx` to run a version from the project devDependencies:

  npm install --save-dev wrangler@^4

Configure `wrangler.toml` with your account settings (account ID, etc.).

Before deploying, authenticate with Cloudflare from your terminal (or set an API token):

  npx wrangler login

Verify your identity with:

  npx wrangler whoami

If you see a warning mentioning Node.js built-ins (for example `node:async_hooks`), it means some packages import Node-specific APIs. This project opts in to Cloudflare's Node.js compatibility layer by default — see `wrangler.toml`:

  compatibility_flags = ["nodejs_compat"]

That enables polyfills for many Node APIs; it's required when frameworks (such as SvelteKit internals) import Node modules that are not native to the Workers runtime. Polyfilled methods may be no-ops or partially implemented, so you should test your Worker carefully with `wrangler dev` or `wrangler deploy --dry-run`.

Build and deploy with Wrangler v4:

  npm run build
  npx wrangler deploy

Or use the convenience npm scripts included in this repo:

  npm run deploy          # build + npx wrangler deploy
  npm run deploy:dry-run  # build + npx wrangler deploy --dry-run
  npm run deploy:dev      # run the worker locally with wrangler dev
  npm run deploy:pages    # build and use wrangler pages deploy for Pages hosting

For local testing with the worker runtime, use:

  npx wrangler dev

If you are using Cloudflare Pages instead of running a pure Worker, you can use `wrangler pages dev` and `wrangler pages deploy` (see Cloudflare Pages docs).