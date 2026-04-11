import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: false, // Mono solo se usa en etiquetas secundarias, no bloquea LCP
  fallback: ["ui-monospace", "monospace"],
});

const SITE_URL = "https://oliverbarona.com";
const SITE_NAME = "Oliver Barona";
const TITLE = "Oliver Barona — Diseñador Instruccional Sr.";
const DESCRIPTION =
  "Diseñador instruccional senior. Creo capacitaciones donde la gente, en verdad, aprende: empresas, escuelas y creadores. Ganador del concurso internacional iSpring 2025.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Oliver Barona",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Oliver Barona", url: SITE_URL }],
  creator: "Oliver Barona",
  publisher: "Oliver Barona",
  keywords: [
    "diseño instruccional",
    "diseñador instruccional",
    "capacitación empresarial",
    "e-learning",
    "cursos en línea",
    "gamificación educativa",
    "pedagogía",
    "storytelling educativo",
    "iSpring",
    "Oliver Barona",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Oliver Barona — Diseñador Instruccional Sr.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
    creator: "@oliverbarona",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#07070b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oliver Barona",
  alternateName: "Antonio Oliver Barona",
  url: SITE_URL,
  jobTitle: "Diseñador Instruccional Senior",
  description: DESCRIPTION,
  knowsAbout: [
    "Diseño Instruccional",
    "Pedagogía",
    "Gamificación",
    "Storytelling Educativo",
    "Pensamiento Crítico",
    "E-learning",
    "Capacitación Empresarial",
  ],
  award: "Ganador del concurso internacional iSpring 2025",
  worksFor: {
    "@type": "Organization",
    name: "Oliver Barona — Diseño Instruccional",
    url: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "es-MX",
  publisher: { "@type": "Person", name: "Oliver Barona" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-MX"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
