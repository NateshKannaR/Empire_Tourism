/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        dark: {
          50: '#1e293b',
          100: '#0f172a',
          200: '#0a0f1e',
          300: '#070b16',
          400: '#05080f',
          500: '#030712',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-fast': 'float-fast 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'slide-up': 'slide-up 0.6s ease forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'aurora': 'aurora 15s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'count-up': 'count-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(249,115,22,0.06) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-amber': '0 0 40px rgba(245, 158, 11, 0.2), 0 0 80px rgba(245, 158, 11, 0.08)',
        'glow-amber-strong': '0 0 60px rgba(245, 158, 11, 0.4), 0 0 120px rgba(245, 158, 11, 0.15)',
        'glow-orange': '0 0 40px rgba(249, 115, 22, 0.25)',
        'inner-glow': 'inset 0 0 20px rgba(245,158,11,0.05)',
        'card-hover': '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
