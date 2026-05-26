/*
 * Pulse Digital — site config (Variation Manifest fingerprint)
 *
 * archetype:    G (scrub-cinematic)
 * style:        S1 Neon Control Room
 * voice:        V6 Systems Precise
 * scene:        S1.V1 Executive Control Corridor
 * motion:       M2 Gentle Push (2% forward dolly, 8s loop)
 * cards:        CV4 Liquid Glass
 * hero overlay: HO2 Left-Split
 * header:       pill-floating
 * footer:       FT1 Classic 5-Col
 * about:        AB2 Industry Hero + Bold Contrast
 * contact:      CT4 Split Photo + Form
 * stats:        ST1 Three-Across Counters
 * testimonials: TS4 Review-Card Stack
 * cta:          CTA1 Centered Oversized Type
 */

import manifest from "./asset-manifest.json";

export type HeroLine = { text: string; accent?: boolean };

const img = (slot: string, fallback = ""): string =>
  (manifest as { images: Record<string, string> }).images?.[slot] ?? fallback;

const video = (slot: string, fallback = ""): string =>
  (manifest as { videos: Record<string, string> }).videos?.[slot] ?? fallback;

export const siteConfig = {
  company: {
    name: "Pulse Digital",
    legalName: "Pulse Digital, Inc.",
    tagline: "Observability without assembly",
    description:
      "Pulse Digital instruments your stack — traces, logs, metrics — into one query interface. 12-second cold-start. Per-event pricing.",
    email: "hello@pulse.digital",
    phone: "+1 (415) 555-0142",
    location: "San Francisco · London · Berlin",
    serviceArea: "US · EU · UK",
    yearFounded: 2024,
  },

  brand: {
    bg: "#0A0E14",
    surface: "#1A2433",
    primary: "#06B6D4",
    accent: "#67E8F9",
    ink: "#FFFFFF",
  },

  headerVariant: "pill-floating",

  hero: {
    eyebrow: "Observability platform · Series A · 2024",
    h1: [
      { text: "Data observability." },
      { text: "Without the assembly.", accent: true },
    ] as HeroLine[],
    body:
      "One agent, three signals, sub-second queries across thirty days. Pulse routes every span, metric and log through a typed graph so on-call sees cause, not symptom.",
    primaryCta: { label: "Start free trial", href: "/contact" },
    secondaryCta: { label: "Read the docs", href: "/services" },
  },

  scrollHero: {
    archetype: "G",
    styleId: "S1",
    renderMode: "scrub-cinematic" as const,
    sceneId: "scene-1",
    scrollDistance: 3.6,
    frameCount: 0,
    posterUrl: img("scene-1-start"),
    videoUrl: video("scene-1"),
  },

  valueProp: {
    eyebrow: "Why teams switch",
    heading: "Engineered for engineers who measure their work.",
    body:
      "Pulse replaces the four-tool observability stack with one query plane. OTel-native ingest, Prom-compatible metrics, columnar log storage — under a single auth, a single bill, a single API.",
  },

  services: [
    {
      slug: "distributed-tracing",
      name: "Distributed tracing",
      tagline: "OTel-native",
      description:
        "Ingest spans at 12ms p99, retain 30 days, query by attribute in 480ms median. Auto-instrumentation for Node, Go, Python, Ruby, Java.",
      bullets: ["12ms p99 ingest", "30-day full retention", "OTel + W3C trace context"],
    },
    {
      slug: "metrics-without-cardinality",
      name: "Metrics without cardinality caps",
      tagline: "Prom-compatible",
      description:
        "PromQL in, sub-second out. Cardinality is metered, not capped. Run high-dimensional metrics on every request without redesigning your labels.",
      bullets: ["PromQL compatible", "No cardinality limits", "Per-event pricing"],
    },
    {
      slug: "log-search",
      name: "Log search",
      tagline: "Columnar storage",
      description:
        "Full-text and structured search across 30 days, sub-second. JSON-native — query by field, regex, range, or LLM-generated NLQ.",
      bullets: ["Sub-second queries", "Field-level indexing", "30-day default retention"],
    },
    {
      slug: "anomaly-detection",
      name: "Anomaly detection",
      tagline: "Catches drift",
      description:
        "Baselines every signal per service per region. Surfaces drift before alert thresholds fire — with the trace, the log, and the deploy that caused it.",
      bullets: ["Service+region baselines", "Drift before threshold", "Root-cause graph attached"],
    },
    {
      slug: "incident-replay",
      name: "Incident replay",
      tagline: "Frame-perfect",
      description:
        "Rewind any minute of production traffic. See the exact spans, metrics and logs the on-call would have seen — frame by frame.",
      bullets: ["Minute-by-minute scrub", "Causality graph", "Read-only by default"],
    },
    {
      slug: "integrations",
      name: "SDKs + integrations",
      tagline: "43 official",
      description:
        "Drop-in SDKs for every major runtime. Native integrations with PagerDuty, Slack, Linear, GitHub Actions. BYO via OpenTelemetry.",
      bullets: ["43 native integrations", "OTel collector ready", "Single-line install"],
    },
  ],

  showcase: [
    { label: "Trace · API Gateway", slot: "section-showcase-1" },
    { label: "Metric · p99 Latency", slot: "section-showcase-2" },
    { label: "Log · Anomaly Surface", slot: "section-showcase-3" },
    { label: "Replay · Incident 47-c", slot: "section-showcase-4" },
  ],

  statement: {
    eyebrow: "The bet",
    headline: "Observability",
    body:
      "Built by engineers who shipped distributed systems at Stripe, Datadog and Cloudflare. The thesis: every signal belongs in one typed graph, not four siloed tools.",
  },

  process: {
    eyebrow: "Onboarding",
    heading: "From signup to first query in twelve seconds.",
    steps: [
      {
        index: "01",
        title: "Install the agent",
        body: "One binary, one config file. Auto-discovers your services on first boot.",
      },
      {
        index: "02",
        title: "Connect your existing stack",
        body: "Point Prometheus, OTel, or Fluent Bit at our endpoint. We accept the wire format you already emit.",
      },
      {
        index: "03",
        title: "Query the first signal",
        body: "Open the console. Run the first PromQL or trace query. See the result before the loading state finishes.",
      },
      {
        index: "04",
        title: "Add the rest",
        body: "Wire alerts, on-call routing, replay sessions. Cancel the tools you replaced.",
      },
    ],
  },

  stats: {
    eyebrow: "By the numbers",
    items: [
      { value: 12, suffix: "ms", label: "p99 ingest latency" },
      { value: 30, suffix: " days", label: "default retention" },
      { value: 480, suffix: "ms", label: "median query response" },
      { value: 43, suffix: "+", label: "native integrations" },
    ],
  },

  testimonials: {
    eyebrow: "Engineers using Pulse",
    items: [
      {
        platform: "G2",
        rating: 5,
        quote:
          "We replaced four tools with Pulse in eleven days. The cardinality bill alone paid for the migration.",
        author: "Maya Reyes",
        role: "VP Engineering",
        company: "Foldscale",
      },
      {
        platform: "Trustpilot",
        rating: 5,
        quote:
          "PromQL in, sub-second out, on a thirty-day window. Our SLO dashboards stopped lying.",
        author: "Daniel Owens",
        role: "Staff SRE",
        company: "Northwind Cloud",
      },
      {
        platform: "Capterra",
        rating: 5,
        quote:
          "Incident replay turned a four-hour post-mortem into a forty-minute one. The video metaphor is honest.",
        author: "Priya Nair",
        role: "Director of Reliability",
        company: "Lightcurve",
      },
    ],
  },

  ctaBlock: {
    eyebrow: "Start",
    heading: "Ship faster. See clearer.",
    body:
      "Free for the first 50M events per month. No credit card. Cancel by deleting your account.",
    primaryCta: { label: "Create free account", href: "/contact" },
    secondaryCta: { label: "Talk to engineering", href: "mailto:hello@pulse.digital" },
  },

  contact: {
    eyebrow: "Contact",
    heading: "Tell us what you're instrumenting.",
    body:
      "We answer technical questions in one business day. Architecture reviews and migration walk-throughs by appointment.",
    fields: ["name", "workEmail", "company", "stack", "message"] as const,
    response: "We reply within one US business day.",
    imageSlot: "section-contact-hero",
  },

  trustBar: [
    "SOC 2 Type II",
    "ISO 27001",
    "GDPR resident",
    "HIPAA available",
    "AWS · GCP · Azure",
    "Status: 99.99% YTD",
  ],

  socials: {
    github: "https://github.com/pulse-digital",
    linkedin: "https://linkedin.com/company/pulse-digital",
    x: "https://x.com/pulsedigital",
    youtube: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    threads: "",
    pinterest: "",
    whatsapp: "",
  },

  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],

  footer: {
    variant: "FT1",
    statement:
      "One agent. Three signals. Sub-second queries across thirty days. Built in San Francisco, London and Berlin.",
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Distributed tracing", href: "/services" },
          { label: "Metrics", href: "/services" },
          { label: "Log search", href: "/services" },
          { label: "Anomaly detection", href: "/services" },
          { label: "Incident replay", href: "/services" },
        ],
      },
      {
        heading: "Developers",
        links: [
          { label: "Docs", href: "/services" },
          { label: "API reference", href: "/services" },
          { label: "SDKs", href: "/services" },
          { label: "Changelog", href: "/about" },
          { label: "Status", href: "https://status.pulse.digital" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Customers", href: "/about" },
          { label: "Engineering blog", href: "/about" },
          { label: "Careers", href: "/contact" },
          { label: "Press", href: "/contact" },
        ],
      },
      {
        heading: "Contact",
        links: [
          { label: "Talk to engineering", href: "mailto:hello@pulse.digital" },
          { label: "Support", href: "mailto:support@pulse.digital" },
          { label: "Security", href: "mailto:security@pulse.digital" },
          { label: "+1 (415) 555-0142", href: "tel:+14155550142" },
        ],
      },
    ],
  },

  seo: {
    siteUrl: "https://pulse.digital",
    locale: "en_US",
    twitterHandle: "@pulsedigital",
    defaultOgSlot: "section-og",
  },

  assets: {
    img,
    video,
  },
} as const;

export type SiteConfig = typeof siteConfig;
