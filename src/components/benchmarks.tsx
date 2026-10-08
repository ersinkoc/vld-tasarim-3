"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Gauge } from "lucide-react";
import { BENCHMARKS } from "@/lib/site-data";

function formatOps(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 100_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function Benchmarks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  const max = Math.max(...BENCHMARKS.map((b) => Math.max(b.vld, b.zod)));

  return (
    <section
      id="benchmarks"
      ref={ref}
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
      >
        <div
          className="absolute left-1/2 top-0 size-[700px] -translate-x-1/2 rounded-full opacity-[0.1] blur-[130px]"
          style={{ background: "var(--accent)" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              <Gauge className="size-3 text-accent" />
              throughput
            </div>
            <h2 className="max-w-2xl text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-balance">
              Numbers the CI suite refuses to let regress.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-muted">
            Every commit runs the benchmark gate against Zod. If a change makes
            the hot path slower or heavier, the build fails. These bars are
            repo data, not marketing copy.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-bg2/60 backdrop-blur">
          <div className="flex items-center gap-4 border-b border-line px-5 py-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-fg">
              <span className="size-2 rounded-sm bg-accent" /> vld
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="size-2 rounded-sm bg-linestrong" /> zod 4.5
            </span>
            <span className="ml-auto hidden font-mono text-[10.5px] text-muted sm:block">
              1M safeParse ops · same machine
            </span>
          </div>

          <div className="divide-y divide-line">
            {BENCHMARKS.map((b, i) => {
              const ratio = b.vld / b.zod;
              const active = hovered === i;
              return (
                <div
                  key={b.name}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative px-5 py-4 transition-colors hover:bg-bg3/40"
                >
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-[13.5px] font-medium">{b.name}</span>
                      <span className="font-mono text-[10.5px] text-muted">
                        {b.note}
                      </span>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={
                        inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
                      }
                      transition={{ delay: 0.35 + i * 0.08, type: "spring", stiffness: 320 }}
                      className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${
                        active
                          ? "bg-accent text-bg"
                          : "bg-accentsoft text-accentink"
                      }`}
                    >
                      {ratio.toFixed(1)}x
                    </motion.span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-5 flex-1 overflow-hidden rounded bg-bg3/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: inView ? `${(b.vld / max) * 100}%` : 0,
                          }}
                          transition={{ duration: 1, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded bg-accent"
                        />
                      </div>
                      <span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums text-fgsoft">
                        {formatOps(b.vld)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 flex-1 overflow-hidden rounded bg-bg3/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: inView ? `${(b.zod / max) * 100}%` : 0,
                          }}
                          transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded bg-linestrong"
                        />
                      </div>
                      <span className="w-14 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted">
                        {formatOps(b.zod)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Throughput", v: "11x+", d: "vs Zod, release gated" },
            { k: "Memory", v: "4.7x less", d: "1.6–10x across schemas" },
            { k: "V2 vs Zod 4.6.4", v: "3.03x", d: "10/10 honest wins" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-xl border border-line bg-bg2/40 p-4 backdrop-blur"
            >
              <div className="font-mono text-[10.5px] text-muted">{s.k}</div>
              <div className="mt-1 text-[22px] font-semibold tracking-tight text-accent">
                {s.v}
              </div>
              <div className="mt-0.5 font-mono text-[10.5px] text-muted">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}