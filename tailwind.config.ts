import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': 'var(--shadow-glow-gold-passive)',
        'glow-cyan': 'var(--shadow-glow-cyan)',
        'soft-cyan': 'var(--shadow-soft-cyan)',
      },
      transitionDuration: {
        fast: 'var(--motion-duration-fast)',
        base: 'var(--motion-duration-base)',
        slow: 'var(--motion-duration-slow)',
      },
      transitionTimingFunction: {
        standard: 'var(--motion-ease-standard)',
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'collapsible-up': 'collapsible-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // SOGIF Brand Colors
        sogif: {
          navy: 'hsl(var(--sogif-navy))',
          'navy-light': 'hsl(var(--sogif-navy-light))',
          'cyan-light': 'hsl(var(--sogif-cyan-light))',
          'cyan-dark': 'hsl(var(--sogif-cyan-dark))',
          gold: 'hsl(var(--sogif-gold))',
          success: 'hsl(var(--sogif-success))',
          silver: 'hsl(var(--sogif-silver))',
          'silver-light': 'hsl(var(--sogif-silver-light))',
        },
        surface: {
          soft: 'hsl(var(--surface-soft))',
          subtle: 'hsl(var(--surface-subtle))',
          strong: 'hsl(var(--surface-strong))',
        },
        text: {
          heading: 'hsl(var(--text-heading))',
          body: 'hsl(var(--text-body))',
          muted: 'hsl(var(--text-muted))',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          soft: 'hsl(var(--border-soft))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config

