"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import { Playground } from "./playground";
import { ValidationGate } from "./validation-gate";
import { INSTALL_COMMANDS, type PkgManager } from "@/lib/site-data";

const MANAGERS: PkgManager[] = ["npm", "pnpm", "yarn", "bun"];

/** Mouse-follow spotlight for the hero shell. */
function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return { ref, pos, active };
}

const HEADLINE_WORDS = [
  { text: "Validation", accent: false },
  { text: "at", accent: false },
  { text: "the", accent: false },
  { text: "speed", accent: true },
  { text: "of", accent: false },
  { text: "light.", accent: false },
];

export function Hero() {
  const { ref, pos, active } = useSpotlight<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [manager, setManager] = useState<PkgManager>("npm");
  const [copied, setCopied] = useState(false);

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMANDS[manager]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* backdrop layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_20%,transparent_75%)]" />
        <div
          className="absolute -top-40 left-[8%] size-[560px] rounded-full opacity-[0.16] blur-[110px] animate-drift"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -top-24 right-[4%] size-[480px] rounded-full opacity-[0.13] blur-[120px] animate-drift"
          style={{
            background: "var(--accent-2)",
            animationDelay: "-8s",
          }}
        />
        <div
          className="absolute top-[38%] left-[42%] size-[420px] rounded-full opacity-[0.09] blur-[130px] animate-drift"
          style={{ background: "var(--accent-3)", animationDelay: "-15s" }}
        />
        <div className="absolute inset-0 grain" style={{ opacity: "var(--grain-opacity)" }}>
          <svg className="size-full" aria-hidden>
            <filter id="grain-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" />
          </svg>
        </div>
      </div>

      {/* the streaming gate canvas */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <ValidationGate />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex justify-center">
          <motion.a
            href="#benchmarks"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg2/70 py-1.5 pl-1.5 pr-3.5 backdrop-blur transition-colors hover:border-linestrong"
          >
            <span className="flex items-center gap-1 rounded-full bg-accentsoft px-2 py-0.5 font-mono text-[10px] font-medium text-accentink">
              <Sparkles className="size-2.5" /> v3.0.11
            </span>
            <span className="text-[12.5px] text-muted">
              30.7x faster than Zod on nullish parse
            </span>
            <ArrowRight className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </div>

        <h1 className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-[0.26em] text-center text-[clamp(2.6rem,8.2vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.035em]">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word.text}
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                delay: 0.14 + i * 0.075,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className={word.accent ? "text-accent" : undefined}>
                {word.text}
              </span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mx-auto mt-7 max-w-2xl text-center text-[15px] leading-relaxed text-muted text-balance sm:text-[17px]"
        >
          A zero-dependency TypeScript validation library with drop-in Zod
          parity, 32 built-in locales, and a parse hot path so short your CI
          has to guard it from regressing.
        </motion.p>

        {/* install bar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.74 }}
          className="mx-auto mt-9 flex w-full max-w-2xl flex-col gap-2 sm:flex-row"
        >
          <div className="glass flex flex-1 items-center gap-1 overflow-x-auto rounded-xl border border-line p-1 shadow-lg">
            <div className="flex shrink-0 items-center">
              {MANAGERS.map((m) => (
                <button
                  key={m}
                  onClick={() => setManager(m)}
                  className={`relative rounded-lg px-3 py-1.5 font-mono text-[11.5px] transition-colors ${
                    manager === m
                      ? "text-fg"
                      : "text-muted hover:text-fgsoft"
                  }`}
                >
                  {manager === m && (
                    <motion.span
                      layoutId="pkg-tab"
                      className="absolute inset-0 rounded-lg bg-bg3 ring-1 ring-inset ring-line"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{m}</span>
                </button>
              ))}
            </div>
            <code className="flex-1 truncate px-2.5 py-1.5 font-mono text-[12.5px] text-fgsoft">
              <span className="text-muted">$ </span>
              {INSTALL_COMMANDS[manager]}
            </code>
          </div>
          <button
            onClick={copyInstall}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-fg px-5 py-3 font-mono text-[12.5px] font-medium text-bg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </motion.div>

        {/* trust row */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11.5px] text-muted"
        >
          {[
            "0 dependencies",
            "259/259 zod exports",
            "32 locales",
            "2633 tests",
            "100% coverage",
            "MIT",
          ].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </motion.ul>

        {/* spotlight playground */}
        <motion.div
          id="playground"
          ref={ref}
          initial={{ opacity: 0, y: 48, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16"
          style={{ perspective: 1400 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-16 transition-opacity duration-500"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, var(--accent-soft), transparent 65%)`,
            }}
          />
          <div className="relative z-10">
            <Playground />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}