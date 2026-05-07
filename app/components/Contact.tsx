import type { Copy, Lang } from "../lib/copy";
import { ContactForm } from "./ContactForm";

export function Contact({
  copy,
  lang,
}: {
  copy: Copy["contact"];
  lang: Lang;
}) {
  return (
    <section id="contact" className="section dark" data-screen-label="07 Contact">
      <div className="shell contact-grid">
        <div className="contact-left reveal">
          <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
          <h2 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          <p
            className="lede"
            style={{ marginTop: "1.6rem", color: "var(--cream)", fontStyle: "italic" }}
          >
            {copy.lede}
          </p>

          <div className="contact-direct">
            <div className="mono" style={{ marginBottom: "0.4rem" }}>
              {lang === "fr" ? "écrivez-moi directement" : "write to me directly"}
            </div>
            <a href={"mailto:" + copy.direct} className="contact-email">
              {copy.direct}
            </a>
            <div className="mono" style={{ marginTop: "0.4rem" }}>{copy.hours}</div>
          </div>
        </div>

        <ContactForm copy={copy} lang={lang} />
      </div>
    </section>
  );
}
