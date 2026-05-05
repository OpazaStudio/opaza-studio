import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "../../lib/copy";
import { getLegalPages } from "../../lib/legal";
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
  const title = locale === "fr" ? "Informations légales" : "Legal information";
  const description =
    locale === "fr"
      ? "Mentions légales et politique de confidentialité d'opaza.studio."
      : "Legal notice and privacy policy for opaza.studio.";

  return {
    title: `${title} · ${SITE_NAME}`,
    description,
    alternates: {
      canonical: `/${locale}/legal`,
      languages: {
        "fr-FR": "/fr/legal",
        "en-US": "/en/legal",
        "x-default": "/fr/legal",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LegalIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pages = getLegalPages(locale);

  const heading = locale === "fr" ? "Informations légales" : "Legal information";
  const lede =
    locale === "fr"
      ? "Mentions et politiques applicables à opaza.studio."
      : "Notices and policies applicable to opaza.studio.";

  return (
    <main className="section">
      <div className="shell article-shell">
        <header className="article-head">
          <h1 className="h2 article-title">{heading}</h1>
          <p className="lede article-excerpt">{lede}</p>
        </header>

        <ul className="legal-list">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link href={`/${locale}/legal/${p.slug}`} className="legal-link">
                <span className="legal-link-title h3">{p.title}</span>
                <span className="legal-link-summary body-sm">{p.summary}</span>
                <span className="legal-link-arrow">→</span>
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
