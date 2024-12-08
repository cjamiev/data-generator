import type { Config } from "tailwindcss";

export default {
  mode: 'jit',
  purge: [
    "./src/**/*.{ts,tsx}",
  ],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
