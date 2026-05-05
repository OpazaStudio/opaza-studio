import Link from "next/link";
import type { Copy, Lang } from "../lib/copy";
import { getLegalPages } from "../lib/legal";

const SOCIAL: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ethan-huot-opaza-studio/" },
  { label: "GitHub", href: "https://github.com/dardaelliande" },
];

export function Footer({ copy, lang }: { copy: Copy["footer"]; lang: Lang }) {
  const legalPages = getLegalPages(lang);

  return (
    <footer className="site-footer" data-screen-label="08 Footer">
      <div className="shell">
        <div className="footer-display">
          <span>Opaza<em>.</em></span>
        </div>
        <div className="footer-grid">
          <div>
            <div className="mono" style={{ marginBottom: "0.6rem" }}>studio</div>
            <div>{copy.sign}</div>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: "0.6rem" }}>contact</div>
            <div>ethan@opaza.studio</div>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: "0.6rem" }}>social</div>
            <ul className="footer-social">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    className="link"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: "0.6rem" }}>
              {lang === "fr" ? "légal" : "legal"}
            </div>
            <ul className="footer-legal">
              {legalPages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${lang}/legal/${p.slug}`}
                    className="link"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{copy.year}</span>
          <span className="mono">{copy.mention}</span>
        </div>
      </div>
    </footer>
  );
}
