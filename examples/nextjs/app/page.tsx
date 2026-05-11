import {
  commonloomAssetBasePath,
  commonloomDiagnostics,
  commonloomDocuments,
} from '../src/generated/commonloom-content';

const [compiledDocument] = commonloomDocuments;

export default function Home() {
  if (!compiledDocument) {
    return (
      <main className="commonloom-example">
        <section className="commonloom-shell">
          <h1>No Commonloom content generated.</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="commonloom-example">
      <section className="commonloom-shell">
        <header className="commonloom-header">
          <div>
            <p className="commonloom-kicker">Next.js integration</p>
            <h1 className="commonloom-title">{compiledDocument.title}</h1>
            <p className="commonloom-summary">{compiledDocument.summary}</p>
          </div>
          <img
            className="commonloom-logo"
            src={`${commonloomAssetBasePath}/commonloom-logo-light-transparent.png`}
            alt="Commonloom logo"
          />
        </header>

        <div className="commonloom-grid">
          <article
            className="commonloom-card commonloom-rendered"
            dangerouslySetInnerHTML={{ __html: compiledDocument.bodyHtml }}
          />
          <aside className="commonloom-card commonloom-meta">
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
    </main>
  );
}

