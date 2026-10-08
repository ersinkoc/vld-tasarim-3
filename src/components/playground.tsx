"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { v } from "@oxog/vld";
import { Play, RotateCcw, TriangleAlert, CircleCheck, Loader } from "lucide-react";

/* ------------------------------------------------------------------ *
 * A real VLD schema, running in the visitor's browser.
 * ------------------------------------------------------------------ */

const signupSchema = v.object({
  email: v.string().email(),
  password: v.string().min(8),
  age: v.number().int().positive(),
  handle: v
    .string()
    .min(3)
    .max(16)
    .regex(/^[a-z0-9_]+$/),
  role: v.enum("admin", "user", "guest"),
  website: v.string().url().optional(),
});

const VALID_PAYLOAD = {
  email: "ada@lovelace.dev",
  password: "correct-horse",
  age: 36,
  handle: "ada_l",
  role: "admin",
  website: "https://lovelace.dev",
};

const PRESETS: { id: string; label: string; hint: string; value: unknown }[] = [
  {
    id: "valid",
    label: "Valid payload",
    hint: "Everything passes",
    value: VALID_PAYLOAD,
  },
  {
    id: "types",
    label: "Wrong types",
    hint: "string where number",
    value: { ...VALID_PAYLOAD, age: "thirty-six" },
  },
  {
    id: "formats",
    label: "Bad formats",
    hint: "email + url + regex",
    value: {
      ...VALID_PAYLOAD,
      email: "ada@not-an-email",
      website: "lovelace.dev",
      handle: "Ada Lovelace!!",
    },
  },
  {
    id: "missing",
    label: "Unknown key",
    hint: "strict rejection",
    value: { ...VALID_PAYLOAD, isAdmin: true },
  },
];

