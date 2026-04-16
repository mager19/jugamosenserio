import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: { DEFAULT: "#1B2B6B", dark: "#122050", light: "#2D45A0" },
        secondary: { DEFAULT: "#E8623A", dark: "#D4522A", light: "#F07A55" },
        tertiary: { DEFAULT: "#F5C842", dark: "#D9AE28", light: "#FAD96A" },
        neutral: {
          50: "#FDFCFB",
          100: "#F5F3F0",
          200: "#E8E4DE",
          300: "#D1CBC1",
          400: "#A89F92",
          500: "#7A7168",
          600: "#5A5249",
          700: "#3D3830",
          800: "#2A2520",
          900: "#1A1A18",
        },
      },
      animation: {
        marquee: "marquee 80s linear infinite",
        "marquee-reverse": "marquee 110s linear infinite reverse",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
