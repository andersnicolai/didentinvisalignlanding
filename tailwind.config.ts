import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: "hsl(150, 30%, 50%)",    // #6B9E84 - Sage grønn
  				light: "hsl(150, 30%, 96%)",      // #f0f4f1 - Lys sage
  				dark: "hsl(150, 30%, 30%)",       // #2c513d - Mørk sage
  				foreground: "hsl(0, 0%, 100%)",
  			},
  			secondary: {
  				DEFAULT: "hsl(140, 20%, 95%)",    // Lys sage bakgrunn
  				dark: "hsl(140, 20%, 20%)",       // Mørk sekundær
  				foreground: "hsl(150, 30%, 20%)",
  			},
  			accent: {
  				DEFAULT: "hsl(160, 25%, 40%)",    // Mørkere grønn
  				light: "hsl(160, 25%, 96%)",      // Lys accent
  				foreground: "hsl(0, 0%, 100%)",
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: {
                DEFAULT: 'hsl(var(--border))'
            },
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
