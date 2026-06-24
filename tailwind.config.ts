import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FF5A5F",
          light: "#FFF0F0",
          hover: "#E04E53",
          soft: "#FFE4E5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F8FAFC",
          elevated: "#F1F5F9",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
        border: {
          DEFAULT: "#F1F5F9",
          strong: "#E2E8F0",
        },
        status: {
          success: "#10B981",
          successSoft: "#D1FAE5",
          warning: "#F59E0B",
          warningSoft: "#FEF3C7",
          error: "#EF4444",
          errorSoft: "#FEE2E2",
          info: "#3B82F6",
          infoSoft: "#DBEAFE",
        },
      },
      boxShadow: {
        premium: "0 10px 40px -10px rgba(15, 23, 42, 0.08)",
        floating: "0 20px 40px rgba(255, 90, 95, 0.15)",
        card: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        modal: "0 25px 60px rgba(15, 23, 42, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1", fontWeight: "700" }],
        h1: ["2.5rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["1.75rem", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }],
        h4: ["1rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["0.9375rem", { lineHeight: "1.65", fontWeight: "500" }],
        small: ["0.8125rem", { lineHeight: "1.45", fontWeight: "500" }],
        caption: ["0.6875rem", { lineHeight: "1.2", fontWeight: "600" }],
      },
      maxWidth: {
        page: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
