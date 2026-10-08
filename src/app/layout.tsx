import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/lib/theme";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Nav } from "@/components/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://vld.oxog.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VLD — Ultra-Fast TypeScript Validation",
    template: "%s · VLD",
  },
  description:
    "Zero-dependency TypeScript validation with drop-in Zod parity, 32 built-in locales, tree-shakeable mini API, and a release-gated parse hot path.",
  keywords: [
    "typescript",
    "validation",
    "schema",
    "zod alternative",
    "zod",
    "type-safe",
    "zero dependency",
    "i18n",
    "runtime validation",
  ],
  authors: [{ name: "Ersin KOC", url: "https://github.com/ersinkoc" }],
  creator: "Ersin KOC",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "VLD",
    title: "VLD — Ultra-Fast TypeScript Validation",
    description:
      "Zero dependencies. Drop-in Zod parity. 32 locales. A parse hot path your CI has to guard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VLD — Ultra-Fast TypeScript Validation",
    description:
      "Zero dependencies. Drop-in Zod parity. 32 locales. A parse hot path your CI has to guard.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05060a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f1" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
          suppressHydrationWarning
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll />
          <Nav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}