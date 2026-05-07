import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Cursor } from "../components/Cursor";
import { Nav } from "../components/Nav";
import { COPY, LOCALES, isLocale, type Lang } from "../lib/copy";
import { SITE_META, SITE_NAME, SITE_URL } from "../lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

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
  const meta = SITE_META[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s · ${SITE_NAME}` },
    description: meta.description,
    applicationName: SITE_NAME,
    authors: [{ name: "Ethan Huot", url: SITE_URL }],
    creator: "Ethan Huot",
    publisher: SITE_NAME,
    category: "technology",
    keywords: meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "fr-FR": "/fr",
        "en-US": "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => SITE_META[l].ogLocale
      ),
      url: `/${locale}`,
      siteName: SITE_NAME,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDE3D2" },
    { media: "(prefers-color-scheme: dark)", color: "#3D2517" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang: Lang = locale;
  const copy = COPY[lang];

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Cursor />
        <div className="grain" />
        <Nav copy={copy.nav} lang={lang} />
        {children}
      </body>
    </html>
  );
}
