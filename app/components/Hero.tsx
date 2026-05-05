import type { Copy, Lang } from "../lib/copy";
import { HeroCascade } from "./HeroCascade";

type Props = {
  copy: Copy["hero"];
  lang: Lang;
  heroTitleKey: string;
};

export function Hero({ copy, lang, heroTitleKey }: Props) {
  const titleKeys = Object.keys(copy.titles);
  const words = copy.titles[heroTitleKey] ?? copy.titles[titleKeys[0]];

  return (
    <header className="hero hero-asymmetric" data-screen-label="01 Hero">
      <div className="shell hero-grid">
        <div className="hero-main">
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>
            {copy.eyebrow}
          </div>
          <HeroCascade words={words} titleKey={heroTitleKey} lang={lang} />
          <div className="hero-sub-row">
            <p className="lede" style={{ margin: 0 }}>{copy.sub}</p>
          </div>
        </div>

        <aside className="hero-side">
          <div className="hero-side-block">
            <div className="mono" style={{ marginBottom: "0.6rem" }}>
              {lang === "fr" ? "promesse" : "promise"}
            </div>
            <div className="body" style={{ color: "var(--fg-strong)" }}>
              {lang === "fr"
                ? "Du brief à la mise en ligne, par un seul interlocuteur."
                : "From brief to launch, by a single point of contact."}
            </div>
          </div>
          <div className="hero-side-block">
            <div className="mono" style={{ marginBottom: "0.6rem" }}>stack</div>
            <div className="body" style={{ color: "var(--fg-strong)" }}>
              Laravel · Next.js · Expo
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}
