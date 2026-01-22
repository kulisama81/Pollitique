import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Political party colors (French context)
        'party-lr': '#0066CC',      // Les Républicains (blue)
        'party-lrem': '#FFEB00',    // Renaissance/LREM (yellow)
        'party-ps': '#FF8080',      // Parti Socialiste (pink)
        'party-rn': '#000080',      // Rassemblement National (dark blue)
        'party-lfi': '#CC2443',     // La France Insoumise (red)
        'party-eelv': '#00C000',    // Europe Écologie Les Verts (green)
        // Trend indicators
        'trend-up': '#10b981',      // green
        'trend-down': '#ef4444',    // red
        'trend-stable': '#6b7280',  // gray
      },
    },
  },
  plugins: [],
};
export default config;
