<script lang="ts">
  import { jsonToTranscript } from '$lib/transform';
  import { onMount } from 'svelte';
  let input = '';
  let output = '';
  let error = '';
  let loading = false;
  let sample = '';
  let copied = false;

  onMount(async () => {
    // Load sample input for placeholder
    const res = await fetch('/docs/sample-replicate.json');
    if (res.ok) sample = await res.text();
  });

  async function handleTransform() {
    error = '';
    output = '';
    loading = true;
    await new Promise(r => setTimeout(r)); // allow UI update
    try {
      output = await runTransform(input);
    } catch (e) {
      error = e.message || 'Unknown error';
    } finally {
      loading = false;
    }
  }

  function runTransform(text: string): Promise<string> {
    // Non-blocking for large input
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(jsonToTranscript(text));
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }

  function pasteSample() {
    input = sample;
    output = '';
    error = '';
  }

  function selectOutput(e: Event) {
    (e.target as HTMLTextAreaElement).select();
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.warn('Copy to clipboard failed', err);
    }
  }
</script>

<main>
  <h1>Whisp Stamp</h1>
  <p>Paste Replicate incredibly-fast-whisper JSON below and click Transform.</p>
  <button type="button" on:click={pasteSample} disabled={!sample}>Paste Sample</button>
  <div class="areas">
    <textarea
      bind:value={input}
      placeholder={sample ? 'Paste JSON here or click Paste Sample' : 'Paste JSON here'}
      rows={16}
      spellcheck={false}
      autocomplete="off"

      class="input"
    ></textarea>
    <button type="button" on:click={handleTransform} disabled={loading || !input.trim()}>
      {loading ? 'Transforming…' : 'Transform'}
    </button>
    <div class="outputWrap">
      <textarea
      value={output}
      readonly
      rows={16}
      class="output"
      on:focus={selectOutput}
      placeholder="Transcript will appear here"
    ></textarea>
      <div class="outputControls">
        <button type="button" on:click={copyOutput} disabled={!output.trim()}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  </div>
  {#if error}
    <div class="error">{error}</div>
  {/if}
</main>

<style>
main {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}
h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.areas {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
textarea {
  width: 100%;
  font-family: monospace;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0.75rem;
  resize: vertical;
}
.input {
  min-height: 8rem;
}
.output {
  background: #f8f8f8;
  min-height: 8rem;
  cursor: pointer;
}
.outputWrap {
  position: relative;
}
.outputControls {
  position: absolute;
  right: 8px;
  bottom: 8px;
}
.outputControls button {
  background: #10b981;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  border: none;
  color: white;
  cursor: pointer;
}
.outputControls button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
button {
  align-self: flex-start;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.error {
  color: #b91c1c;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
