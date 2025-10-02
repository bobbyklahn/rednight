import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0a0a0a',  // Deep black background
          800: '#1a1a1a',  // Section backgrounds
          700: '#2a2a2a',  // Card backgrounds
        },
        gold: {
          500: '#d4af37',  // Primary accent color
          400: '#f0c674',  // Hover states
        },
        red: {
          600: '#8b0000',  // Brand red
        },
      },
      screens: {
        'xs': '475px',
      },
      animation: {
        'tilt': 'tilt 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        tilt: {
          '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '50%': { transform: 'rotateX(10deg) rotateY(10deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
