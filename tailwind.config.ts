import type { Config } from 'tailwindcss'

const defaultTheme = require('tailwindcss/defaultTheme') as Config['theme']

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    fontFamily: {
      sans: ['var(--font-dm-sans)']
    },
    screens: {
      xs: '490px',
      ...defaultTheme?.screens
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xs: '490px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '	1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      backgroundImage: {
        'logo-dark': "url('/images/logo-text-dark.svg')",
        'logo-default': "url('/images/logo-text-default.svg')"
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'base-primary': 'hsl(var(--base), <alpha-value>)',
        'base-dark': 'hsl(var(--base-dark), <alpha-value>)',
        'slate-subtle-1': 'hsla(var(--slate-subtle-1))',
        'slate-subtle-2': 'hsla(var(--slate-subtle-2))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
} satisfies Config

export default config
