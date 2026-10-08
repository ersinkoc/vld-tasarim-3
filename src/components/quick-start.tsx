import { Rocket } from "lucide-react";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";
import { SNIPPETS } from "@/lib/code";

const TABS = [
  {
    id: "quick",
    label: "Quick start",
    file: "user.ts",
    note: "The full happy path: schema, inferred type, and a parse that never throws.",
    snippet: "quickStart",
  },
  {
    id: "errors",
    label: "Errors",
    file: "errors.ts",
    note: "One error object, three shapes: flattened for forms, pretty for terminals, treeified for UIs.",
    snippet: "errors",
  },
  {
    id: "codec",
    label: "Codecs",
    file: "codec.ts",
    note: "Declare a transform once and get both directions — decode for input, encode for output.",
    snippet: "codec",
  },
  {
    id: "locale",
    label: "Locale",
    file: "locale.ts",
    note: "setLocale switches every message. The lazy entry point ships only the languages you actually use.",
    snippet: "locale",
  },
  {
    id: "plugin",
    label: "Plugins",
    file: "plugin.ts",
    note: "definePlugin registers custom validators globally; they then read exactly like built-ins.",
    snippet: "plugin",
  },
] as const;

export async function QuickStart() {
  const panels = await Promise.all(
    TABS.map((t) =>
      CodeBlock({ code: SNIPPETS[t.snippet], file: t.file }),
    ),
  );

  return (
    <section
      id="quickstart"
      className="relative scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-[-5%] bottom-0 size-[480px] rounded-full opacity-[0.1] blur-[130px] animate-drift"
          style={{ background: "var(--accent)", animationDelay: "-11s" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
              <Rocket className="size-3 text-accent" />
              getting started
            </div>
            <h2 className="max-w-2xl text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
              Five minutes from zero to validated.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-muted">
            Pick a tab. Every snippet here runs against the published package —
            nothing is simplified for the sake of the docs.
          </p>
        </div>

        <CodeTabs tabs={[...TABS]} panels={panels} />
      </div>
    </section>
  );
}