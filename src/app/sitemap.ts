import type { MetadataRoute } from "next";

const SITE_URL = "https://vld.oxog.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-08");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}