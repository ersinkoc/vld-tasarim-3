"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Languages, Globe2 } from "lucide-react";
import { v, setLocale, getSupportedLocales } from "@oxog/vld";
import { LOCALES } from "@/lib/site-data";

/* A schema whose error messages we can watch change language live. */
const schema = v.object({
  email: v.string().email(),
  age: v.number().int().positive(),
});

const SAMPLE = { email: "not-an-email", age: -3 };

const RTL = new Set(["ar"]);

export function I18nShowcase() {
  const [code, setCode] = useState("en");

  const messages = useMemo(() => {
    try {
      setLocale(code as Parameters<typeof setLocale>[0]);
      const r = schema.safeParse(SAMPLE);
      if (r.success) return [];
      return r.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      }));
    } catch {
      return [];
    }
  }, [code]);

  const isRtl = RTL.has(code);

  return (
    <section
      id="i18n"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-[12%] top-[20%] size-[460px] rounded-full opacity-[0.12] blur-[130px] animate-drift"
          style={{ background: "var(--accent-2)" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
            <Languages className="size-3 text-warn" />
            internationalization
          </div>
          <h2 className="mx-auto max-w-3xl text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            Your users read errors in their own language.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            Pick a language. This is the actual{" "}
            <code className="font-mono text-fgsoft">@oxog/vld</code> bundle
            validating the same invalid payload — switch locale, re-parse.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          {/* locale picker */}
          <div className="rounded-2xl border border-line bg-bg2/50 p-4 backdrop-blur">
            <div className="mb-3 flex items-center gap-2 px-1 font-mono text-[11px] text-muted">
              <Globe2 className="size-3.5" />
              {getSupportedLocales().length} locales registered
            </div>
            <div className="grid max-h-[330px] grid-cols-2 gap-1.5 overflow-y-auto pr-1 [mask-image:linear-gradient(to_bottom,#000_calc(100%-28px),transparent)] sm:grid-cols-3">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setCode(l.code)}
                  className={`group rounded-lg border px-2.5 py-2 text-left transition-all ${
                    code === l.code
                      ? "border-accent/50 bg-accentsoft"
                      : "border-line bg-bg3/40 hover:border-linestrong"
                  }`}
                >
                  <div
                    className={`font-mono text-[11px] uppercase tracking-wide ${
                      code === l.code ? "text-accentink" : "text-fgsoft"
                    }`}
                  >
                    {l.code}
                  </div>
                  <div className="truncate text-[10.5px] text-muted">
                    {l.native}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* live output */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-[var(--code-bg)]">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
              <span className="font-mono text-[10.5px] text-white/40">
                setLocale(&apos;{code}&apos;)
              </span>
              <span className="ml-auto font-mono text-[10px] text-white/25">
                safeParse
              </span>
            </div>

            <div className="p-4">
              <pre className="mb-4 overflow-x-auto font-mono text-[12px] leading-relaxed text-white/45">
                <span className="text-white/60">const</span> r ={" "}
                <span className="text-cyan">schema</span>.
                <span className="text-cyan">safeParse</span>({"{"} email:{"\u0027"}
                not-an-email{"\u0027"}, age: -3 {"}"});
              </pre>

              <AnimatePresence mode="wait">
                <motion.div
                  key={code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24 }}
                  className="space-y-2"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {messages.map((m, i) => (
                    <motion.div
                      key={`${code}-${i}`}
                      initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.28 }}
                      className="rounded-lg border border-white/8 bg-white/4 p-3"
                    >
                      <span className="me-2 rounded bg-danger/20 px-1.5 py-0.5 font-mono text-[9.5px] text-[#ff8f9a]">
                        {m.path}
                      </span>
                      <span className="font-mono text-[11.5px] leading-relaxed text-white/85">
                        {m.message}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/8 pt-3">
                {["en", "tr", "de", "ja", "ar"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCode(c)}
                    className={`rounded-md px-2 py-1 font-mono text-[10px] transition-colors ${
                      code === c
                        ? "bg-white text-black"
                        : "bg-white/8 text-white/50 hover:text-white/80"
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <span className="ms-auto font-mono text-[10px] text-white/25">
                  lazy: @oxog/vld/locales/lazy
                </span>
              </div>

              <div className="mt-6 grid gap-2 border-t border-white/8 pt-5">
                {[
                  {
                    t: "One call, whole surface",
                    d: "setLocale() rewrites every validator's messages at once — no per-schema wiring.",
                  },
                  {
                    t: "Lazy when it matters",
                    d: "setLocaleAsync() dynamic-imports a single language, so you ship only what you use.",
                  },
                  {
                    t: "RTL aware",
                    d: "Arabic ships with correct direction handling, not just translated strings.",
                  },
                ].map((n) => (
                  <div key={n.t} className="flex gap-2.5">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-white/25" />
                    <div>
                      <div className="font-mono text-[11px] text-white/75">
                        {n.t}
                      </div>
                      <p className="mt-0.5 font-mono text-[10.5px] leading-relaxed text-white/35">
                        {n.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}