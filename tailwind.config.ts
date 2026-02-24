import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.10)',
          DEFAULT: 'rgba(255, 255, 255, 0.15)',
          strong: 'rgba(255, 255, 255, 0.20)',
        },
        metric: {
          humidity: '#93c5fd',
          wind: '#5eead4',
          rain: '#a5b4fc',
          tempHigh: '#fbbf24',
          tempLow: '#60a5fa',
        },
      },
      spacing: {
        'safe-t': 'env(safe-area-inset-top)',
        'safe-b': 'env(safe-area-inset-bottom)',
      },
      borderRadius: {
        'card': '1rem',
        'card-lg': '1.25rem',
        'pill': '9999px',
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '200' }],
        'title-lg': ['1.375rem', { lineHeight: '1.3', fontWeight: '700' }],
        'title': ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        'micro': ['0.625rem', { lineHeight: '1.3', fontWeight: '500' }],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      zIndex: {
        'nav': '50',
        'dropdown': '40',
        'overlay': '30',
        'toast': '60',
      },
    },
  },
  plugins: [],
};
export default config;
