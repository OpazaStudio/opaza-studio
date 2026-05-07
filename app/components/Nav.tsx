"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Copy, Lang } from "../lib/copy";

type Props = {
  copy: Copy["nav"];
  lang: Lang;
};

const RING_R = 28;
const RING_C = 2 * Math.PI * RING_R;

export function Nav({ copy, lang }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homePath = `/${lang}`;
  const isHome = pathname === homePath;

  const markRef = useRef<HTMLAnchorElement>(null);
  const discRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const railNumRef = useRef<HTMLSpanElement>(null);
  const railBarFillRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const openRef = useRef(false);
  const headerOnDarkRef = useRef(false);

  useEffect(() => {
    const applyDiscClass = () => {
      discRef.current?.classList.toggle(
        "on-dark",
        headerOnDarkRef.current && !openRef.current
      );
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String((1 - p) * RING_C);
      }
      if (railNumRef.current) {
        railNumRef.current.textContent = Math.round(p * 100)
          .toString()
          .padStart(2, "0");
      }
      if (railBarFillRef.current) {
        railBarFillRef.current.style.height = p * 100 + "%";
      }

      const probe = (x: number, y: number) => {
        const stack = document.elementsFromPoint(x, y);
        for (const el of stack) {
          if (!el) continue;
          if (
            el.closest(
              ".nav-mark, .nav-disc, .nav-rail, .nav-overlay, .cursor, .cursor-trail, .grain"
            )
          )
            continue;
          return !!el.closest(".section.dark");
        }
        return false;
      };
      const w = window.innerWidth;
      const h = window.innerHeight;

      const headerOnDark =
        probe(60, 30) || probe(60, 60) || probe(w - 60, 30) || probe(w - 60, 60);
      const railRect = railRef.current?.getBoundingClientRect();
      const railX = railRect ? Math.max(8, railRect.left + railRect.width / 2) : 20;
      const railOnDark =
        probe(railX, h * 0.3) || probe(railX, h * 0.5) || probe(railX, h * 0.7);

      headerOnDarkRef.current = headerOnDark;
      markRef.current?.classList.toggle("on-dark", headerOnDark);
      railRef.current?.classList.toggle("on-dark", railOnDark);
      applyDiscClass();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    openRef.current = open;
    discRef.current?.classList.toggle(
      "on-dark",
      headerOnDarkRef.current && !open
    );
    discRef.current?.classList.toggle("open", open);

    document.body.style.overflow = open ? "hidden" : "";

    const ov = overlayRef.current;
    if (!ov) return;
    if (open) {
      ov.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 420, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" }
      );
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        el.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 600,
            delay: 200 + i * 80,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          }
        );
      });
    } else {
      ov.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 280, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" }
      );
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: [string, string][] = [
    ["services", copy.services],
    ["methode", copy.methode],
    ["journal", copy.journal],
    ["apropos", copy.apropos],
  ];

  // Pinned to Europe/Paris so SSR and client agree on the rendered date.
  const todayLabel = new Date().toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-GB",
    { day: "2-digit", month: "short", timeZone: "Europe/Paris" }
  );

  return (
    <>
      {isHome ? (
        <a ref={markRef} href="#top" className="nav-mark">
          Opaza<span className="logo-dot">.</span>
        </a>
      ) : (
        <Link ref={markRef} href={homePath} className="nav-mark">
          Opaza<span className="logo-dot">.</span>
        </Link>
      )}

      <button
        ref={discRef}
        className="nav-disc"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg className="nav-disc-ring" viewBox="0 0 60 60" aria-hidden="true">
          <circle
            cx="30"
            cy="30"
            r={RING_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.25"
          />
          <circle
            ref={ringRef}
            cx="30"
            cy="30"
            r={RING_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C}
            transform="rotate(-90 30 30)"
            style={{ transition: "stroke-dashoffset 200ms ease-out" }}
          />
        </svg>
        <span className="nav-disc-bars">
          <span />
          <span />
          <span />
        </span>
        <span className="nav-disc-label mono">
          {open ? (lang === "fr" ? "fermer" : "close") : "menu"}
        </span>
      </button>

      <aside ref={railRef} className="nav-rail" aria-hidden="true">
        <span className="mono nav-rail-top">opaza · studio</span>
        <span className="mono nav-rail-bottom">
          <span ref={railNumRef} className="num">00</span>
          <span className="nav-rail-bar">
            <span ref={railBarFillRef} style={{ height: "0%" }} />
          </span>
        </span>
      </aside>

      <div
        ref={overlayRef}
        className={"nav-overlay" + (open ? " on" : "")}
        onClick={() => setOpen(false)}
        style={{ opacity: 0 }}
      >
        <div className="nav-overlay-inner" onClick={(e) => e.stopPropagation()}>
          <div className="nav-overlay-meta mono">
            <span>— navigation</span>
            <span>2026 / {todayLabel}</span>
          </div>
          <ul className="nav-overlay-list">
            {items.map(([id, label], i) => (
              <li key={id} ref={(el) => { itemsRef.current[i] = el; }}>
                <a href={"#" + id} onClick={() => setOpen(false)}>
                  <span className="num nav-overlay-num">{(i + 1).toString().padStart(2, "0")}</span>
                  <span className="nav-overlay-label">{label}</span>
                  <span className="nav-overlay-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-overlay-foot">
            <div className="lang-toggle">
              <Link
                href="/fr"
                className={lang === "fr" ? "on" : ""}
                onClick={() => setOpen(false)}
              >
                fr
              </Link>
              <span>/</span>
              <Link
                href="/en"
                className={lang === "en" ? "on" : ""}
                onClick={() => setOpen(false)}
              >
                en
              </Link>
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary">
              <span className="dot" style={{ background: "var(--cream)" }} />
              {copy.cta} →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
