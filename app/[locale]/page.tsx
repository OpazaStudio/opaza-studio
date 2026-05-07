import { notFound } from "next/navigation";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Methode } from "../components/Methode";
import { Stack } from "../components/Stack";
import { Apropos } from "../components/Apropos";
import { Journal } from "../components/Journal";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { COPY, HERO_TITLE_KEY, isLocale } from "../lib/copy";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = COPY[locale];

  return (
    <>
      <main id="top">
        <Hero copy={copy.hero} lang={locale} heroTitleKey={HERO_TITLE_KEY} />
        <Services copy={copy.services} />
        <Methode copy={copy.methode} />
        <Stack copy={copy.stack} lang={locale} />
        <Apropos copy={copy.apropos} />
        <Journal copy={copy.journal} lang={locale} />
        <Contact copy={copy.contact} lang={locale} />
      </main>
      <Footer copy={copy.footer} lang={locale} />
    </>
  );
}