function jsonToSource(value: unknown) {
  return JSON.stringify(value, null, 2);
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export function Playground() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [activePreset, setActivePreset] = useState("valid");
  const [source, setSource] = useState(() => jsonToSource(VALID_PAYLOAD));
  const [copied, setCopied] = useState(false);
  const [ops, setOps] = useState(0);

  const result: {
    kind: "ok" | "issues" | "syntax";
    issues: { path: string; message: string; code?: string }[];
  } = useMemo(() => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(source);
    } catch (e) {
      return {
        kind: "syntax" as const,
        issues: [{ path: "", message: (e as Error).message, code: "syntax" }],
      };
    }
    const r = signupSchema.safeParse(parsed);
    if (r.success) return { kind: "ok" as const, issues: [] };
    return {
      kind: "issues" as const,
      issues: r.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
        code: String(i.code),
      })),
    };
  }, [source]);

  // Live throughput: actually parse as fast as the browser allows.
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let iterations = 0;
    const payload = VALID_PAYLOAD;
    const started = performance.now();

    const tick = () => {
      const chunkEnd = performance.now() + 12;
      while (performance.now() < chunkEnd) {
        for (let i = 0; i < 2000; i++) signupSchema.safeParse(payload);
        iterations += 2000;
      }
      const elapsed = (performance.now() - started) / 1000;
      setOps(Math.round(iterations / elapsed));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const applyPreset = useCallback((id: string) => {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setActivePreset(id);
    setSource(jsonToSource(preset.value));
  }, []);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }, [source]);

  const isOk = result.kind === "ok";
  const isSyntax = result.kind === "syntax";

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-line bg-bg2/80 shadow-2xl backdrop-blur-xl"
      style={{ boxShadow: "0 40px 120px -40px hsl(var(--shadow-color) / 0.55)" }}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-bg3/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-danger/70" />
          <span className="size-2.5 rounded-full bg-warn/70" />
          <span className="size-2.5 rounded-full bg-accent/70" />
        </div>
        <span className="font-mono text-[11px] tracking-wide text-muted">
          payload.json
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-muted">
            <Loader className="size-3 animate-spin" />
            <span className="tabular-nums">
              {ops > 0 ? `${(ops / 1_000_000).toFixed(1)}M` : "—"}
            </span>
            <span className="hidden sm:inline">parses/s</span>
          </span>
          <button
            onClick={copy}
            className="rounded-md border border-line bg-bg/60 px-2.5 py-1 font-mono text-[10px] text-muted transition-colors hover:border-linestrong hover:text-fg"
          >
            {copied ? "copied" : "copy"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* editor */}
        <div className="relative border-b border-line lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap gap-1.5 border-b border-line bg-bg3/30 p-2.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => applyPreset(p.id)}
                title={p.hint}
                className={`relative rounded-md px-2.5 py-1.5 font-mono text-[10.5px] transition-colors ${
                  activePreset === p.id
                    ? "bg-fg text-bg"
                    : "bg-bg3/70 text-muted hover:text-fg"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <textarea
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setActivePreset("");
            }}
            spellCheck={false}
            aria-label="JSON payload to validate"
            className="h-[290px] w-full resize-none bg-transparent p-4 font-mono text-[12.5px] leading-relaxed text-fgsoft outline-none selection:bg-accent selection:text-bg lg:h-[340px]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg2 to-transparent" />
        </div>

        {/* output */}
        <div className="flex flex-col bg-bg3/20">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted">safeParse()</span>
            <div className="ml-auto">
              {isOk && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 rounded-full bg-accentsoft px-2.5 py-1 font-mono text-[10px] font-medium text-accentink"
                >
                  <CircleCheck className="size-3" /> VALID
                </motion.span>
              )}
              {!isOk && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 rounded-full bg-dangersoft px-2.5 py-1 font-mono text-[10px] font-medium text-danger"
                >
                  <TriangleAlert className="size-3" />
                  {result.issues.length} ISSUE{result.issues.length > 1 ? "S" : ""}
                </motion.span>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3 lg:max-h-[340px]">
            {isOk && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-accent/25 bg-accentsoft/40 p-3"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <CircleCheck className="size-3.5 text-accent" />
                  <span className="font-mono text-[11px] text-accentink">
                    result.success === true
                  </span>
                </div>
                <p className="text-[12px] leading-relaxed text-fgsoft">
                  Parsed and type-narrowed without a single cast. The compiler
                  already knows this shape.
                </p>
                <div className="mt-2.5 rounded-md bg-bg/70 p-2.5 font-mono text-[10.5px] leading-relaxed text-muted">
                  <span className="text-magenta">type</span> User ={"{"}
                  <br />
                  &nbsp;&nbsp;email: string
                  <br />
                  &nbsp;&nbsp;password: string
                  <br />
                  &nbsp;&nbsp;age: number
                  <br />
                  &nbsp;&nbsp;handle: string
                  <br />
                  &nbsp;&nbsp;role: <span className="text-accent">&quot;admin&quot;</span> |{" "}
                  <span className="text-accent">&quot;user&quot;</span> |{" "}
                  <span className="text-accent">&quot;guest&quot;</span>
                  <br />
                  &nbsp;&nbsp;website?: string
                  <br />
                  {"}"}
                </div>
              </motion.div>
            )}

            {!isOk &&
              result.issues.map((issue, i) => (
                <motion.div
                  key={`${issue.path}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-lg border p-3 ${
                    isSyntax
                      ? "border-warn/30 bg-warn/8"
                      : "border-danger/25 bg-dangersoft/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] ${
                        isSyntax
                          ? "bg-warn/15 text-warn"
                          : "bg-danger/15 text-danger"
                      }`}
                    >
                      {isSyntax ? "SyntaxError" : (issue.code ?? "issue")}
                    </span>
                    {issue.path && (
                      <span className="font-mono text-[10.5px] text-muted">
                        at {issue.path}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-fgsoft">
                    {issue.message}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-bg3/40 px-4 py-2">
        <span className="font-mono text-[10px] text-muted">
          Runs the real @oxog/vld bundle in your browser — no mock.
        </span>
        <button
          onClick={() => applyPreset("valid")}
          className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-muted transition-colors hover:text-accent"
        >
          {activePreset === "valid" ? (
            <Play className="size-3" />
          ) : (
            <RotateCcw className="size-3" />
          )}
          reset
        </button>
      </div>
    </div>
  );
}