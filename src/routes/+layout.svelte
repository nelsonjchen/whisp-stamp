
<script>
  // Small header navigation. Use a reusable component so we can import it elsewhere.
  import Header from '$lib/Header.svelte';
</script>

<Header />

<slot />

<style>
  :global(html,body){
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    color: #0f172a;
    margin: 0;
  }

  /* header and nav moved to src/lib/Header.svelte - global styling kept for fonts */
</style>
