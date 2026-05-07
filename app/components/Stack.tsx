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
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener"
              className="stack-card reveal"
              aria-label={`${p.name} — ${lang === "fr" ? "site officiel" : "official site"}`}
            >
              <StackGlyph name={p.name} />
              <div className="stack-card-body">
                <div className="stack-card-top">
                  <h3 className="h3" style={{ margin: 0 }}>{p.name}</h3>
                  <span className="mono">{p.v}</span>
                </div>
                <p className="body-sm" style={{ marginTop: "0.4rem" }}>{p.role}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="stack-secondary reveal">
          <span className="mono">{lang === "fr" ? "+ outils & intégrations" : "+ tools & integrations"}</span>
          <ul>
            {copy.secondary.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener">{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="marquee" style={{ marginTop: "5rem" }}>
        <div className="marquee-track">
          {[0, 1, 2].flatMap((iter) =>
            copy.marquee.map((m, i) => {
              const isDuplicate = iter > 0;
              return (
                <span key={`${iter}-${i}`} className="marquee-item">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener"
                    aria-hidden={isDuplicate || undefined}
                    tabIndex={isDuplicate ? -1 : 0}
                  >
                    {m.name}
                  </a>{" "}
                  <span className="dot" aria-hidden />
                </span>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

const STACK_GLYPHS: Record<string, string> = {
  Laravel: "/laravel.svg",
  "Next.js": "/next.svg",
  Expo: "/expo.svg",
};

function StackGlyph({ name }: { name: string }) {
  const src = STACK_GLYPHS[name];
  if (!src) return <div className="stack-glyph" />;
  return (
    <div className="stack-glyph">
      <img src={src} alt={`${name} logo`} width={40} height={40} />
    </div>
  );
}
