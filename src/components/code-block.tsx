import { highlight } from "@/lib/code";
import { CopyButton } from "./copy-button";

type Props = {
  code: string;
  lang?: "ts" | "js" | "bash" | "json";
  file?: string;
  className?: string;
  bare?: boolean;
};

export async function CodeBlock({
  code,
  lang = "ts",
  file,
  className = "",
  bare = false,
}: Props) {
  const html = await highlight(code, lang);

  const inner = (
    <>
      {file && (
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
          <span className="font-mono text-[10.5px] text-white/40">{file}</span>
          <div className="ml-auto">
            <CopyButton code={code} />
          </div>
        </div>
      )}
      <div
        className="overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.75] [&_pre]:!bg-transparent [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );

  if (bare) return <>{inner}</>;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-[var(--code-bg)] ${className}`}
    >
      {inner}
    </div>
  );
}