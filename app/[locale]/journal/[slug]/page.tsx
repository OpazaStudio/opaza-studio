import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prose } from "../../../components/Prose";
import { COPY, LOCALES, isLocale } from "../../../lib/copy";
import { getAllSlugs, getArticle } from "../../../lib/journal";
import { SITE_NAME } from "../../../lib/site";

export function generateStaticParams() {
  const slugs = getAllSlugs();
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
  const article = getArticle(locale, slug);
  if (!article) return {};

  return {
    title: `${article.title} · ${SITE_NAME}`,
    description: article.excerpt,
    alternates: {
      canonical: `/${locale}/journal/${slug}`,
      languages: {
        "fr-FR": `/fr/journal/${slug}`,
        "en-US": `/en/journal/${slug}`,
        "x-default": `/fr/journal/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      url: `/${locale}/journal/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = getArticle(locale, slug);
  if (!article) notFound();
  const j = COPY[locale].journal;

  return (
    <main className="section article-page">
      <div className="shell article-shell">
        <Link
          href={`/${locale}/journal`}
          className="link mono article-back"
        >
          {j.backToIndex}
        </Link>

        <header className="article-head">
          <div className="article-meta mono">
            <span className="journal-tag">{article.tag}</span>
            <span>{j.publishedOn} {article.date}</span>
            <span>{article.read}</span>
          </div>
          <h1 className="h2 article-title">{article.title}</h1>
          <p className="lede article-excerpt">{article.excerpt}</p>
        </header>

        <article className="article-body">
          <Prose blocks={article.body} />
        </article>
      </div>
    </main>
  );
}
