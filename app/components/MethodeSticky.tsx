"use client";

import { useEffect, useRef, useState } from "react";
import type { Copy } from "../lib/copy";

export function MethodeSticky({ steps }: { steps: Copy["methode"]["steps"] }) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 880px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-r.top, 0), total);
      const ratio = total > 0 ? passed / total : 0;
      const idx = Math.min(steps.length - 1, Math.floor(ratio * steps.length));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [steps.length, isMobile]);

  if (isMobile) {
    return (
      <div className="methode-stack">
        {steps.map((s) => (
          <article key={s.n} className="meth-stack-item">
            <div className="num huge">{s.n}</div>
            <h3
              className="h2"
              style={{ fontSize: "clamp(2rem, 7vw, 3rem)", margin: "0.4rem 0 1rem" }}
            >
              {s.title}
            </h3>
            <p className="body">{s.body}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      className="methode-sticky"
      ref={stageRef}
      style={{ minHeight: steps.length * 90 + "vh" }}
    >
      <div className="meth-sticky-stage">
        <div className="meth-sticky-grid">
          <div className="meth-sticky-list">
            {steps.map((s, i) => (
              <button
                key={s.n}
                className={
                  "meth-sticky-item" +
                  (active === i ? " active" : "") +
                  (active > i ? " done" : "")
                }
                onClick={() => {
                  const stage = stageRef.current;
                  if (!stage) return;
                  const total = stage.offsetHeight - window.innerHeight;
                  const stageTop = stage.getBoundingClientRect().top + window.scrollY;
                  const targetRatio = (i + 0.1) / steps.length;
                  window.scrollTo({
                    top: stageTop + total * targetRatio,
                    behavior: "smooth",
                  });
                }}
              >
                <span className="num">{s.n}</span>
                <span className="meth-sticky-label">{s.title}</span>
              </button>
            ))}
          </div>
          <div className="meth-sticky-detail">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={"meth-sticky-panel" + (active === i ? " on" : "")}
              >
                <div className="num huge">{s.n}</div>
                <h3
                  className="h2"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", margin: "0.6rem 0 1.4rem" }}
                >
                  {s.title}
                </h3>
                <p className="body" style={{ fontSize: "1.05rem", maxWidth: "44ch" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
