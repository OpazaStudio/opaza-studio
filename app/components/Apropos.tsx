import type { Copy } from "../lib/copy";

export function Apropos({ copy }: { copy: Copy["apropos"] }) {
  return (
    <section id="apropos" className="section" data-screen-label="05 À propos">
      <div className="shell apropos-grid">
        <div className="apropos-left reveal">
          <div className="eyebrow" style={{ marginBottom: "1.2rem" }}>{copy.eyebrow}</div>
          <h2 className="h2" dangerouslySetInnerHTML={{ __html: copy.title }} />
          <div className="apropos-portrait" aria-label="portrait placeholder">
            <PortraitPlaceholder />
            <div className="mono apropos-portrait-label">portrait · ethan</div>
          </div>
        </div>

        <div className="apropos-right">
          <div className="reveal">
            {copy.bio.map((p, i) => (
              <p
                key={i}
                className="body"
                style={{ fontSize: "1.05rem", marginBottom: "1.4rem", maxWidth: "52ch" }}
              >
                {p}
              </p>
            ))}
          </div>

          <dl className="apropos-facts reveal">
            {copy.facts.map(([k, v]) => (
              <div key={k} className="fact">
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="apropos-block reveal">
            <h3 className="apropos-block-title">{copy.collabs.title}</h3>
            <ul className="apropos-collabs">
              {copy.collabs.list.map(([name, role]) => (
                <li key={name}>
                  <span className="apropos-collab-name">{name}</span>
                  <span className="hr-tiny" />
                  <span className="body-sm">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="apropos-block reveal">
            <h3 className="apropos-block-title">{copy.distinctions.title}</h3>
            <ul className="apropos-distinctions">
              {copy.distinctions.list.map((d, i) => (
                <li key={i}>
                  <span className="num">{(i + 1).toString().padStart(2, "0")}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="portrait-ph">
      <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        <defs>
          <pattern id="port-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <rect width="6" height="6" fill="#DCC9A8" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#A88968" strokeWidth="0.6" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="200" height="260" fill="url(#port-stripes)" />
        <circle cx="100" cy="105" r="32" fill="none" stroke="#5C4033" strokeWidth="1" opacity="0.3" />
        <path d="M50 230 Q100 175 150 230" fill="none" stroke="#5C4033" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}
