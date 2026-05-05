import raw from "../data/legal.json";
import type { ProseBlock } from "./blocks";
import type { Lang } from "./copy";

type LocalizedLegal = {
  title: string;
  summary: string;
  body: ProseBlock[];
};

type RawLegal = {
  slug: string;
  lastUpdated: string;
  fr: LocalizedLegal;
  en: LocalizedLegal;
};

export type LegalPage = {
  slug: string;
  title: string;
  summary: string;
  body: ProseBlock[];
  lastUpdated: string;
  lastUpdatedLabel: string;
};

const PAGES = raw as RawLegal[];

const DATE_FMT: Record<Lang, Intl.DateTimeFormatOptions> = {
  fr: { day: "2-digit", month: "long", year: "numeric" },
  en: { month: "long", day: "numeric", year: "numeric" },
};

function project(page: RawLegal, lang: Lang): LegalPage {
  const localized = page[lang];
  return {
    slug: page.slug,
    title: localized.title,
    summary: localized.summary,
    body: localized.body,
    lastUpdated: page.lastUpdated,
    lastUpdatedLabel: new Date(page.lastUpdated).toLocaleDateString(
      lang === "fr" ? "fr-FR" : "en-US",
      { ...DATE_FMT[lang], timeZone: "Europe/Paris" }
    ),
  };
}

export function getLegalPages(lang: Lang): LegalPage[] {
  return PAGES.map((p) => project(p, lang));
}

export function getLegalPage(lang: Lang, slug: string): LegalPage | null {
  const found = PAGES.find((p) => p.slug === slug);
  return found ? project(found, lang) : null;
}

export function getLegalSlugs(): string[] {
  return PAGES.map((p) => p.slug);
}
