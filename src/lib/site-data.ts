export type Locale = { code: string; name: string; native: string };

export const LOCALES: Locale[] = [
  { code: "en", name: "English", native: "English" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "zh", name: "Chinese", native: "中文" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "nl", name: "Dutch", native: "Nederlands" },
  { code: "pl", name: "Polish", native: "Polski" },
  { code: "da", name: "Danish", native: "Dansk" },
  { code: "sv", name: "Swedish", native: "Svenska" },
  { code: "no", name: "Norwegian", native: "Norsk" },
  { code: "fi", name: "Finnish", native: "Suomi" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "sk", name: "Slovak", native: "Slovenčina" },
  { code: "sw", name: "Swahili", native: "Kiswahili" },
  { code: "af", name: "Afrikaans", native: "Afrikaans" },
  { code: "tg", name: "Tajik", native: "Тоҷикӣ" },
  { code: "pt-BR", name: "Portuguese (BR)", native: "Português (BR)" },
  { code: "es-MX", name: "Spanish (MX)", native: "Español (MX)" },
];

export type Benchmark = {
  name: string;
  vld: number;
  zod: number;
  unit: string;
  note: string;
};

export const BENCHMARKS: Benchmark[] = [
  {
    name: "Simple string",
    vld: 620_000_000,
    zod: 205_000_000,
    unit: "ops/s",
    note: "string().min(1)",
  },
  {
    name: "Number · positive int",
    vld: 253_000_000,
    zod: 27_800_000,
    unit: "ops/s",
    note: "number().int().positive()",
  },
  {
    name: "Discriminated union",
    vld: 35_000_000,
    zod: 8_500_000,
    unit: "ops/s",
    note: "3-member union",
  },
  {
    name: "Object parse",
    vld: 49_000_000,
    zod: 28_800_000,
    unit: "ops/s",
    note: "{ a: string, b: number }",
  },
  {
    name: "Nullish",
    vld: 214_000_000,
    zod: 7_000_000,
    unit: "ops/s",
    note: "string().nullish()",
  },
  {
    name: "Optional parse",
    vld: 213_000_000,
    zod: 56_000_000,
    unit: "ops/s",
    note: "number().optional()",
  },
];

export type Feature = {
  id: string;
  icon: string;
  title: string;
  body: string;
  accent: "accent" | "cyan" | "magenta" | "warn";
  stat?: { value: string; label: string };
  span?: string;
};

export const FEATURES: Feature[] = [
  {
    id: "speed",
    icon: "zap",
    title: "Release-gated speed",
    body: "CI refuses to merge a commit that slows the parse hot path. 11x+ throughput and 4.7x less memory than Zod, measured on every push — not promised once in a README.",
    accent: "accent",
    stat: { value: "30.7x", label: "fastest case" },
    span: "lg:col-span-2",
  },
  {
    id: "zero",
    icon: "package-x",
    title: "Zero dependencies",
    body: "Pure TypeScript. No transitive tree, no audit noise, nothing to keep patched.",
    accent: "cyan",
    stat: { value: "0", label: "runtime deps" },
  },
  {
    id: "dropin",
    icon: "replace",
    title: "Drop-in Zod parity",
    body: "Swap the import. VLD mirrors Zod's export surface — 259 of 259 exports on 4.6.4 — down to subpath and error shape.",
    accent: "magenta",
    stat: { value: "28/28", label: "parity tests" },
  },
  {
    id: "i18n",
    icon: "languages",
    title: "32 locales out of the box",
    body: "Error messages ship in 32 languages, eagerly or lazily loaded, RTL-aware. One call switches the whole surface.",
    accent: "warn",
    stat: { value: "32", label: "languages" },
  },
  {
    id: "infer",
    icon: "type",
    title: "Full static inference",
    body: "v.infer<typeof schema> extracts the exact type, no separate type declaration to drift out of sync.",
    accent: "accent",
  },
  {
    id: "mini",
    icon: "scissors",
    title: "Tree-shakeable mini",
    body: "@oxog/vld/mini is standalone functions with zero wrapper overhead — the smallest possible parse payload.",
    accent: "cyan",
  },
  {
    id: "result",
    icon: "git-branch",
    title: "Result pattern",
    body: "Ok, Err, match, tryCatch — functional error handling without exceptions or try/catch noise.",
    accent: "magenta",
  },
  {
    id: "codec",
    icon: "repeat",
    title: "Bidirectional codecs",
    body: "stringToNumber, jsonCodec, base64ToBytes, hexToBytes — declare the transform once, get decode and encode for free.",
    accent: "warn",
  },
  {
    id: "coverage",
    icon: "shield-check",
    title: "100% coverage, 2633 tests",
    body: "Every validator is tested against real application suites, not just happy-path unit fixtures.",
    accent: "accent",
    stat: { value: "100%", label: "coverage" },
  },
  {
    id: "plugins",
    icon: "puzzle",
    title: "Plugin system",
    body: "define your own validators once, register them globally, use them exactly like the built-ins.",
    accent: "cyan",
  },
  {
    id: "cli",
    icon: "terminal",
    title: "vld CLI",
    body: "Schema tooling ships in the package. No extra global install, no config file to keep in sync.",
    accent: "magenta",
  },
  {
    id: "compile",
    icon: "cpu",
    title: "AOT compilation",
    body: "validate() lazily compiles to source on first call — 2.8x to 33x faster than zod.validate(), and CSP-friendly with withParser.",
    accent: "warn",
    stat: { value: "33x", label: "validate()" },
  },
];

