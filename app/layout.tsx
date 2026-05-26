import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
import { FilmGrain, Vignette } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import manifest from "@/content/asset-manifest.json";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const ogImage =
  (manifest as { images?: Record<string, string> }).images?.[siteConfig.seo.defaultOgSlot] ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    template: `%s · ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
  applicationName: siteConfig.company.name,
  keywords: [
    "observability",
    "distributed tracing",
    "OpenTelemetry",
    "metrics",
    "log search",
    "incident replay",
    "SRE platform",
    "Prometheus compatible",
    "SaaS observability",
  ],
  authors: [{ name: siteConfig.company.legalName }],
  creator: siteConfig.company.legalName,
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.company.name,
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
    images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
    images: ogImage ? [ogImage] : [],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FilmGrain />
        <Vignette color="#0A0E14" />
      </body>
    </html>
  );
}
