import { Cpu, Layers, Check } from "lucide-react";
import { CodeBlock } from "./code-block";
import { SNIPPETS } from "@/lib/code";

const STAGES = [
  {
    n: "01",
    title: "Single __def",
    body: "One field holds the whole validator state. Chain methods return a new def instead of shadowing fields onto the instance.",
  },
  {
    n: "02",
    title: "Checks as objects",
    body: "Constraints are class instances with a check(value) method. Nothing is allocated per parse call, so the hot path stays allocation-free.",
  },
  {
    n: "03",
    title: "Precomputed isSimple",
    body: "Whether a validator can take a fast path is computed once at construction, then read as a boolean on every parse.",
  },
];

export async function HowItWorks() {
  return (
    <section
      id="internals"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_70%_50%,#000,transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              <Cpu className="size-3 text-accent" />
              internals
            </div>
            <h2 className="text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
              The V2 pattern, and why it wins.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              V3 ships the V2 shape as opt-in factories. It follows Zod 4.5&apos;s
              memoization idea without the per-instance bound-function trick, so
              you get the same semantics and a smaller, faster footprint.
            </p>

            <div className="mt-9 space-y-5">
              {STAGES.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-[11px] text-accent">
                    {s.n}
                  </span>
                  <div>
                    <div className="text-[14px] font-medium">{s.title}</div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { v: "3.03x", l: "vs Zod 4.6.4" },
                { v: "10/10", l: "head-to-head wins" },
                { v: "1.6–10x", l: "less memory" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-line bg-bg2/50 p-3.5"
                >
                  <div className="font-mono text-[18px] font-semibold tracking-tight text-accent">
                    {s.v}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-muted">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-line bg-bg2/40 p-3.5">
              <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
              <p className="font-mono text-[11.5px] leading-relaxed text-muted">
                Non-breaking: <span className="text-fgsoft">v.*</span> still
                returns V1 by default. Opt in with{" "}
                <span className="text-fgsoft">
                  import {"{ vV2 as v }"}
                </span>{" "}
                or flip <span className="text-fgsoft">v.setV2Mode(true)</span>.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <CodeBlock code={SNIPPETS.v2Pattern} file="v2-pattern.ts" />
            <CodeBlock code={SNIPPETS.mini} file="mini.ts" />
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-bg2/50 p-4">
              <Layers className="size-4 shrink-0 text-cyan" />
              <p className="text-[13px] leading-relaxed text-muted">
                V2 validators compose as children of V1 composites and vice
                versa — migrate one hot path at a time instead of all at once.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}