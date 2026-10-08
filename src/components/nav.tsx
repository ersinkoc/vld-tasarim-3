"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { GitHubIcon } from "./github-icon";

const LINKS = [
  { href: "#benchmarks", label: "Benchmarks" },
  { href: "#features", label: "Features" },
  { href: "#playground", label: "Playground" },
  { href: "#api", label: "API" },
  { href: "#i18n", label: "i18n" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled
              ? "glass border-line shadow-lg"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="group flex shrink-0 items-center gap-2">
            <span className="relative grid size-7 place-items-center rounded-lg bg-fg text-bg">
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                <path
                  d="M4 6.5 12 2l8 4.5v11L12 22l-8-4.5z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="m8.5 12 2.4 2.4 4.6-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/15" />
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight">
              vld
              <span className="text-muted">.oxog.dev</span>
            </span>
          </Link>

          <div className="mx-auto hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-lg px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1.5 md:ml-0">
            <a
              href="https://github.com/ersinkoc/vld"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 font-mono text-[11.5px] text-muted transition-colors hover:border-linestrong hover:text-fg sm:flex"
            >
              <GitHubIcon />
              GitHub
            </a>

            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-line text-fg transition-colors hover:border-linestrong"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 14, opacity: 0, rotate: -40 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 40 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute"
                >
                  {theme === "dark" ? (
                    <Moon className="size-3.5" />
                  ) : (
                    <Sun className="size-3.5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid size-8 place-items-center rounded-lg border border-line md:hidden"
            >
              {open ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-x-3 top-[72px] z-40 md:hidden"
          >
            <div className="glass overflow-hidden rounded-2xl border border-line p-2 shadow-2xl">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-fgsoft transition-colors hover:bg-bg3"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://github.com/ersinkoc/vld"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 flex items-center gap-2 border-t border-line px-4 py-3 text-sm text-muted"
              >
                <GitHubIcon /> GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
