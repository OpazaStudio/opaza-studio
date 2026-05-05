"use client";

import { useEffect } from "react";

export function useReveals(deps: unknown[] = []) {
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal:not([data-revealed])");

    const animate = (el: HTMLElement, sib: number) => {
      el.setAttribute("data-revealed", "1");

      if (el.classList.contains("svc-row")) {
        const sweep = document.createElement("span");
        sweep.className = "svc-row-sweep";
        el.appendChild(sweep);
        const sweepAnim = sweep.animate(
          [
            { transform: "scaleX(0)", transformOrigin: "left center" },
            { transform: "scaleX(1)", transformOrigin: "left center", offset: 0.5 },
            { transform: "scaleX(0)", transformOrigin: "right center" },
          ],
          { duration: 1100, easing: "cubic-bezier(0.76, 0, 0.24, 1)", fill: "forwards" }
        );
        sweepAnim.onfinish = () => sweep.remove();

        const head = el.querySelector<HTMLElement>(".svc-row-head, .svc-row-head-static");
        const body = el.querySelector<HTMLElement>(".svc-row-body");
        [head, body].forEach((n, i) => {
          if (!n) return;
          n.animate(
            [
              { opacity: 0, letterSpacing: "0.08em", filter: "blur(2px)" },
              { opacity: 1, letterSpacing: "normal", filter: "blur(0)" },
            ],
            { duration: 720, delay: 280 + i * 80, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
          );
        });
        return;
      }

      el.animate(
        [
          { opacity: 0, transform: "translateY(28px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 900,
          delay: Math.min(sib, 6) * 70,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            const sib = target.parentElement
              ? Array.from(target.parentElement.children).indexOf(target)
              : 0;
            animate(target, sib);
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
