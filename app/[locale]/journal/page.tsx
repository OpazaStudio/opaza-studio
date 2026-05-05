import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COPY, LOCALES, isLocale } from "../../lib/copy";
import { getArticles } from "../../lib/journal";
import { SITE_NAME } from "../../lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const j = COPY[locale].journal;
  const stripped = j.title.replace(/<[^>]+>/g, "");
  return {
    title: `${stripped} · ${SITE_NAME}`,
    description: j.lede,
    alternates: {
      canonical: `/${locale}/journal`,
      languages: {
        "fr-FR": "/fr/journal",
        "en-US": "/en/journal",
        "x-default": "/fr/journal",
      },
    },
  };
}

export default async function JournalIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = COPY[locale].journal;
  const articles = getArticles(locale);

  return (
    <main className="section">
      <div className="shell">
        <header className="section-head" style={{ marginBottom: "3rem" }}>
          <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
          <h1 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          <p className="lede" style={{ marginTop: "1.6rem" }}>{copy.lede}</p>
        </header>

        <ul className="journal-list">
          {articles.map((a, i) => (
            <li key={a.slug} className="journal-row">
              <Link
                href={`/${locale}/journal/${a.slug}`}
                className="journal-row-link"
              >
                <span className="num journal-num">{(i + 1).toString().padStart(2, "0")}</span>
                <div className="journal-row-body">
                  <div className="journal-row-meta">
                    <span className="mono journal-tag">{a.tag}</span>
                    <span className="mono">{a.date}</span>
                    <span className="mono">{a.read}</span>
                  </div>
                  <h2 className="h3 journal-row-title">{a.title}</h2>
                  <p className="body journal-row-excerpt">{a.excerpt}</p>
                </div>
                <span className="journal-arrow">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "3rem" }}>
          <Link href={`/${locale}`} className="link">
            ← {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
          </Link>
        </div>
      </div>
    </main>
  );
}
