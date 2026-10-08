"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Braces, Search } from "lucide-react";
import { API_GROUPS } from "@/lib/site-data";

export function ApiExplorer() {
  const [tab, setTab] = useState(API_GROUPS[0].id);
  const [query, setQuery] = useState("");

  const active = API_GROUPS.find((g) => g.id === tab)!;

  const filtered = active.items.filter(
    (it) =>
      !query.trim() ||
      it.sig.toLowerCase().includes(query.toLowerCase()) ||
      it.desc.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section
      id="api"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              <Braces className="size-3 text-cyan" />
              api surface
            </div>
            <h2 className="max-w-2xl text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
              Chainable, composable, unsurprising.
            </h2>
          </div>
          <label className="flex w-full items-center gap-2 rounded-xl border border-line bg-bg2/60 px-3.5 py-2.5 md:w-64">
            <Search className="size-3.5 shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter this group…"
              className="w-full bg-transparent font-mono text-[12.5px] outline-none placeholder:text-muted"
            />
          </label>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-bg2/50 backdrop-blur">
          <div className="flex gap-1 overflow-x-auto border-b border-line bg-bg3/40 p-2">
            {API_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setTab(g.id);
                  setQuery("");
                }}
                className={`relative shrink-0 rounded-lg px-3.5 py-2 font-mono text-[11.5px] transition-colors ${
                  tab === g.id ? "text-fg" : "text-muted hover:text-fgsoft"
                }`}
              >
                {tab === g.id && (
                  <motion.span
                    layoutId="api-tab"
                    className="absolute inset-0 rounded-lg bg-bg ring-1 ring-inset ring-line"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{g.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id + query}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-line"
            >
              {filtered.length === 0 && (
                <div className="px-5 py-10 text-center font-mono text-[12px] text-muted">
                  No match for “{query}” in {active.label}
                </div>
              )}
              {filtered.map((item, i) => (
                <div
                  key={item.sig}
                  className="group flex flex-col gap-1 px-5 py-3 transition-colors hover:bg-bg3/40 sm:flex-row sm:items-center sm:gap-6"
                >
                  <code className="shrink-0 font-mono text-[12.5px] text-accent sm:w-[248px]">
                    {item.sig}
                  </code>
                  <span className="text-[13px] text-muted transition-colors group-hover:text-fgsoft">
                    {item.desc}
                  </span>
                  <span className="hidden font-mono text-[10px] text-muted/50 sm:ml-auto sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}