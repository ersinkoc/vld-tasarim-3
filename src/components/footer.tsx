import { Heart, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./github-icon";

const YEAR = new Date().getFullYear();

const COLUMNS = [
  {
    title: "Documentation",
    links: [
      { label: "README", href: "https://github.com/ersinkoc/vld#readme" },
      {
        label: "LLMS.md",
        href: "https://github.com/ersinkoc/vld/blob/main/LLMS.md",
      },
      {
        label: "Changelog",
        href: "https://github.com/ersinkoc/vld/blob/main/CHANGELOG.md",
      },
      {
        label: "npm package",
        href: "https://www.npmjs.com/package/@oxog/vld",
      },
    ],
  },
  {
    title: "Repository",
    links: [
      { label: "GitHub", href: "https://github.com/ersinkoc/vld" },
      {
        label: "Benchmarks",
        href: "https://github.com/ersinkoc/vld/tree/main/benchmarks",
      },
      {
        label: "Examples",
        href: "https://github.com/ersinkoc/vld/tree/main/examples",
      },
      { label: "Issues", href: "https://github.com/ersinkoc/vld/issues" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Contributing",
        href: "https://github.com/ersinkoc/vld/blob/main/CONTRIBUTING.md",
      },
      {
        label: "Security",
        href: "https://github.com/ersinkoc/vld/blob/main/SECURITY.md",
      },
      {
        label: "Code of conduct",
        href: "https://github.com/ersinkoc/vld/blob/main/CODE_OF_CONDUCT.md",
      },
      {
        label: "Discussions",
        href: "https://github.com/ersinkoc/vld/discussions",
      },
    ],
  },
];

const TICKER = [
  "0 dependencies",
  "259/259 zod exports",
  "32 locales",
  "2633 tests",
  "100% coverage",
  "tree-shakeable",
  "AOT compiled",
  "MIT licensed",
  "v3.0.11",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* marquee */}
      <div className="relative flex overflow-hidden border-b border-line py-3.5">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-8 font-mono text-[11.5px] whitespace-nowrap text-muted"
            >
              {t}
              <span className="size-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-lg bg-fg text-bg">
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
              </span>
              <span className="font-mono text-[15px] font-semibold">vld</span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">
              Ultra-fast TypeScript-first schema validation. Zero dependencies,
              drop-in Zod parity, 32 locales.
            </p>
            <a
              href="https://github.com/ersinkoc/vld"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-fg px-4 py-2.5 font-mono text-[12px] font-medium text-bg transition-transform hover:scale-[1.02]"
            >
              <GitHubIcon />
              Star on GitHub
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1 text-[13.5px] text-fgsoft transition-colors hover:text-accent"
                    >
                      {l.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="font-mono text-[11.5px] text-muted">
            &copy; {YEAR} Ersin KOC &mdash; MIT licensed
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[11.5px] text-muted">
            Made with{" "}
            <Heart className="size-3 fill-magenta text-magenta" /> and an
            unreasonable number of benchmark runs
          </p>
        </div>
      </div>
    </footer>
  );
}