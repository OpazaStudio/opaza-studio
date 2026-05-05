import type { MetadataRoute } from "next";
import { LOCALES } from "./lib/copy";
import { getAllSlugs } from "./lib/journal";
import { getLegalSlugs } from "./lib/legal";
import { SITE_URL } from "./lib/site";

function localizedAlts(path: (locale: string) => string): Record<string, string> {
  return {
    "fr-FR": path("fr"),
    "en-US": path("en"),
    "x-default": path("fr"),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "fr" ? 1 : 0.9,
    alternates: { languages: localizedAlts((l) => `${SITE_URL}/${l}`) },
  }));

  const journalIndex = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}/journal`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: { languages: localizedAlts((l) => `${SITE_URL}/${l}/journal`) },
  }));

  const articles = getAllSlugs().flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/journal/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: localizedAlts((l) => `${SITE_URL}/${l}/journal/${slug}`),
      },
    }))
  );

  const legalIndex = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}/legal`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
    alternates: { languages: localizedAlts((l) => `${SITE_URL}/${l}/legal`) },
  }));

  const legalPages = getLegalSlugs().flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/legal/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: {
        languages: localizedAlts((l) => `${SITE_URL}/${l}/legal/${slug}`),
      },
    }))
  );

  return [...home, ...journalIndex, ...articles, ...legalIndex, ...legalPages];
}
