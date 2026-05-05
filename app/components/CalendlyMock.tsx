"use client";

import { useState } from "react";
import type { Lang } from "../lib/copy";

export function CalendlyMock({ lang }: { lang: Lang }) {
  const days = lang === "fr"
    ? ["Lun", "Mar", "Mer", "Jeu", "Ven"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const dates = [4, 5, 6, 7, 8];
  const slots = ["09:00", "10:30", "14:00", "15:30", "17:00"];
  const [pick, setPick] = useState({ d: 1, s: 2 });
  return (
    <div className="calendly-mock">
      <div className="calendly-head">
        <div>
          <div className="mono" style={{ opacity: 0.7 }}>
            {lang === "fr" ? "appel découverte" : "discovery call"}
          </div>
          <div className="calendly-title">30 min · CET</div>
        </div>
        <div className="mono" style={{ opacity: 0.7 }}>
          {lang === "fr" ? "mai 2026" : "May 2026"}
        </div>
      </div>
      <div className="calendly-week">
        {days.map((d, i) => (
          <button
            key={d}
            className={"cal-day" + (pick.d === i ? " on" : "")}
            onClick={() => setPick({ ...pick, d: i })}
          >
            <span className="mono">{d}</span>
            <span className="cal-date">{dates[i]}</span>
          </button>
        ))}
      </div>
      <div className="calendly-slots">
        {slots.map((s, i) => (
          <button
            key={s}
            className={"cal-slot" + (pick.s === i ? " on" : "")}
            onClick={() => setPick({ ...pick, s: i })}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
