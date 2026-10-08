"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      <span className="hidden sm:inline">{copied ? "copied" : "copy"}</span>
    </button>
  );
}