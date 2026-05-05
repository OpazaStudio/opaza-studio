import type { Copy } from "../lib/copy";
import { MethodeSticky } from "./MethodeSticky";

export function Methode({ copy }: { copy: Copy["methode"] }) {
  return (
    <section id="methode" className="section dark" data-screen-label="03 Méthode">
      <MethodeBackdrop />
      <div className="shell">
        <header className="section-head reveal">
          <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
          <h2 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          <p
            className="lede"
            style={{ marginTop: "1.6rem", color: "var(--cream)", fontStyle: "italic" }}
          >
            {copy.lede}
          </p>
        </header>
        <MethodeSticky steps={copy.steps} />
      </div>
    </section>
  );
}

function MethodeBackdrop() {
  return (
    <div className="methode-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <pattern id="meth-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(232,148,106,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meth-grid)" />
      </svg>
    </div>
  );
}
