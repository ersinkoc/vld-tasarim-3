"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Zap,
  PackageX,
  Replace,
  Languages,
  Type,
  Scissors,
  GitBranch,
  Repeat,
  ShieldCheck,
  Puzzle,
  Terminal,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { FEATURES, type Feature } from "@/lib/site-data";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  "package-x": PackageX,
  replace: Replace,
  languages: Languages,
  type: Type,
  scissors: Scissors,
  "git-branch": GitBranch,
  repeat: Repeat,
  "shield-check": ShieldCheck,
  puzzle: Puzzle,
  terminal: Terminal,
  cpu: Cpu,
};

const ACCENT_MAP = {
  accent: { text: "text-accent", bg: "bg-accentsoft", ring: "group-hover:border-accent/40" },
  cyan: { text: "text-cyan", bg: "bg-cyansoft", ring: "group-hover:border-cyan/40" },
  magenta: {
    text: "text-magenta",
    bg: "bg-magentasoft",
    ring: "group-hover:border-magenta/40",
  },
  warn: { text: "text-warn", bg: "bg-warn/10", ring: "group-hover:border-warn/40" },
} as const;

function Card({ feature, index }: { feature: Feature; index: number }) {
  const accent = ACCENT_MAP[feature.accent];
  const Icon = ICONS[feature.icon] ?? Zap;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-bg2/50 p-5 backdrop-blur transition-colors duration-300 hover:bg-bg2/80 ${accent.ring} ${feature.span ?? ""}`}
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at 50% 0%, var(--accent-soft), transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-xl ${accent.bg} ${accent.text} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon className="size-4.5" />
        </span>
        <h3 className="pt-1 text-[15px] font-semibold leading-snug tracking-tight">
          {feature.title}
        </h3>
      </div>

      <p className="relative mt-3.5 flex-1 text-[13.5px] leading-relaxed text-muted">
        {feature.body}
      </p>

      {feature.stat && (
        <div className="relative mt-4 flex items-baseline gap-2 border-t border-line pt-3.5">
          <span
            className={`font-mono text-[19px] font-semibold tracking-tight ${accent.text}`}
          >
            {feature.stat.value}
          </span>
          <span className="font-mono text-[10.5px] text-muted">
            {feature.stat.label}
          </span>
        </div>
      )}
    </motion.article>
  );
}

export function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-50"
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          >
            what you get
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mx-auto max-w-3xl text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance"
          >
            Everything a validation layer needs, nothing it doesn&apos;t.
          </motion.h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Card key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}