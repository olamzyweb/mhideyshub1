import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#121212",
        blush: "#f7d9e3",
        sand: "#fff7ed",
        mint: "#d9fbe8",
        gold: "#f5c542",
        primary: "#0f172a"
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #fff7ed 0%, #f7d9e3 50%, #d9fbe8 100%)"
      }
    }
  },
  plugins: []
};

export default config;
