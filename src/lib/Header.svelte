<script>
  export let repo = 'https://github.com/nelsonjchen/whisp-stamp';
  export let replicate = 'https://replicate.com/vaibhavs10/incredibly-fast-whisper';
</script>

<header>
  <nav>
    <a href="/" class="brand">Whisp Stamp</a>
    <div class="spacer"></div>
    <a href={replicate} target="_blank" rel="noopener noreferrer">Replicate model</a>
    <a href={repo} target="_blank" rel="noopener noreferrer">GitHub</a>
  </nav>
</header>

<style>
  header{background: #fff;border-bottom: 1px solid #eee;backdrop-filter: blur(4px)}
  nav{max-width:1100px;margin:0 auto;display:flex;gap:1rem;align-items:center;padding:.5rem 1rem}
  .brand{font-weight:700;font-size:1.05rem;color:#111;text-decoration:none}
  .spacer{flex:1}
  nav a{color:inherit;text-decoration:none;font-size:.95rem}
  nav a:hover{color:#0ea5e9}
</style>
