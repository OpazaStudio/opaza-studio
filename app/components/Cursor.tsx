"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const cur = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const target = useRef({ x: -100, y: -100 });
  const hot = useRef(false);
  const onDark = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const stack = document.elementsFromPoint(e.clientX, e.clientY);
      let dark = false;
      for (const el of stack) {
        if (!el) continue;
        if (el.closest(".grain, .cursor, .cursor-trail")) continue;
        dark = !!el.closest(".section.dark, .nav.scrolled.on-dark");
        break;
      }
      onDark.current = dark;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest && t.closest("a, button, .link, .svc-row-head, .cal-day, .cal-slot, .meth-sticky-item, .chip")) {
        hot.current = true;
      }
    };
    const onOut = () => { hot.current = false; };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    let raf = 0;
    const loop = () => {
      const p = pos.current;
      p.x += (target.current.x - p.x) * 0.45;
      p.y += (target.current.y - p.y) * 0.45;
      p.tx += (target.current.x - p.tx) * 0.15;
      p.ty += (target.current.y - p.ty) * 0.15;
      if (cur.current) {
        cur.current.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
        cur.current.classList.toggle("hot", hot.current);
        cur.current.classList.toggle("on-dark", onDark.current);
      }
      if (trail.current) {
        trail.current.style.transform = `translate(${p.tx}px, ${p.ty}px) translate(-50%, -50%)`;
        trail.current.classList.toggle("hot", hot.current);
        trail.current.classList.toggle("on-dark", onDark.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={trail} className="cursor-trail" />
      <div ref={cur} className="cursor" />
    </>
  );
}
