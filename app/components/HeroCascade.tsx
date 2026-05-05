"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "../lib/copy";

export function HeroCascade({
  words,
  titleKey,
  lang,
}: {
  words: string[];
  titleKey: string;
  lang: Lang;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const spans = ref.current.querySelectorAll(".w");
    spans.forEach((el, i) => {
      el.animate(
        [
          { opacity: 0, transform: "translateY(0.6em)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 900,
          delay: 80 + i * 110,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        }
      );
    });
  }, [titleKey, lang]);

  return (
    <h1
      ref={ref}
      className="display cascade"
      style={{ marginTop: 0, marginBottom: "2.2rem" }}
    >
      {words.map((w, i) => (
        <span
          key={titleKey + "-" + i}
          className="w"
          dangerouslySetInnerHTML={{ __html: w }}
        />
      ))}
    </h1>
  );
}
