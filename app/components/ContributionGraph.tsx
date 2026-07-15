"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVEL_COLORS = [
  "bg-white/[0.04]",
  "bg-indigo-900/60",
  "bg-indigo-700/70",
  "bg-indigo-500",
  "bg-indigo-400",
];

const LEVEL_LABELS = ["No contributions", "Low", "Medium", "High", "Very high"];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function groupIntoWeeks(days: ContribDay[]): ContribDay[][] {
  if (!days.length) return [];
  const firstDow = new Date(days[0].date).getDay();
  const padded: (ContribDay | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...days,
  ];
  const weeks: ContribDay[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    const chunk = padded.slice(i, i + 7);
    while (chunk.length < 7) chunk.push(null);
    weeks.push(chunk.map((d) => d ?? { date: "", count: 0, level: 0 as const }));
  }
  return weeks;
}

export default function ContributionGraph() {
  const [days, setDays]       = useState<ContribDay[]>([]);
  const [total, setTotal]     = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const prefersReducedMotion  = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://github-contributions-api.jogruber.de/v4/Mishal04?y=last", {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((json) => {
        setDays(json.contributions ?? []);
        setTotal(json.total?.lastYear ?? json.total ?? 0);
        setLoading(false);
      })
      .catch((err) => {
        if ((err as Error).name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const weeks = groupIntoWeeks(days);

  const monthLabels: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d.date !== "");
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: MONTHS[m], index: wi });
      lastMonth = m;
    }
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
        transition={{ duration: 0.6 }}
        className="w-full p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300 flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-white font-bold text-sm">Contribution Activity</h3>
          {!loading && !error && (
            <span className="text-[11px] text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
              {total.toLocaleString()} contributions this year
            </span>
          )}
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="flex gap-[3px] overflow-hidden animate-pulse" aria-label="Loading contribution graph" aria-busy="true">
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <div key={di} className="w-[10px] h-[10px] rounded-sm bg-white/[0.05]" />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p role="alert" className="text-gray-600 text-xs">Could not load contribution data.</p>
        )}

        {/* Graph */}
        {!loading && !error && weeks.length > 0 && (
          <div className="flex flex-col gap-1 overflow-x-auto pb-1" role="img" aria-label={`GitHub contribution graph — ${total.toLocaleString()} contributions this year`}>
            {/* Month labels */}
            <div className="flex gap-[3px] mb-0.5" aria-hidden="true">
              {weeks.map((_, wi) => {
                const label = monthLabels.find((m) => m.index === wi);
                return (
                  <div key={wi} className="w-[10px] shrink-0">
                    {label && (
                      <span className="text-[8px] text-gray-500 font-medium whitespace-nowrap">
                        {label.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Day cells */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px] shrink-0">
                  {week.map((day, di) => (
                    <div
                      key={day.date || `pad-${wi}-${di}`}
                      role={day.date ? "img" : undefined}
                      aria-label={
                        day.date
                          ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}, ${LEVEL_LABELS[day.level]} activity`
                          : undefined
                      }
                      title={day.date ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}` : undefined}
                      className={`w-[10px] h-[10px] rounded-sm transition-all duration-150 ${day.date ? "hover:scale-125 cursor-default" : "opacity-0"} ${LEVEL_COLORS[day.level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-2 justify-end" aria-label="Contribution level legend">
              <span className="text-[9px] text-gray-600">Less</span>
              {LEVEL_COLORS.map((cls, i) => (
                <div
                  key={i}
                  className={`w-[10px] h-[10px] rounded-sm ${cls}`}
                  aria-label={LEVEL_LABELS[i]}
                  title={LEVEL_LABELS[i]}
                />
              ))}
              <span className="text-[9px] text-gray-600">More</span>
            </div>
          </div>
        )}
      </m.div>
    </LazyMotion>
  );
}
