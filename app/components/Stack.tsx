import type { Copy, Lang } from "../lib/copy";

export function Stack({ copy, lang }: { copy: Copy["stack"]; lang: Lang }) {
  return (
    <section id="stack" className="section tight" data-screen-label="04 Stack">
      <div className="shell">
        <header className="section-head reveal" style={{ marginBottom: "3rem" }}>
          <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
          <h2 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          <p className="lede" style={{ marginTop: "1.4rem" }}>{copy.lede}</p>
        </header>

        <div className="stack-primary">
          {copy.primary.map((p) => (
            <div key={p.name} className="stack-card reveal">
              <StackGlyph name={p.name} />
              <div className="stack-card-body">
                <div className="stack-card-top">
                  <h3 className="h3" style={{ margin: 0 }}>{p.name}</h3>
                  <span className="mono">{p.v}</span>
                </div>
                <p className="body-sm" style={{ marginTop: "0.4rem" }}>{p.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="stack-secondary reveal">
          <span className="mono">{lang === "fr" ? "+ outils & intégrations" : "+ tools & integrations"}</span>
          <ul>
            {copy.secondary.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="marquee" style={{ marginTop: "5rem" }}>
        <div className="marquee-track">
          {[...copy.marquee, ...copy.marquee, ...copy.marquee].map((m, i) => (
            <span key={i} className="marquee-item">
              {m} <span className="dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackGlyph({ name }: { name: string }) {
  if (name === "Laravel") {
    return (
      <div className="stack-glyph">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <path d="M4 8 L20 4 L36 8 L36 32 L20 36 L4 32 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M20 4 L20 36 M4 8 L36 32 M36 8 L4 32" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
        </svg>
      </div>
    );
  }
  if (name === "Next.js") {
    return (
      <div className="stack-glyph">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M14 12 L14 28 M14 12 L26 28" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M26 12 L26 24" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === "Expo") {
    return (
      <div className="stack-glyph">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>
    );
  }
  return <div className="stack-glyph" />;
}
