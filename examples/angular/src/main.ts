import '@angular/compiler';

import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import {
  commonloomAssetBasePath,
  commonloomDiagnostics,
  commonloomDocuments,
} from './generated/commonloom-content';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="commonloom-example">
      <section class="commonloom-shell">
        @if (compiledDocument; as document) {
          <header class="commonloom-header">
            <div>
              <p class="commonloom-kicker">Angular integration</p>
              <h1 class="commonloom-title">{{ document.title }}</h1>
              <p class="commonloom-summary">{{ document.summary }}</p>
            </div>
            <img
              class="commonloom-logo"
              [src]="assetBasePath + '/commonloom-logo-light-transparent.png'"
              alt="Commonloom logo"
            />
          </header>

          <div class="commonloom-grid">
            <article
              class="commonloom-card commonloom-rendered"
              [innerHTML]="document.bodyHtml"
            ></article>
            <aside class="commonloom-card commonloom-meta">
              <dl>
                <dt>Content hash</dt>
                <dd>{{ document.trace.contentHash.slice(0, 12) }}</dd>
                <dt>Headings</dt>
                <dd>{{ document.trace.headings.length }}</dd>
                <dt>Links</dt>
                <dd>{{ document.trace.links.length }}</dd>
                <dt>Diagnostics</dt>
                <dd>{{ diagnosticsCount }}</dd>
              </dl>
            </aside>
          </div>
        } @else {
          <h1>No Commonloom content generated.</h1>
        }
      </section>
    </main>
  `,
})
class CommonloomExampleComponent {
  readonly assetBasePath = commonloomAssetBasePath;
  readonly compiledDocument = commonloomDocuments[0] ?? null;
  readonly diagnosticsCount = commonloomDiagnostics.length;
}

bootstrapApplication(CommonloomExampleComponent).catch((error: unknown) => {
  console.error(error);
});