export type ApiGroup = {
  id: string;
  label: string;
  items: { sig: string; desc: string }[];
};

export const API_GROUPS: ApiGroup[] = [
  {
    id: "primitives",
    label: "Primitives",
    items: [
      { sig: "v.string()", desc: "Chainable string validator" },
      { sig: "v.number()", desc: "Chainable number validator" },
      { sig: "v.int() / v.int32()", desc: "Integer constraints" },
      { sig: "v.boolean()", desc: "Boolean validation" },
      { sig: "v.bigint()", desc: "BigInt validation" },
      { sig: "v.date()", desc: "Date validation" },
      { sig: "v.symbol()", desc: "Symbol validation" },
      { sig: "v.literal(x)", desc: "Exact value match" },
      { sig: "v.enum('a','b')", desc: "Closed value set" },
      { sig: "v.any() / unknown()", desc: "Escape hatches" },
    ],
  },
  {
    id: "formats",
    label: "String formats",
    items: [
      { sig: "v.email()", desc: "Email address" },
      { sig: "v.uuid()", desc: "RFC 4122 UUID" },
      { sig: "v.creditCard()", desc: "Luhn checksum verified" },
      { sig: "v.jwt()", desc: "JSON Web Token" },
      { sig: "v.cuid() / cuid2()", desc: "Collision-resistant IDs" },
      { sig: "v.nanoid() / ulid()", desc: "URL-safe IDs" },
      { sig: "v.ipv4() / ipv6()", desc: "IP addresses" },
      { sig: "v.iso.date()", desc: "ISO date & datetime" },
    ],
  },
  {
    id: "numbers",
    label: "Numbers",
    items: [
      { sig: ".min() / .max()", desc: "Inclusive bounds" },
      { sig: ".int()", desc: "Integer only" },
      { sig: ".positive()", desc: "Greater than zero" },
      { sig: ".multipleOf(5)", desc: "Exact divisor" },
      { sig: ".finite()", desc: "Reject NaN & Infinity" },
      { sig: ".safe()", desc: "Safe integer range" },
    ],
  },
  {
    id: "collections",
    label: "Objects & collections",
    items: [
      { sig: "v.object({...})", desc: "Shape validation" },
      { sig: ".strict()", desc: "Reject unknown keys" },
      { sig: ".partial()", desc: "All fields optional" },
      { sig: ".pick() / .omit()", desc: "Sculpt the shape" },
      { sig: "v.array() / v.tuple()", desc: "Sequences" },
      { sig: "v.record() / v.map()", desc: "Keyed collections" },
    ],
  },
  {
    id: "composition",
    label: "Composition",
    items: [
      { sig: "v.union()", desc: "Any member matches" },
      { sig: "v.discriminatedUnion()", desc: "Tagged unions" },
      { sig: "v.intersection()", desc: "All must match" },
      { sig: "v.xor()", desc: "Exactly one matches" },
      { sig: "v.lazy()", desc: "Recursive schemas" },
      { sig: ".superRefine()", desc: "Cross-field validation" },
    ],
  },
  {
    id: "errors",
    label: "Errors & results",
    items: [
      { sig: "safeParse()", desc: "No-throw parsing" },
      { sig: "prettifyError()", desc: "Human-readable output" },
      { sig: "treeifyError()", desc: "Nested tree for UI" },
      { sig: "flattenError()", desc: "fieldErrors + formErrors" },
      { sig: "Ok / Err / match()", desc: "Result pattern" },
      { sig: "tryCatch()", desc: "Wrap throwing code" },
    ],
  },
];

export const INSTALL_COMMANDS = {
  npm: "npm install @oxog/vld",
  pnpm: "pnpm add @oxog/vld",
  yarn: "yarn add @oxog/vld",
  bun: "bun add @oxog/vld",
} as const;

export type PkgManager = keyof typeof INSTALL_COMMANDS;