import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FF444F",
          hover: "#E93A44",
          soft: "#FFE6E7",
        },
        ink: {
          DEFAULT: "#0E0E0E",
          900: "#151717",
          800: "#181C25",
          700: "#20242F",
          600: "#2A2E3B",
        },
        mist: {
          50: "#FAFAFA",
          100: "#F4F5F7",
          200: "#EAECEF",
          300: "#D6D9DE",
          500: "#7E8388",
        },
        mint: "#00C390",
      },
      fontFamily: {
        sans: ["var(--font-plex)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,14,14,0.04), 0 8px 24px rgba(14,14,14,0.06)",
        pop: "0 12px 40px rgba(14,14,14,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up .35s cubic-bezier(.2,.8,.2,1) both",
        "sheet-up": "sheet-up .3s cubic-bezier(.2,.8,.2,1) both",
        shimmer: "shimmer 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
