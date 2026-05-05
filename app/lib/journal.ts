import raw from "../data/journal.json";
import type { ProseBlock } from "./blocks";
import type { Lang } from "./copy";

type LocalizedBody = {
  title: string;
  excerpt: string;
  body: ProseBlock[];
};

type RawArticle = {
  slug: string;
  tag: Record<Lang, string>;
  publishedAt: string;
  readMinutes: number;
  fr: LocalizedBody;
  en: LocalizedBody;
};

export type Article = {
  slug: string;
  tag: string;
  publishedAt: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
  body: ProseBlock[];
};

const ARTICLES = raw as RawArticle[];

const DATE_FMT: Record<Lang, Intl.DateTimeFormatOptions> = {
  fr: { day: "2-digit", month: "long", year: "numeric" },
  en: { month: "long", day: "numeric", year: "numeric" },
};

const READ_LABEL: Record<Lang, (n: number) => string> = {
  fr: (n) => `${n} min`,
  en: (n) => `${n} min`,
};

function project(article: RawArticle, lang: Lang): Article {
  const localized = article[lang];
  return {
    slug: article.slug,
    tag: article.tag[lang],
    publishedAt: article.publishedAt,
    date: new Date(article.publishedAt).toLocaleDateString(
      lang === "fr" ? "fr-FR" : "en-US",
      { ...DATE_FMT[lang], timeZone: "Europe/Paris" }
    ),
    read: READ_LABEL[lang](article.readMinutes),
    title: localized.title,
    excerpt: localized.excerpt,
    body: localized.body,
  };
}

export function getArticles(lang: Lang): Article[] {
  return ARTICLES.map((a) => project(a, lang)).sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getArticle(lang: Lang, slug: string): Article | null {
  const found = ARTICLES.find((a) => a.slug === slug);
  return found ? project(found, lang) : null;
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
