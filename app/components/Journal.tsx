import Link from "next/link";
import type { Copy, Lang } from "../lib/copy";
import { getArticles } from "../lib/journal";

export function Journal({
  copy,
  lang,
}: {
  copy: Copy["journal"];
  lang: Lang;
}) {
  const articles = getArticles(lang);

  return (
    <section
      id="journal"
      className="section"
      data-screen-label="06 Journal"
      style={{ background: "var(--cream)" }}
    >
      <div className="shell">
        <header className="section-head reveal journal-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
            <h2 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          </div>
          <p className="lede" style={{ marginTop: 0 }}>{copy.lede}</p>
        </header>

        <ul className="journal-list">
          {articles.map((a, i) => (
            <li key={a.slug} className="journal-row reveal">
              <Link
                href={`/${lang}/journal/${a.slug}`}
                className="journal-row-link"
              >
                <span className="num journal-num">{(i + 1).toString().padStart(2, "0")}</span>
                <div className="journal-row-body">
                  <div className="journal-row-meta">
                    <span className="mono journal-tag">{a.tag}</span>
                    <span className="mono">{a.date}</span>
                    <span className="mono">{a.read}</span>
                  </div>
                  <h3 className="h3 journal-row-title">{a.title}</h3>
                  <p className="body journal-row-excerpt">{a.excerpt}</p>
                </div>
                <span className="journal-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="journal-foot reveal">
          <Link href={`/${lang}/journal`} className="link terracotta">
            {copy.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
