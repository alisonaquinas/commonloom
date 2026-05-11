<script lang="ts">
  import {
    commonloomAssetBasePath,
    commonloomDiagnostics,
    commonloomDocuments,
  } from './generated/commonloom-content';

  const compiledDocument = commonloomDocuments[0];
</script>

<main class="commonloom-example">
  {#if compiledDocument}
    <section class="commonloom-shell">
      <header class="commonloom-header">
        <div>
          <p class="commonloom-kicker">Svelte integration</p>
          <h1 class="commonloom-title">{compiledDocument.title}</h1>
          <p class="commonloom-summary">{compiledDocument.summary}</p>
        </div>
        <img
          class="commonloom-logo"
          src={`${commonloomAssetBasePath}/commonloom-logo-light-transparent.png`}
          alt="Commonloom logo"
        />
      </header>

      <div class="commonloom-grid">
        <article class="commonloom-card commonloom-rendered">
          {@html compiledDocument.bodyHtml}
        </article>
        <aside class="commonloom-card commonloom-meta">
          <dl>
            <dt>Content hash</dt>
            <dd>{compiledDocument.trace.contentHash.slice(0, 12)}</dd>
            <dt>Headings</dt>
            <dd>{compiledDocument.trace.headings.length}</dd>
            <dt>Links</dt>
            <dd>{compiledDocument.trace.links.length}</dd>
            <dt>Diagnostics</dt>
            <dd>{commonloomDiagnostics.length}</dd>
          </dl>
        </aside>
      </div>
    </section>
  {:else}
    <section class="commonloom-shell">
      <h1>No Commonloom content generated.</h1>
    </section>
  {/if}
</main>
