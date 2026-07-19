import type { MetadataRoute } from "next";

const BASE = "https://oliverbarona.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/capacitacion-empresarial`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/innovacion-academica`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/consejeria-creadores`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${BASE}/aviso-de-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
