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

Build and deploy with Wrangler v4:

  npm run build
  npx wrangler deploy

For local testing with the worker runtime, use:

  npx wrangler dev

If you are using Cloudflare Pages instead of running a pure Worker, you can use `wrangler pages dev` and `wrangler pages deploy` (see Cloudflare Pages docs).