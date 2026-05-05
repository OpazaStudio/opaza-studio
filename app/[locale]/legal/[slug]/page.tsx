import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prose } from "../../../components/Prose";
import { LOCALES, isLocale } from "../../../lib/copy";
import { getLegalPage, getLegalSlugs } from "../../../lib/legal";
import { SITE_NAME } from "../../../lib/site";

export function generateStaticParams() {
  const slugs = getLegalSlugs();
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = getLegalPage(locale, slug);
  if (!page) return {};

  return {
    title: `${page.title} · ${SITE_NAME}`,
    description: page.summary,
    alternates: {
      canonical: `/${locale}/legal/${slug}`,
      languages: {
        "fr-FR": `/fr/legal/${slug}`,
        "en-US": `/en/legal/${slug}`,
        "x-default": `/fr/legal/${slug}`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LegalDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = getLegalPage(locale, slug);
  if (!page) notFound();

  const backLabel =
    locale === "fr" ? "← Informations légales" : "← Legal information";
  const updatedLabel =
    locale === "fr" ? "Dernière mise à jour : " : "Last updated: ";

  return (
    <main className="section article-page">
      <div className="shell article-shell">
        <Link href={`/${locale}/legal`} className="link mono article-back">
          {backLabel}
        </Link>

        <header className="article-head">
          <h1 className="h2 article-title">{page.title}</h1>
          <p className="lede article-excerpt">{page.summary}</p>
        </header>

        <article className="article-body">
          <Prose blocks={page.body} />
        </article>

        <p className="mono legal-updated">
          {updatedLabel}
          <time dateTime={page.lastUpdated}>{page.lastUpdatedLabel}</time>
        </p>
      </div>
    </main>
  );
}
