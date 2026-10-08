import { ArrowRight, Repeat2 } from "lucide-react";
import { CodeBlock } from "./code-block";
import { SNIPPETS } from "@/lib/code";

const STEPS = [
  {
    title: "Install",
    body: "Same package manager you already use. One dependency, zero transitive tree.",
  },
  {
    title: "Swap the import",
    body: "z becomes v. Every chain method keeps its name, arity and error shape.",
  },
  {
    title: "Run parity",
    body: "259 of 259 Zod 4.6 exports verified per release by the CI parity script.",
  },
];

export async function DropIn() {
  return (
    <section
      id="dropin"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute right-[-10%] top-1/4 size-[520px] rounded-full opacity-[0.11] blur-[120px] animate-drift"
          style={{ background: "var(--accent-3)", animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              <Repeat2 className="size-3 text-magenta" />
              migration
            </div>
            <h2 className="text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
              Migrating from Zod is one changed line.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              VLD deliberately mirrors Zod&apos;s API surface instead of
              inventing a new one. Subpaths, error shapes, and issue payloads
              line up — so the diff stays reviewable and your tests barely move.
            </p>

            <ol className="mt-9 space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-line bg-bg2 font-mono text-[11px] text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <div className="text-[14px] font-medium">{s.title}</div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                      {s.title === "Swap the import" ? (
                        <>
                          <code className="font-mono text-accent">z</code> becomes{" "}
                          <code className="font-mono text-accent">v</code>. Every
                          chain method keeps its name, arity and error shape.
                        </>
                      ) : (
                        s.body
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href="https://github.com/ersinkoc/vld#readme"
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-9 inline-flex items-center gap-2 rounded-xl border border-line bg-bg2/60 px-4 py-2.5 font-mono text-[12.5px] transition-colors hover:border-linestrong"
            >
              Read the migration guide
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="space-y-4">
            <CodeBlock code={SNIPPETS.zodToVld} file="migration.diff" />
            <CodeBlock code={SNIPPETS.v2Pattern} file="src/internal/pattern.ts" />

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { k: "@oxog/vld", d: "main entry" },
                { k: "@oxog/vld/v4/core", d: "zod core shape" },
                { k: "@oxog/vld/mini", d: "tree-shakeable" },
                { k: "@oxog/vld/v4-mini", d: "mini + zod shape" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-xl border border-line bg-bg2/50 p-3 font-mono"
                >
                  <div className="truncate text-[11.5px] text-fg">{s.k}</div>
                  <div className="mt-0.5 text-[10px] text-muted">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}