import type { Lang } from "./copy";

export const SITE_URL = "https://opaza.studio";

export const SITE_NAME = "Opaza Studio";

type LocaleMeta = {
  title: string;
  description: string;
  ogLocale: string;
  keywords: string[];
};

const SHARED_KEYWORDS = [
  "Opaza Studio",
  "La Rochelle",
  "Next.js",
  "Laravel",
  "Expo",
  "React Native",
  "Core Web Vitals",
];

export const SITE_META: Record<Lang, LocaleMeta> = {
  fr: {
    title: "Opaza Studio — Pensé, conçu, livré.",
    description:
      "Opaza Studio · La Rochelle. Conception, design et développement d'applications web et mobiles, du brief à la mise en ligne. Ethan, développeur fullstack indépendant.",
    ogLocale: "fr_FR",
    keywords: [
      ...SHARED_KEYWORDS,
      "développeur fullstack",
      "freelance",
      "studio indépendant",
      "développement web",
      "développement mobile",
      "applications web",
      "applications mobiles",
      "SEO",
    ],
  },
  en: {
    title: "Opaza Studio — Designed, built, shipped.",
    description:
      "Opaza Studio · La Rochelle, France. Independent fullstack developer designing and building web and mobile apps, from brief to launch. Single point of contact: Ethan.",
    ogLocale: "en_US",
    keywords: [
      ...SHARED_KEYWORDS,
      "fullstack developer",
      "freelance",
      "independent studio",
      "web development",
      "mobile development",
      "web apps",
      "mobile apps",
      "SEO",
    ],
  },
};
