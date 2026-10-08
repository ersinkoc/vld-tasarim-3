import { createHighlighter } from "shiki";

let hl: Promise<Awaited<ReturnType<typeof createHighlighter>>> | null = null;

function getHighlighter() {
  if (!hl) {
    hl = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["typescript", "javascript", "bash", "json"],
    });
  }
  return hl;
}

/**
 * Highlight TypeScript/JS snippets with dual light+dark themes.
 * Emits CSS variables so the active theme can be switched purely in CSS.
 *
 * Wrapped in `use cache` so Shiki's internal `Date.now()` calls never trip
 * the prerender-time dynamic-value guard — the HTML is computed once at
 * build time and served from cache.
 */
export async function highlight(code: string, lang: "ts" | "js" | "bash" | "json" = "ts") {
  "use cache";
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}

export const SNIPPETS = {
  quickStart: `import { v } from '@oxog/vld';

const userSchema = v.object({
  name: v.string().min(2).max(100),
  email: v.string().email(),
  age: v.number().int().positive().optional(),
  role: v.enum('admin', 'user', 'guest').default('user'),
});

type User = v.infer<typeof userSchema>;

const result = userSchema.safeParse(payload);
// result.data  -> typed as User
// result.error -> VldError with structured issues`,

  zodToVld: `// before
import { z } from 'zod';
const schema = z.object({ email: z.string().email() });

// after — one line changed
import { v } from '@oxog/vld';
const schema = v.object({ email: v.string().email() });`,

  v2Pattern: `// Single __def per instance. Chain methods derive a new def.
// No per-instance field shadowing, no bound functions.

class VldStringV2 {
  __def: { checks: Check[]; type: 'string' };

  min(n: number) {
    return this.withDef({
      ...this.__def,
      checks: [...this.__def.checks, new VldCheckMin(n)],
    });
  }

  check(value: unknown): Issue | null {
    for (const c of this.__def.checks) {
      const issue = c.check(value);
      if (issue) return issue;
    }
    return null;
  }
}`,

  mini: `import { string, number, object, optional } from '@oxog/vld/mini';

// Standalone functions — zero wrapper overhead,
// fully tree-shakeable.

const userSchema = object({
  name: string().min(2),
  age: optional(number().positive()),
});`,

  errors: `import { v, flattenError, treeifyError, prettifyError } from '@oxog/vld';

const result = schema.safeParse(input);

if (!result.success) {
  // Form-ready
  const { fieldErrors, formErrors } = flattenError(result.error);
  // Terminal-ready
  console.log(prettifyError(result.error));
  // UI-tree ready
  render(treeifyError(result.error));
}`,

  locale: `import { v, setLocale } from '@oxog/vld';

setLocale('tr');

userSchema.safeParse({ name: 'A' });
// → "name" alanı en az 2 karakter olmalı

// Lazy variant — only ships the locale you use
import { setLocaleAsync } from '@oxog/vld/locales/lazy';
await setLocaleAsync('ja');`,

  plugin: `import { definePlugin, usePlugin, v } from '@oxog/vld';

const phonePlugin = definePlugin({
  name: 'phone-validator',
  version: '1.0.0',
  validators: {
    phone: () => v.string().regex(/^\\+?[1-9]\\d{1,14}$/),
  },
});

usePlugin(phonePlugin);

const schema = v.object({ phone: v.phone() });`,

  codec: `import { stringToNumber, jsonCodec, base64ToBytes } from '@oxog/vld';

stringToNumber.parse('42');   // 42
stringToNumber.encode(42);   // '42'

const json = jsonCodec();
json.parse('{"id":1}');      // { id: 1 }
json.encode({ id: 1 });      // '{"id":1}'

base64ToBytes.parse('SGVsbG8=');`,
} as const;