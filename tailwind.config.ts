import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0E14",
        surface: "#1A2433",
        primary: "#06B6D4",
        accent: "#67E8F9",
        ink: "#FFFFFF",
        muted: "rgba(255,255,255,0.52)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-monospace", "monospace"],
        mono: ["var(--font-body)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.25em",
        hairline: "0.4em",
      },
      animation: {
        "scroll-pulse": "scroll-pulse 2.4s ease-in-out infinite",
      },
      keyframes: {
        "scroll-pulse": {
          "0%,100%": { opacity: "0.4", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
