"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContributionGraph from "./ContributionGraph";

const GITHUB_USERNAME = "Mishal04";

// Brand colors for known languages
const LANG_COLORS: Record<string, string> = {
  TypeScript:  "#3178C6",
  JavaScript:  "#F7DF1E",
  Python:      "#3572A5",
  HTML:        "#E34F26",
  CSS:         "#1572B6",
  "C++":       "#f34b7d",
  "C#":        "#178600",
  Java:        "#b07219",
  Go:          "#00ADD8",
  Rust:        "#dea584",
  PHP:         "#4F5D95",
  Ruby:        "#701516",
  Shell:       "#89e051",
  Vue:         "#41b883",
  Svelte:      "#ff3e00",
  Dart:        "#00B4AB",
  Kotlin:      "#A97BFF",
  Swift:       "#F05138",
};

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  profileUrl: string;
}

const FALLBACK: GitHubData = {
  publicRepos: 21,
  followers: 0,
  totalStars: 0,
  topLanguages: [
    { name: "JavaScript", count: 8 },
    { name: "TypeScript", count: 6 },
    { name: "HTML",       count: 5 },
    { name: "CSS",        count: 4 },
    { name: "Python",     count: 2 },
  ],
  profileUrl: `https://github.com/${GITHUB_USERNAME}`,
};

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => {
        // Always show something — use fallback values
        setData(FALLBACK);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  // Calculate percentage widths for language bars
  const maxCount = data?.topLanguages?.[0]?.count ?? 1;

  return (
    <section className="relative z-10 py-12 md:py-20 w-full overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-10 md:gap-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3 block">
            Open Source
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            GitHub <span className="text-indigo-400">Activity</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Consistently building and shipping. Here&apos;s a live snapshot of my coding activity.
          </p>
        </motion.div>

        {/* Stats + Languages grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        >
          {/* --- GitHub Profile Card --- */}
          <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300">
            <div className="flex items-center gap-3">
              {/* Octocat icon */}
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">github.com/{GITHUB_USERNAME}</p>
                <p className="text-gray-500 text-xs">Full-Stack Developer</p>
              </div>
            </div>

            {/* Stat rows */}
            <div className="grid grid-cols-2 gap-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                  ))
                : [
                    { label: "Repositories", value: data?.publicRepos ?? 0,            icon: "📁" },
                    { label: "Followers",    value: data?.followers ?? 0,              icon: "👥" },
                    { label: "Stars Earned", value: data?.totalStars ?? 0,             icon: "⭐" },
                    { label: "Languages",    value: data?.topLanguages?.length ?? 0,   icon: "💻" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-white font-bold text-lg leading-none">{item.value}</span>
                      <span className="text-gray-600 text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                    </div>
                  ))
              }
            </div>
          </div>

          {/* --- Top Languages Card --- */}
          <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.12] transition-all duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm">Top Languages</h3>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">by repo count</span>
            </div>

            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5 animate-pulse">
                    <div className="flex justify-between">
                      <div className="w-20 h-3 rounded bg-white/10" />
                      <div className="w-6 h-3 rounded bg-white/10" />
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/[0.05]">
                      <div className="h-full rounded-full bg-white/10" style={{ width: `${[60, 45, 75, 35, 55][i]}%` }} />
                    </div>
                  </div>
                ))
              : (data?.topLanguages ?? []).length === 0
                ? <p className="text-gray-600 text-sm">No language data available.</p>
                : (data?.topLanguages ?? []).map((lang, i) => {
                    const color = LANG_COLORS[lang.name] ?? "#6366f1";
                    const pct = Math.round((lang.count / maxCount) * 100);
                    return (
                      <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                            <span className="text-gray-300 text-xs font-medium">{lang.name}</span>
                          </div>
                          <span className="text-gray-600 text-[10px] font-mono">{lang.count} repo{lang.count !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="h-full rounded-full"
                            style={{ background: color }}
                          />
                        </div>
                      </motion.div>
                    );
                  })
            }
          </div>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <ContributionGraph />
        </motion.div>

        {/* GitHub CTA */}
        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-gray-300 hover:text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
          </svg>
          github.com/{GITHUB_USERNAME}
          <svg className="w-3.5 h-3.5 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>

      </div>
    </section>
  );
}
