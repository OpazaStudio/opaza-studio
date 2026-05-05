import type { Copy } from "../lib/copy";

export function Services({ copy }: { copy: Copy["services"] }) {
  return (
    <section id="services" className="section" data-screen-label="02 Services">
      <div className="shell">
        <header className="section-head reveal">
          <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
          <h2 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          <p className="lede" style={{ marginTop: "1.6rem" }}>{copy.lede}</p>
        </header>

        <div className="services-list">
          {copy.items.map((it) => (
            <article key={it.n} className="svc-row svc-row-static reveal open">
              <header className="svc-row-head svc-row-head-static">
                <span className="num svc-num">({it.n})</span>
                <span className="svc-row-title">{it.title}</span>
                <span className="mono svc-row-tag">{it.tag}</span>
              </header>
              <div className="svc-row-body">
                <div className="svc-row-content">
                  <p className="body" style={{ maxWidth: "55ch" }}>{it.body}</p>
                  <ul className="svc-deliv">
                    {it.deliverables.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
