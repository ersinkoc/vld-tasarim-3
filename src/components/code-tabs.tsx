"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

type Tab = { id: string; label: string; file: string; note: string };

export function CodeTabs({
  tabs,
  panels,
}: {
  tabs: Tab[];
  panels: ReactNode[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`relative rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
              active === i
                ? "border-linestrong bg-bg3"
                : "border-line bg-bg2/40 hover:border-linestrong hover:bg-bg2"
            }`}
          >
            <div
              className={`font-mono text-[12.5px] ${
                active === i ? "text-fg" : "text-fgsoft"
              }`}
            >
              {t.label}
            </div>
            <div className="mt-0.5 font-mono text-[10px] text-muted">{t.file}</div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabs[active].id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          {panels[active]}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 rounded-xl border border-line bg-bg3/40 p-4 font-mono text-[11px] leading-relaxed text-muted">
        {tabs[active].note}
      </p>
    </div>
  );
}