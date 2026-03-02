/**
 * Tailwind CSS v4 — CSS-first configuration.
 *
 * In Tailwind v4 the primary configuration lives in `app/globals.css` inside
 * the `@theme { … }` block.  This file is kept as a typed reference so the
 * brand token names are self-documenting for the whole team.
 *
 * Brand tokens already registered in globals.css:
 *   --color-forest-green : #1B3022   →  bg-forest-green / text-forest-green
 *   --color-deep-red     : #8B0000   →  bg-deep-red     / text-deep-red
 *   --color-cream        : #F5F5DC   →  bg-cream        / text-cream
 *   --font-display       : Playfair Display  →  font-display
 *   --font-sans          : Inter             →  font-sans
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // In v4, content scanning is automatic — no need to list paths manually.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // Mirrors the CSS @theme values so IDE intellisense still resolves them.
      colors: {
        "forest-green": "#1B3022",
        "deep-red": "#8B0000",
        cream: "#F5F5DC",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-18px)" },
        },
      },
      animation: {
        float: "float 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
