"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const format = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timezone }).format(new Date());

/** Current local time (site.timezone) — a small signal of where and when I work. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="eyebrow flex items-center gap-2" aria-label={time ? `Local time in Saudi Arabia: ${time}` : "Local time in Saudi Arabia"}>
      <span>KSA</span>
      <span className="tabular-nums text-ink-2" suppressHydrationWarning>
        {time ?? "--:--"}
      </span>
      <span className="text-ink-3">GMT+3</span>
    </p>
  );
}
